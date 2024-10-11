import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { ESTADO_CONTRATO, Incompletas, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import moment from 'moment';
import {
   ContractHistoryData,
   ContractUpdate,
   OPERACION_CONTRATO,
   RecordDiaria,
} from '../../../interfaces/contractsInterfaces';
import { updatePolicy } from './policyUpdater';
import { Company } from '../../../interfaces/company';
import { parserDate } from '../../../helpers/time';
import { createContractHistory, createDesechados } from '../../contracts/contractService';
import { incompletas } from './incompletas';
import { digitalSignatureCreator } from '../digitalSignature/digitalSignature';
import { createContractDocumentHistory, createDocuments } from '../../contractDocuments/contractDocuments';
import { fetchBranch, fetchClave, fetchCompany, fetchContrato, fetchMediator } from '../../../helpers/fetch';
import { handleIncidences } from '../../incidenciasDocumentos/incidenciaDocumento';

export const policyCreator = async (
   record: RecordDiaria,
   systemUser: Usuario,
   user: { UsuarioId: number },
   err: any,
   details: any,
) => {
   let conError = 0;
   let hasError;
   let insert = null;
   let Desechados: number = 0;
   let revisar: boolean = false;

   const company = record.Compania ? await fetchCompany(err, record.Compania) : null;

   const producto = record.Producto ? await fetchBranch(err, record.Producto) : null;

   const mediator = record.Mediador ? await fetchMediator(err, record.Mediador) : null;

   const clave = fetchClave(record);

   if (!company || !producto || !mediator || !record.FechaOperacion) {
      const incompletos = await prismaClient.incompletas.findMany();
      const withOut = incompletos.map((i: Incompletas) => {
         const { incompletaId, errores, createdAt, ...rest } = i;
         return rest;
      });

      const isIn = withOut.find(
         (w: any) => record.CodigoPoliza == w.CodigoPoliza && record.CodigoSolicitud == w.CodigoSolicitud,
      );
      if (!isIn) {
         await incompletas({ ...record, errores: err });
         revisar = true;
         details.push({
            ...record,
            estado: 'INCOMPLETO REVISAR',
            errores: err,
         });
      } else {
         Desechados++;

         const data: any = {
            MotivoDesechado: 'REGISTRO EXISTENTE EN INCOMPLETAS',

            FechaEfecto: record.FechaEfecto,
            FechaOperacion: record.FechaOperacion,
            AnuladoSEfecto: record.AnuladoSEfecto,
            DNIAsegurado: record.DNIAsegurado,
            NombreAsegurado: record.NombreAsegurado,
            FechaNacimientoAsegurado: record.FechaNacimientoAsegurado,

            CSRespAfirmativas: record.CSRespAfirmativas,
            ProfesionAsegurado: record.ProfesionAsegurado,
            DeporteAsegurado: record.DeporteAsegurado,
            DNITomador: record.DNITomador,
            FechaValidezDNITomador: record.FechaValidezDNITomador,
            NombreTomador: record.NombreTomador,
            Operador: record.Operador,
            IndicadorFDPRECON: record.IndicadorFDPRECON,
            TipoEnvioPRECON: record.TipoEnvioPRECON,
            ResultadoFDPRECON: record.ResultadoFDPRECON,
            IndicadorFDCON: record.IndicadorFDCON,
            TipoEnvioCON: record.TipoEnvioCON,
            ResultadoFDCON: record.ResultadoFDCON,
            Revisar: record.Revisar,
            Conciliar: record.Conciliar,
         };

         await createDesechados(data);

         details.push({
            ...record,
            estado: 'DESECHADO REGISTRO EXISTENTE EN INCOMPLETAS',
            errores: err,
         });
      }
   } else {
      const { actualizar, query, insertar, desechar } = await fetchContrato(record, clave);

      const CONTRATO = record.CodigoPoliza;
      if (actualizar) {
         const data: ContractUpdate = {};

         data.Conciliar = record.Conciliar == 'SI';
         data.Revisar = record.Revisar == 'SI';

         data.ResultadoFDCON = record.ResultadoFDCON;

         data.TipoEnvioCON = record.TipoEnvioCON;
         data.IndicadorFDCON = record.IndicadorFDCON == 'SI';
         data.ResultadoFDPRECON = record.ResultadoFDPRECON;

         data.TipoEnvioPRECON = record.TipoEnvioPRECON;
         data.IndicadorFDPRECON = record.IndicadorFDPRECON == 'SI';

         data.Operador = record.Operador;

         data.MediadorId = mediator?.MediadorId;

         data.NombreTomador = record.NombreTomador;
         data.FechaValidezDNITomador = parserDate(record.FechaValidezDNITomador!);
         data.DNITomador = record.DNITomador;

         data.DeporteAsegurado = record.DeporteAsegurado;
         data.ProfesionAsegurado = record.ProfesionAsegurado;
         data.CSRespAfirmativas = record.CSRespAfirmativas == 'S';

         data.FechaNacimientoAsegurado = parserDate(record.FechaNacimientoAsegurado!);

         data.NombreAsegurado = record.NombreAsegurado;

         data.DNIAsegurado = record.DNIAsegurado;

         data.AnuladoSEfecto = record.AnuladoSEfecto == 'S';

         if (record.AnuladoSEfecto == 'N' && query?.AnuladoSEfecto) {
            data.AnuladoSEfecto = false;
            data.EstadoContrato = !query.Conciliar && !query.Revisar ? 'TRAMITADA' : 'PENDIENTE';
         }
         if (
            (data?.ResultadoFDCON?.includes('acept') && data?.IndicadorFDCON) ||
            (query?.ResultadoFDCON.includes('acept') && data?.IndicadorFDCON)
         ) {
            data.EstadoContrato = 'TRAMITADA';

            const query1 = await findDocumentContracts(query?.ContratoId!);

            for (const dc of query1) {
               const updateDoc = await prismaClient.documentoContrato.update({
                  where: {
                     DocumentoId: dc.DocumentoId,
                  },
                  data: {
                     EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                     FechaEstado: new Date(),
                  },
               });

               /*  const exist = await findContractDocumentHistory({
                  DocId: updateDoc.DocId,
                  DocumentoId: updateDoc.DocumentoId,
                  EstadoDoc: updateDoc.EstadoDoc,
               });

               if (!exist) { */
               const { ContratoId, ...dataD } = updateDoc;
               const toSend = {
                  ...dataD,
               };

               await createContractDocumentHistory(toSend);
               //  }
            }
         }

         if (record.AnuladoSEfecto == 'S' && query?.AnuladoSEfecto) {
            data.AnuladoSEfecto = true;
            data.EstadoContrato = 'ANULADA';
            data.Conciliar = false;
         }

         data.FechaEfecto = record.FechaEfecto ? parserDate(record.FechaEfecto) : query?.FechaEfecto;

         data.FechaOperacion = parserDate(record.FechaOperacion) ?? query?.FechaOperacion;

         data.ProductoId = producto?.ProductoId ?? query?.ProductoId;

         data.CompaniaId = company?.CompaniaId ?? query?.CompaniaId;

         data.CodigoPoliza = CONTRATO;
         data.ClaveOperacion = CONTRATO;

         let in30days;
         if (record.FechaOperacion && record.Conciliar == 'SI') {
            const givenDateStr = parserDate(record.FechaOperacion);

            // Crear una instancia de Moment.js a partir de la fecha dada
            const givenDate = moment(givenDateStr, 'YYYY-MM-DD');

            // Calcular la fecha dentro de 30 días
            in30days = givenDate.add(30, 'days');

            data.FechaProximaReclamacion = in30days.toDate();
         }

         const updated = await updatePolicy(data, query!.ContratoId);

         data.ContratoId = updated.ContratoId;
         const {
            Activo,

            TipoOperacion,
            updatedAt,
            TipoConciliacionId,
            UsuarioId,
            ...rest
         } = updated;

         await createContractHistory({
            ...rest,
            Operacion: OPERACION_CONTRATO.ACTUALIZADO,
         });
         insert = false;
         details.push({
            ...record,
            estado: 'ACTUALIZADO',
            errores: err,
         });

         const digitalSignatureData = {
            Mediador: record.Mediador,
            DNIAsegurado: record.DNIAsegurado,
            NombreAsegurado: record.NombreAsegurado,
            NumPoliza: clave,
            TIPO_ENVIO: record.TipoEnvioCON ? record.TipoEnvioCON : record.TipoEnvioPRECON,
            Resultado: record.ResultadoFDCON,
         };

         await digitalSignatureCreator(digitalSignatureData);
      } else if (insertar) {
         const createdContract = await createContract(record, company, producto, mediator, user, err, clave);

         const {
            Activo,

            TipoOperacion,
            updatedAt,
            TipoConciliacionId,
            UsuarioId,
            Producto,
            DocumentoContrato,
            ...data
         } = createdContract;
         const dataH: ContractHistoryData = data;

         await createContractHistory(dataH, OPERACION_CONTRATO.INSERTADO);

         insert = true;
         details.push({
            ...record,
            estado: 'INSERTADO',
            errores: err,
         });

         const digitalSignatureData = {
            Mediador: record.Mediador,
            DNIAsegurado: record.DNIAsegurado,
            NombreAsegurado: record.NombreAsegurado,
            NumPoliza: clave,
            TIPO_ENVIO: record.TipoEnvioCON ? record.TipoEnvioCON : record.TipoEnvioPRECON,
            Resultado: record.ResultadoFDCON,
         };

         await digitalSignatureCreator(digitalSignatureData);
         if (
            (createdContract?.ResultadoFDCON.includes('acept') && createdContract?.IndicadorFDCON) ||
            (!createdContract.Conciliar && !createdContract.Revisar)
         ) {
            await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, false);

            //await handlePreLoadConciliation(createdContract);
         } else if (
            /*  (createdContract?.ResultadoFDCON !== 'Transacción aceptada' && createdContract?.IndicadorFDCON) || */
            createdContract?.ResultadoFDPRECON.includes('acept') &&
            !createdContract?.ResultadoFDCON.includes('acept') /*  === 'Transacción aceptada' */
         ) {
            await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, true);
            // await handlePreLoadConciliation(createdContract);
         } else {
            await handleIncidences(createdContract, systemUser);
         }

         //Pregunto si esta en incompletos y lo pongo en activo en insertado =true
         const inIncompleta = await prismaClient.incompletas.findFirst({
            where: {
               CodigoPoliza: record.CodigoPoliza,
               CodigoSolicitud: record.CodigoSolicitud,
            },
         });

         if (inIncompleta) {
            await prismaClient.incompletas.update({
               where: {
                  incompletaId: inIncompleta.incompletaId,
               },
               data: {
                  Insertada: true,
               },
            });
         }
      } else if (desechar) {
         const data = {
            MotivoDesechado: 'REGISTRO EXISTENTE EN CONTRATOS',
            Compania: record.Compania ?? '',
            Producto: record.Producto ?? '',
            FechaOperacion: record.FechaOperacion ?? '',
            TipoOperacion: record.TipoOperacion ?? '',
            CCC: record.CCC ?? '',
            CodigoSolicitud: record.CodigoSolicitud ?? '',
            CodigoPoliza: record.CodigoPoliza ?? '',
            FechaEfecto: record.FechaEfecto ?? '',
            AnuladoSEfecto: record.AnuladoSEfecto ?? '',
            Suplemento: record.Suplemento ?? '',
            DNIAsegurado: record.DNIAsegurado ?? '',
            NombreAsegurado: record.NombreAsegurado ?? '',
            FechaNacimientoAsegurado: record.FechaNacimientoAsegurado ?? '',
            CSRespAfirmativas: record.CSRespAfirmativas ?? '',
            ProfesionAsegurado: record.ProfesionAsegurado ?? '',
            DeporteAsegurado: record.DeporteAsegurado ?? '',
            DNITomador: record.DNITomador ?? '',
            FechaValidezDNITomador: record.FechaValidezDNITomador ?? '',
            NombreTomador: record.NombreTomador ?? '',
            Mediador: record.Mediador ?? '',
            Operador: record.Operador ?? '',
            IndicadorFDPRECON: record.IndicadorFDPRECON ?? '',
            TipoEnvioPRECON: record.TipoEnvioPRECON ?? '',
            ResultadoFDPRECON: record.ResultadoFDPRECON ?? '',
            IndicadorFDCON: record.IndicadorFDCON ?? '',
            TipoEnvioCON: record.ResultadoFDCON ?? '',
            ResultadoFDCON: record.ResultadoFDCON ?? '',
            Revisar: record.Revisar ?? '',
            Conciliar: record.Revisar ?? '',
         };

         await createDesechados(data);
         Desechados++;

         details.push({
            ...record,
            estado: 'DESECHADO REGISTRO EXISTENTE EN CONTRATOS',
            errores: err,
         });
         //Aqui lo desechamos porque ni inserta ni actualiza
      }

      for (const key in err) {
         if (err.hasOwnProperty(key)) {
            const value = err[key];
            if (value) {
               hasError = true;
               conError++;
            }
         }
         if (conError > 0) break;
      }
   }

   return {
      hasError,
      insert,
      Desechados,
      revisar,
   };
};

const createContract = async (
   record: RecordDiaria,
   company: Company | null,
   branch: any,
   mediator: any,
   user: { UsuarioId: any },
   err: any,
   claveOPeracion: string,
) => {
   // Fecha dada en formato de cadena
   let in30days;
   if (record.FechaOperacion && record.Conciliar == 'SI') {
      const givenDateStr = parserDate(record.FechaOperacion);

      // Crear una instancia de Moment.js a partir de la fecha dada
      const givenDate = moment(givenDateStr, 'YYYY-MM-DD');

      // Calcular la fecha dentro de 30 días
      in30days = givenDate.add(30, 'days');
   }

   return prismaClient.contrato.create({
      data: {
         Compania: { connect: { CompaniaId: company?.CompaniaId } },
         Producto: { connect: { ProductoId: branch?.ProductoId } },
         Mediador: { connect: { MediadorId: mediator.MediadorId } },
         EstadoContrato: record.AnuladoSEfecto === 'S' ? ESTADO_CONTRATO.ANULADA : ESTADO_CONTRATO.PENDIENTE,
         ClaveOperacion: claveOPeracion,
         FechaOperacion: record.FechaOperacion ? parserDate(record.FechaOperacion) : new Date(),
         CCC: record.CCC,
         CodigoSolicitud: record.CodigoSolicitud,
         CodigoPoliza: record.CodigoPoliza,
         FechaEfecto: record.FechaEfecto ? parserDate(record.FechaEfecto) : new Date(),
         AnuladoSEfecto: record.AnuladoSEfecto === 'S',
         DNIAsegurado: record.DNIAsegurado,
         NombreAsegurado: record.NombreAsegurado,
         FechaNacimientoAsegurado: record.FechaNacimientoAsegurado ? parserDate(record.FechaNacimientoAsegurado) : null,
         CSRespAfirmativas: record.CSRespAfirmativas == 'S',
         ProfesionAsegurado: record.ProfesionAsegurado,
         DeporteAsegurado: record.DeporteAsegurado,
         DNITomador: record.DNITomador,
         NombreTomador: record.NombreTomador,
         FechaValidezDNITomador:
            record.FechaValidezDNITomador && record.FechaValidezDNITomador !== ''
               ? parserDate(record.FechaValidezDNITomador)
               : null,
         Operador: record.Operador,
         IndicadorFDPRECON: record.IndicadorFDPRECON === 'SI',
         TipoEnvioPRECON: record.TipoEnvioPRECON,
         ResultadoFDPRECON: record.ResultadoFDPRECON,
         IndicadorFDCON: record.IndicadorFDCON === 'SI',
         TipoEnvioCON: record.TipoEnvioCON,
         ResultadoFDCON: record.ResultadoFDCON,
         Revisar: record.Revisar === 'SI',
         Conciliar: record.Conciliar === 'SI',
         Suplemento: record.Suplemento === '1',
         errores: err,
         NotaInterna: '',
         FechaProximaReclamacion: in30days ? in30days.toDate() : null,
         Usuario: {
            connect: {
               UsuarioId: user.UsuarioId,
            },
         },
      },
      include: {
         Producto: {
            include: {
               ProductoTipoOperacion: {
                  include: {
                     ProductoDocumento: {
                        include: {
                           MaestroDocumento: true,
                        },
                     },
                  },
               },
            },
         },
         DocumentoContrato: {
            include: {
               MaestroDocumentos: true,
            },
         },
      },
   });
};

export const findDocumentContract = async (contractId: number, documentId: number) => {
   const query = await prismaClient.documentoContrato.findFirst({
      where: {
         ContratoId: contractId,
         DocumentoId: documentId,
      },
   });

   return query;
};
export const findDocumentContracts = async (contractId: number) => {
   const query = await prismaClient.documentoContrato.findMany({
      where: {
         ContratoId: contractId,
      },
   });

   return query;
};
