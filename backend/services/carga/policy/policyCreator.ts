import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { ESTADO_CONTRATO, ProductoDocumento, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import moment from 'moment';
import { array, record } from 'zod';
import {
   ContractHistoryData,
   ContractUpdate,
   Contrato,
   ErroresContrato,
   OPERACION_CONTRATO,
   Record,
} from '../../../interfaces/contractsInterfaces';
import { validateCompany } from '../../../helpers/policiyValidator';
import { updatePolicy } from './policyUpdater';
import { Company } from '../../../interfaces/company';
import { resourceLimits } from 'worker_threads';

const fetchCompany = async (code: string = '', err: { [key: string]: string } /* errors?: string[] */) => {
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

   if (query!) {
      comp = query!;
   } else {
      comp = prismaClient.compania.findFirst({
         where: { Nombre: 'Sin Companía' },
      });

      err['compania']
         ? (err['compania'] +=
              '. Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, se asignará un código de compañia temporal')
         : (err['compania'] =
              'Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, se asignará un código de compañia temporal');
   }

   return comp;
};

export const fetchClave = (record: Record) => {
   let clave: string;
   const CCC = record.ccc;
   const SOLICITUD = record.codigoSolicitud;
   const CONTRATO = record.polizaContrato;

   if (CCC) {
      clave = CCC;
   } else if (CONTRATO) {
      clave = CONTRATO;
   } else clave = SOLICITUD;

   return clave;
};

export const fetchContrato = async (record: Record, clave: string) => {
   let solicitud;
   let id;
   let newClave: string | null = null;
   let query;
   let actualizar = false;

   if (clave == record.polizaContrato) {
      query = await prismaClient.contrato.findFirst({
         where: { ClaveOperacion: record.polizaContrato },
      });

      if (query != null) {
         actualizar = true;
      } else {
         query = await prismaClient.contrato.findFirst({
            where: { ClaveOperacion: record.codigoSolicitud },
         });

         if (query != null) {
            solicitud = true;
            actualizar = true;
         }
      }
   } else if (clave == record.codigoSolicitud) {
      query = await prismaClient.contrato.findFirst({
         where: { ClaveOperacion: record.codigoSolicitud },
      });

      if (query != null) {
         actualizar = true;
      }
   } else {
      query = await prismaClient.contrato.findFirst({
         where: { ClaveOperacion: record.ccc },
      });
      if (query != null) {
         actualizar = true;
      }
   }

   return {
      query,
      actualizar,
      solicitud,
   };
};

const fetchBranch = async (code: string = '' /* errors?: string[] */, err: { [key: string]: string }) => {
   let producto;

   const query = await prismaClient.producto.findFirst({
      where: { Codigo: code },
   });

   if (query) {
      producto = query;
   } else {
      producto = await prismaClient.producto.findFirst({
         where: { Codigo: 'Sin Producto' },
      });

      err['PRODUCTO']
         ? (err['PRODUCTO'] +=
              '. El producto no se encuentra registrado en la tabla maestra de productos del sistema, se asignará un código de producto temporal')
         : (err['PRODUCTO'] =
              'El producto no se encuentra registrado en la tabla maestra de productos del sistema, se asignará un código de producto temporal');
   }
   return producto;
};

const fetchMediator = async (code: string = '', /*  errors?: string[] */ err: { [key: string]: string }) => {
   let mediador;
   const query = await prismaClient.mediador.findFirst({
      where: { Codigo: code },
   });

   if (query) {
      mediador = query;
   } else {
      mediador = await prismaClient.mediador.findFirst({
         where: { Codigo: 'Sin Mediador' },
      });

      err['MEDIADOR']
         ? (err['MEDIADOR'] +=
              '. El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal')
         : (err['MEDIADOR'] =
              'El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal');
   }
   return mediador;
};
export const policyCreator = async (
   record: Record,
   systemUser: Usuario,
   user: { UsuarioId: number },
   /* errors: string[] */
   err: any,
   details: any,
) => {
   let conError = 0;
   let hasError;
   let insert: boolean;

   const company = await fetchCompany(record.compania, err);

   const branch = await fetchBranch(record.producto, err);

   const mediator = await fetchMediator(record.mediador, err);

   const clave = fetchClave(record);

   const { actualizar, query, solicitud } = await fetchContrato(record, clave);

   const CONTRATO = record.polizaContrato;
   if (actualizar) {
      const data: ContractUpdate = {
         EstadoContrato: ESTADO_CONTRATO.PENDIENTE_INCIDENCIA,

         FechaOperacion:
            !query!.FechaOperacion && record.fechaOperacion
               ? new Date(moment(record.fechaOperacion, 'MM/DD/YYYY', true).toISOString())
               : query!.FechaOperacion,
         CodigoPoliza: !query?.CodigoPoliza && record.polizaContrato ? record.polizaContrato : query!.CodigoPoliza,
         FechaEfecto: !query?.FechaEfecto && record.fechaEfecto ? record.fechaEfecto : query!.FechaEfecto,
         AnuladoSEfecto: query?.AnuladoSEfecto == false && record.anulaSE === 'S' ? true : false,
         DNIAsegurado: !query?.DNIAsegurado && record.dniAsegurado ? record.dniAsegurado : query?.DNIAsegurado,
         NombreAsegurado:
            !query!.NombreAsegurado && record.nombreAsegurado ? record.nombreAsegurado : query!.NombreAsegurado,
         FechaNacimientoAsegurado:
            !query?.FechaNacimientoAsegurado && record.fechaNacimiento
               ? new Date(moment(record.fechaNacimiento, 'MM/DD/YYYY', true).toISOString())
               : query!.FechaNacimientoAsegurado,
         CSRespAfirmativas:
            !query?.CSRespAfirmativas && record.csResAfirm && record.csResAfirm == 'S'
               ? true
               : query!.CSRespAfirmativas,

         ProfesionAsegurado:
            !query?.ProfesionAsegurado && record.profesion ? record.profesion : query!.ProfesionAsegurado,

         DeporteAsegurado: !query?.DeporteAsegurado && record.deporte ? record.deporte : query!.DeporteAsegurado,
         DNITomador: !query?.DNITomador && record.dniTomador ? record.dniTomador : query!.DNITomador,
         FechaValidezDNITomador:
            !query?.FechaValidezDNITomador && record.fechaValidezDniT
               ? new Date(moment(record.fechaValidezDniT, 'MM/DD/YYYY', true).toISOString())
               : query!.FechaValidezDNITomador,

         NombreTomador: !query?.NombreTomador && record.nombreTomador ? record.nombreTomador : query?.NombreTomador,

         MediadorId:
            query?.MediadorId == 26314 && mediator!.MediadorId != 26314 ? mediator!.MediadorId : query?.MediadorId,
         Operador: !query?.Operador && record.operador ? record.operador : query!.Operador,
         IndicadorFDPRECON:
            query?.IndicadorFDPRECON && record.indicadorPrecon === 'SI' ? true : query!.IndicadorFDPRECON,
         TipoEnvioPRECON:
            !query!.TipoEnvioPRECON && record.tipoEnvioPrecon ? record.tipoEnvioPrecon : query!.TipoEnvioPRECON,
         ResultadoFDPRECON:
            !query!.ResultadoFDPRECON && record.resultadoPrecon ? record.resultadoPrecon : query!.ResultadoFDPRECON,
         IndicadorFDCON: !query!.IndicadorFDCON && record.indicadorCon === 'SI' ? true : query!.IndicadorFDCON,
         TipoEnvioCON: !query!.TipoEnvioCON && record.tipoEnvioC ? record.tipoEnvioC : query!.TipoEnvioCON,
         ResultadoFDCON: !query!.ResultadoFDCON && record.resultadoCon ? record.resultadoCon : query!.ResultadoFDCON,
         Revisar: record.revisar === 'SI',
         Conciliar: record.conciliar === 'SI',
         errores: err,
      };

      if (branch?.ProductoId != 191 && query?.ProductoId == 191) data.ProductoId = branch?.ProductoId;
      if (company?.CompaniaId != 5 && query?.CompaniaId == 5) data.CompaniaId = company?.CompaniaId;
      if (solicitud) data.ClaveOperacion = CONTRATO;

      const updated = await updatePolicy(data, query!.ContratoId);
      insert = false;
      details.push({
         ...record,
         estado: 'ACTUALIZADO',
      });

      const { CompaniaId, ProductoId, CodigoPoliza, MediadorId, ClaveOperacion, ...rest } = data;
      const histC: ContractHistoryData = rest;

      const history = await createContractHistory({
         ...histC,
         Operacion: OPERACION_CONTRATO.ACTUALIZADO,
         EstadoContrato: ESTADO_CONTRATO.PENDIENTE_INCIDENCIA,
      });
   } else {
      const createdContract = await createContract(record, company, branch, mediator, user, err, clave);
      insert = true;
      details.push({
         ...record,
         estado: 'INSERTADO',
      });

      if (
         (createdContract?.ResultadoFDCON === 'Transacción aceptada' && createdContract?.IndicadorFDCON) ||
         !createdContract.Conciliar
      ) {
         await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, false);
         await handlePreLoadConciliation(createdContract);
      } else if (
         (createdContract?.ResultadoFDCON !== 'Transacción aceptada' && createdContract?.IndicadorFDCON) ||
         (createdContract?.IndicadorFDPRECON && createdContract?.ResultadoFDPRECON === 'Transacción aceptada')
      ) {
         await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, true);
         await handlePreLoadConciliation(createdContract);
      } else {
         await handleIncidences(createdContract, systemUser);
      }

      const {
         CompaniaId,
         ProductoId,
         CodigoSolicitud,
         Suplemento,
         CCC,
         Activo,
         ClaveOperacion,
         EstadoContrato,
         CodigoPoliza,
         MediadorId,
         TipoOperacion,
         updatedAt,
         Producto,
         TipoConciliacionId,
         ...data
      } = createdContract;
      const dataH: ContractHistoryData = data;

      await createContractHistory(dataH, OPERACION_CONTRATO.INSERTADO, ESTADO_CONTRATO.PENDIENTE);
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

   return {
      hasError,
      insert,
   };
};

export const NoProcesar = async (data: any) => {
   return prismaClient.noProcesar.create({
      data: {
         ...data,
      },
   });
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
   record: Record,
   company: Company | null,
   branch: any,
   mediator: any,
   user: { UsuarioId: any },
   /* errors: string[], */
   err: any,
   claveOPeracion: string,
) => {
   return prismaClient.contrato.create({
      data: {
         Compania: { connect: { CompaniaId: company?.CompaniaId } },
         Producto: { connect: { ProductoId: branch?.ProductoId } },
         Mediador: { connect: { MediadorId: mediator.MediadorId } },
         EstadoContrato: ESTADO_CONTRATO.PENDIENTE,
         ClaveOperacion: claveOPeracion,
         FechaOperacion: record.fechaOperacion
            ? new Date(moment(record.fechaOperacion, 'MM/DD/YYYY', true).toISOString())
            : null,
         CCC: record.ccc,
         CodigoSolicitud: record.codigoSolicitud,
         CodigoPoliza: record.polizaContrato,
         FechaEfecto: record.fechaEfecto
            ? new Date(moment(record.fechaEfecto, 'MM/DD/YYYY', true).toISOString())
            : null,
         AnuladoSEfecto: record.anulaSE === 'S',
         DNIAsegurado: record.dniAsegurado,
         NombreAsegurado: record.nombreAsegurado,
         FechaNacimientoAsegurado: record.fechaNacimiento
            ? new Date(moment(record.fechaNacimiento, 'MM/DD/YYYY', true).toISOString())
            : null,
         CSRespAfirmativas: record.csResAfirm && record.csResAfirm == 'S' ? true : false,
         ProfesionAsegurado: record.profesion,
         DeporteAsegurado: record.deporte,
         DNITomador: record.dniTomador,
         NombreTomador: record.nombreTomador,
         FechaValidezDNITomador:
            record.fechaValidezDniT && record.fechaValidezDniT !== ''
               ? new Date(moment(record.fechaValidezDniT, 'MM/DD/YYYY', true).toISOString())
               : null,
         Operador: record.operador,
         IndicadorFDPRECON: record.indicadorPrecon === 'SI',
         TipoEnvioPRECON: record.tipoEnvioPrecon,
         ResultadoFDPRECON: record.resultadoPrecon,
         IndicadorFDCON: record.indicadorCon === 'SI',
         TipoEnvioCON: record.tipoEnvioC,
         ResultadoFDCON: record.resultadoCon,
         Revisar: record.revisar === 'SI',
         Conciliar: record.conciliar === 'SI',
         Suplemento: record.suplemento && record.suplemento == '1' ? true : false,
         errores: err,
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
   return await prismaClient.documentoContrato.findFirst({
      where: {
         AND: [{ ContratoId: contractId }, { DocumentoId: documentId }],
      },
   });
};

const createDocuments = async (createdContract: any, systemUser: Usuario, status: string, forPrecon: boolean) => {
   for (const productoTipoOperacion of createdContract.Producto.ProductoTipoOperacion) {
      for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
         /* const findDC = await findDocumentContract(productoDocumento.DocumentoId, createdContract.ContratoId);
         if (!findDC) { */
         if ((forPrecon && productoDocumento.Fase === 'PRECON') || !forPrecon) {
            await prismaClient.documentoContrato.create({
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
                  EstadoDoc: status,
                  FechaConciliacion: new Date(),
               },
            });
         }
         /* } */
      }
   }
};

const handlePreLoadConciliation = async (createdContract: any) => {
   const preLoadConciliation = await prismaClient.tipoConciliacion.findFirst({
      where: { nombre: 'Carga previa' },
   });

   if (preLoadConciliation) {
      await prismaClient.contrato.update({
         where: { ContratoId: createdContract.ContratoId },
         data: {
            TipoConciliacion: {
               connect: {
                  tipoConciliacionId: preLoadConciliation?.tipoConciliacionId,
               },
            },
            EstadoContrato: 'TRAMITADA',
         },
      });
   }
};

const handleIncidences = async (createdContract: any, systemUser: Usuario) => {
   for (const productoTipoOperacion of createdContract.Producto.ProductoTipoOperacion) {
      for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
         const documentoContrato = await prismaClient.documentoContrato.create({
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
               EstadoDoc: ContractDocumentStatusesEnum.NOT_PRESENT,
            },
         });

         /* const notFoundIncidence = await prismaClient.maestroIncidencias.findFirst({
            where: {
               DocAsociadoId: documentoContrato.DocId,
               Nombre: { contains: 'no se ha recibido' },
            },
         });

         if (notFoundIncidence) {
            await prismaClient.incidenciaDocumento.create({
               data: {
                  Usuario: {
                     connect: {
                        UsuarioId: systemUser?.UsuarioId,
                     },
                  },
                  DocumentoContrato: {
                     connect: {
                        DocumentoId: documentoContrato.DocumentoId,
                     },
                  },
                  MaestroIncidencias: {
                     connect: {
                        IncidenciaId: notFoundIncidence.IncidenciaId,
                     },
                  },
                  Contrato: {
                     connect: { ContratoId: documentoContrato.ContratoId },
                  },
                  MaestroDocumento: { connect: { DocumentoId: notFoundIncidence.DocAsociadoId! } },
               },
            });
         } */
      }
   }
};
