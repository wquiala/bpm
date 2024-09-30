import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { ESTADO_CONTRATO, Incompletas, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import moment from 'moment';
import {
   ContractHistoryData,
   ContractUpdate,
   NoProcesarInterface,
   OPERACION_CONTRATO,
   RecordDiaria,
} from '../../../interfaces/contractsInterfaces';
import { updatePolicy } from './policyUpdater';
import { Company } from '../../../interfaces/company';
import { parserDate } from '../../../helpers/time';
import { createContractDocumentHistory } from '../../../controllers/contractDocument';
import { createDesechados } from '../../contracts/contractService';
import { incompletas } from './incompletas';

const fetchCompany = async (err: { [key: string]: string }, code?: string) => {
   let companyCode = code;
   let comp;

   if (code == 'UCV') {
      companyCode = 'UNI';
   } else if (code == 'AVP') {
      companyCode = 'SLS';
   }

   const query = await prismaClient.compania.findFirst({
      where: { Nombre: companyCode },
   });

   if (!query) {
      if (err['Compania'])
         err['Compania'] +=
            '. Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, actualícela';
      else
         err['Compania'] =
            'Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, actualícela';
   }

   /*  if (query!) {
      comp = query!;
   } else {
      comp = prismaClient.compania.findFirst({
         where: { Nombre: 'Sin Companía' },
      });

      if (err['compania'])
         err['compania'] +=
            '. Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, se asignará un código de compañia temporal';
      else
         err['compania'] =
            'Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, se asignará un código de compañia temporal';
   } */

   return query;
};

export const fetchClave = (record: RecordDiaria) => {
   let clave: string;
   const SOLICITUD = record.CodigoSolicitud;
   const CONTRATO = record.CodigoPoliza;

   if (CONTRATO) {
      clave = CONTRATO;
   } else clave = SOLICITUD;

   return clave;
};

export const fetchContrato = async (record: RecordDiaria, clave: string) => {
   let solicitud;
   let query;
   let actualizar = false;
   let desechar = false;
   let insertar = false;
   let query1;

   if (clave == record.CodigoPoliza) {
      query = await prismaClient.contrato.findFirst({
         where: { ClaveOperacion: record.CodigoPoliza },
      });
      if (record.CodigoSolicitud)
         query1 = await prismaClient.contrato.findFirst({
            where: {
               CodigoSolicitud: record.CodigoSolicitud,
            },
         });

      if (
         query != null ||
         (query1 != null && query1.CodigoPoliza != record.CodigoPoliza && query1.CodigoPoliza != '')
      ) {
         desechar = true;
      } else {
         query = await prismaClient.contrato.findFirst({
            where: { ClaveOperacion: record.CodigoSolicitud },
         });

         if (query != null) {
            solicitud = true;
            actualizar = true;
         } else {
            insertar = true;
         }
      }
   } else if (clave == record.CodigoSolicitud) {
      query = await prismaClient.contrato.findFirst({
         where: { OR: [{ ClaveOperacion: record.CodigoSolicitud }, { CodigoSolicitud: record.CodigoSolicitud }] },
      });

      if (query != null) {
         desechar = true;
      } else {
         insertar = true;
      }
   }

   return {
      query,
      actualizar,
      solicitud,
      desechar,
      insertar,
   };
};

const fetchBranch = async (err: { [key: string]: string }, code: string = '') => {
   const producto = await prismaClient.producto.findFirst({
      where: { Codigo: code },
   });

   if (!producto) {
      if (err['Producto'])
         err['Producto'] +=
            '. El producto no se encuentra registrado en la tabla maestra de productos del sistema, actualícela';
      else
         err['Producto'] =
            'El producto no se encuentra registrado en la tabla maestra de productos del sistema, actualícela';
   }
   /* if (query) {
      producto = query;
   } else {
      producto = await prismaClient.producto.findFirst({
         where: { Codigo: 'Sin Producto' },
      });

      } */
   return producto;
};

const fetchMediator = async (err: { [key: string]: string }, code: string = '') => {
   const mediador = await prismaClient.mediador.findFirst({
      where: { Codigo: code },
   });

   if (!mediador) {
      if (err['Mediador'])
         err['Mediador'] +=
            '. El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, actualícela';
      else
         err['Mediador'] =
            'El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, actualícela';
   }
   /*  if (query) {
      mediador = query;
   } else {
      mediador = await prismaClient.mediador.findFirst({
         where: { Codigo: 'Sin Mediador' },
      });

      if (err['mediador'])
         err['mediador'] +=
            '. El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal';
      else
         err['mediador'] =
            'El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal';
   } */
   return mediador;
};
export const policyCreator = async (
   record: RecordDiaria,
   systemUser: Usuario,
   user: { UsuarioId: number },
   err: any,
   details: any,
) => {
   let conError = 0;
   let hasError;
   let insert: boolean | null = null;
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
      const { actualizar, query, solicitud, insertar, desechar } = await fetchContrato(record, clave);

      const CONTRATO = record.CodigoPoliza;
      if (actualizar) {
         const data: ContractUpdate = {};

         data.Conciliar = record.Conciliar == 'SI' ? true : false;
         data.Revisar = record.Revisar == 'SI' ? true : false;

         data.ResultadoFDCON = record.ResultadoFDCON;

         data.TipoEnvioCON = record.TipoEnvioCON;
         data.IndicadorFDCON = record.IndicadorFDCON == 'SI' ? true : false;
         data.ResultadoFDPRECON = record.ResultadoFDPRECON;

         data.TipoEnvioPRECON = record.TipoEnvioPRECON;
         data.IndicadorFDPRECON = record.IndicadorFDPRECON == 'SI' ? true : false;

         data.Operador = record.Operador;

         data.MediadorId = mediator?.MediadorId;

         data.NombreTomador = record.NombreTomador;
         data.FechaValidezDNITomador = parserDate(record.FechaValidezDNITomador!);
         data.DNITomador = record.DNITomador;

         data.DeporteAsegurado = record.DeporteAsegurado;
         data.ProfesionAsegurado = record.ProfesionAsegurado;
         data.CSRespAfirmativas = record.CSRespAfirmativas == 'S' ? true : false;

         data.FechaNacimientoAsegurado = parserDate(record.FechaNacimientoAsegurado!);

         data.NombreAsegurado = record.NombreAsegurado;

         data.DNIAsegurado = record.DNIAsegurado;

         data.AnuladoSEfecto = record.AnuladoSEfecto == 'S' ? true : false;
         if (record.AnuladoSEfecto == 'S' && query?.AnuladoSEfecto == false) {
            data.AnuladoSEfecto = true;
            data.EstadoContrato = 'ANULADA';
            data.Conciliar = false;
         }
         if (record.AnuladoSEfecto == 'N' && query?.AnuladoSEfecto == true) {
            data.AnuladoSEfecto = false;
            data.EstadoContrato = !query.Conciliar && !query.Revisar ? 'TRAMITADA' : 'PENDIENTE';
            data.Conciliar = !query.Conciliar && !query.Revisar ? false : true;
            data.Revisar = !query.Conciliar && !query.Revisar ? false : true;
         }
         if (
            (data?.ResultadoFDCON?.includes('acept') && data?.IndicadorFDCON) ||
            (query?.ResultadoFDCON.includes('acept') && data?.IndicadorFDCON)
         ) {
            data.EstadoContrato = 'TRAMITADA';
            data.Conciliar = false;
            data.Revisar = false;
            const query1 = await findDocumentContracts(query?.ContratoId!);

            for (const dc of query1) {
               const updateDoc = await prismaClient.documentoContrato.update({
                  where: {
                     DocumentoId: dc.DocumentoId,
                  },
                  data: {
                     EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                  },
               });

               const { ContratoId, ...dataD } = updateDoc;

               await createContractDocumentHistory(dataD);
            }
         }

         data.FechaEfecto = parserDate(record.FechaEfecto!) ?? query?.FechaEfecto;

         data.FechaOperacion = parserDate(record.FechaOperacion!) ?? query?.FechaOperacion;

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
      } else if (insertar) {
         const createdContract = await createContract(record, company, producto, mediator, user, err, clave);

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
         const {
            Activo,

            TipoOperacion,
            updatedAt,
            TipoConciliacionId,
            UsuarioId,
            Producto,
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
            console.log('Sin firma ni nada');
            await handleIncidences(createdContract, systemUser);
         }
      } else {
         if (desechar) {
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

export const createContractHistory = async (
   data: ContractHistoryData,
   Operacion?: OPERACION_CONTRATO,
   EstadoContrato?: ESTADO_CONTRATO,
) => {
   const { ContratoId, ...rest } = data;

   return ContratoId
      ? await prismaClient.historialContrato.create({
           data: {
              Contrato: { connect: { ContratoId: ContratoId } },
              Operacion,
              EstadoContrato,
              ...rest,
           },
           include: {
              Contrato: true,
           },
        })
      : await prismaClient.historialContrato.create({
           data: {
              ...rest,
           },
        });
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

const createDocuments = async (createdContract: any, systemUser: Usuario, status: string, forPrecon: boolean) => {
   for (const productoTipoOperacion of createdContract.Producto.ProductoTipoOperacion) {
      for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
         const documents = await prismaClient.documentoContrato.create({
            data: {
               Contrato: {
                  connect: {
                     ContratoId: createdContract.ContratoId,
                  },
               },
               MaestroDocumentos: {
                  connect: {
                     DocumentoId: productoDocumento.MaestroDocumento.DocumentoId,
                  },
               },
               Usuario: {
                  connect: {
                     UsuarioId: systemUser?.UsuarioId,
                  },
               },
               EstadoDoc: ContractDocumentStatusesEnum.PENDING,
               ProductoDocumento: {
                  connect: {
                     ProductoDocId: productoDocumento.ProductoDocId,
                  },
               },
            },
         });

         if (createdContract.FechaValidezDNITomador) {
            const dni = await prismaClient.maestroDocumentos.findFirst({
               where: {
                  Codigo: 'DNI',
               },
            });
            if (dni) {
               const conDNI = await prismaClient.documentoContrato.findFirst({
                  where: {
                     DocumentoId: documents.DocumentoId,
                     DocId: dni.DocumentoId,
                  },
               });

               if (conDNI) {
                  const conDNIUpdated = await prismaClient.documentoContrato.update({
                     where: {
                        DocumentoId: conDNI.DocumentoId,
                     },
                     data: {
                        EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                     },
                  });

                  const { ContratoId, ...dataD } = conDNIUpdated;

                  await createContractDocumentHistory(dataD);
               }
            }
         }
         const { ContratoId, ...dataD } = documents;

         await createContractDocumentHistory(dataD);
      }
   }

   if (!forPrecon) {
      await prismaClient.documentoContrato.updateMany({
         where: {
            ContratoId: createdContract.ContratoId,
         },
         data: {
            EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
            FechaConciliacion: new Date(),
         },
      });

      const updated = await prismaClient.documentoContrato.findMany({
         where: {
            ContratoId: createdContract.ContratoId,
         },
      });

      for (const updt of updated) {
         const { ContratoId, ...dataD } = updt;

         await createContractDocumentHistory(dataD);
      }

      await handlePreLoadConciliation(createdContract);
   } else if (forPrecon) {
      const documentosPrecon = await prismaClient.productoDocumento.findMany({
         where: {
            ProductoId: createdContract.ProductoId,
            Fase: 'PRECON', // Asegúrate de que esto coincida con la fase utilizada en la base de datos
         },
         select: {
            DocumentoId: true,
            ProductoDocId: true,
         },
      });

      const preconIds = documentosPrecon.map((doc) => doc.DocumentoId);
      const preconIdsPD = documentosPrecon.map((id) => id.ProductoDocId);

      await prismaClient.documentoContrato.updateMany({
         where: {
            ContratoId: createdContract.ContratoId,
            DocId: { in: preconIds },
            ProdctoDoc: { in: preconIdsPD },
         },
         data: {
            EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
            FechaConciliacion: new Date(),
         },
      });

      const updated = await prismaClient.documentoContrato.findMany({
         where: {
            ContratoId: createdContract.ContratoId,
            DocId: { in: preconIds },
            ProdctoDoc: { in: preconIdsPD },
         },
      });

      for (const updt of updated) {
         const { ContratoId, ...dataD } = updt;

         await createContractDocumentHistory(dataD);
      }
   }
};

const handlePreLoadConciliation = async (createdContract: any) => {
   const preLoadConciliation = await prismaClient.tipoConciliacion.findFirst({
      where: { nombre: 'Carga previa' },
   });

   if (preLoadConciliation) {
      const updated = await prismaClient.contrato.update({
         where: { ContratoId: createdContract.ContratoId },
         data: {
            TipoConciliacion: {
               connect: {
                  tipoConciliacionId: preLoadConciliation?.tipoConciliacionId,
               },
            },
            EstadoContrato: createdContract.AnuladoSEfecto ? 'ANULADA' : 'TRAMITADA',
            Conciliar: false,
         },
      });

      const {
         Activo,

         TipoOperacion,
         updatedAt,
         TipoConciliacionId,
         UsuarioId,
         ...data
      } = updated;
      const dataH: ContractHistoryData = data;

      await createContractHistory(dataH, OPERACION_CONTRATO.ACTUALIZADO);
   }
};

const handleIncidences = async (createdContract: any, systemUser: Usuario) => {
   for (const productoTipoOperacion of createdContract.Producto.ProductoTipoOperacion) {
      for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
         const document = await prismaClient.documentoContrato.create({
            data: {
               Contrato: {
                  connect: {
                     ContratoId: createdContract.ContratoId,
                  },
               },
               MaestroDocumentos: {
                  connect: {
                     DocumentoId: productoDocumento.MaestroDocumento.DocumentoId,
                  },
               },
               Usuario: {
                  connect: {
                     UsuarioId: systemUser?.UsuarioId,
                  },
               },
               EstadoDoc: ContractDocumentStatusesEnum.PENDING,
               ProductoDocumento: {
                  connect: {
                     ProductoDocId: productoDocumento.ProductoDocId,
                  },
               },
            },
         });

         if (createdContract.FechaValidezDNITomador) {
            const dni = await prismaClient.maestroDocumentos.findFirst({
               where: {
                  Codigo: 'DNI',
               },
            });
            if (dni) {
               const conDNI = await prismaClient.documentoContrato.findFirst({
                  where: {
                     DocumentoId: document.DocumentoId,
                     DocId: dni.DocumentoId,
                  },
               });

               if (conDNI) {
                  const conDNIUpdated = await prismaClient.documentoContrato.update({
                     where: {
                        DocumentoId: conDNI.DocumentoId,
                     },
                     data: {
                        EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                     },
                  });

                  const { ContratoId, ...dataD } = conDNIUpdated;

                  await createContractDocumentHistory(dataD);
               }
            }
         }
         const { ContratoId, ...dataD } = document;

         await createContractDocumentHistory(dataD);
      }
   }
};
