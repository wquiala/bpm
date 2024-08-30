import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { ESTADO_CONTRATO, Usuario } from '@prisma/client';
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

   if (query!) {
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
   }

   return comp;
};

export const fetchClave = (record: RecordDiaria) => {
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

export const fetchContrato = async (record: RecordDiaria, clave: string) => {
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

const fetchBranch = async (err: { [key: string]: string }, code: string = '') => {
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

      if (err['producto'])
         err['producto'] +=
            '. El producto no se encuentra registrado en la tabla maestra de productos del sistema, se asignará un código de producto temporal';
      else
         err['producto'] =
            'El producto no se encuentra registrado en la tabla maestra de productos del sistema, se asignará un código de producto temporal';
   }
   return producto;
};

const fetchMediator = async (err: { [key: string]: string }, code: string = '') => {
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

      if (err['mediador'])
         err['mediador'] +=
            '. El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal';
      else
         err['mediador'] =
            'El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal';
   }
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

   const company = await fetchCompany(err, record.compania);

   const branch = await fetchBranch(err, record.producto);

   const mediator = await fetchMediator(err, record.mediador);

   const clave = fetchClave(record);

   const { actualizar, query, solicitud } = await fetchContrato(record, clave);

   const CONTRATO = record.polizaContrato;
   if (actualizar) {
      let upd = false;
      const data: ContractUpdate = {};

      if (query?.Conciliar && record.conciliar == 'NO') {
         data.Conciliar = false;
         upd = true;
      }
      if (!query?.ResultadoFDCON && record.resultadoCon) {
         data.ResultadoFDCON = record.resultadoCon;
         upd = true;
      }
      if (!query?.TipoEnvioCON && record.tipoEnvioC) {
         data.TipoEnvioCON = record.tipoEnvioC = query?.TipoEnvioCON;
         upd = true;
      }
      if (!query?.IndicadorFDCON && record.indicadorCon === 'SI') {
         data.IndicadorFDCON = true;
         upd = true;
      }
      if (!query?.ResultadoFDPRECON && record.resultadoPrecon) {
         data.ResultadoFDPRECON = record.resultadoPrecon;
         upd = true;
      }

      if (!query?.TipoEnvioPRECON && record.tipoEnvioPrecon) {
         data.TipoEnvioPRECON = record.tipoEnvioPrecon;
         upd = true;
      }
      if (!query?.IndicadorFDPRECON && record.indicadorPrecon === 'SI') {
         data.IndicadorFDPRECON = true;
         upd = true;
      }

      if (!query?.Operador && record.operador) {
         data.Operador = record.operador;
         upd = true;
      }

      if (query?.MediadorId == 26314 && mediator!.MediadorId != 26314) {
         data.MediadorId = mediator?.MediadorId;
         upd = true;
      }

      if (!query?.NombreTomador && record.nombreTomador) {
         data.NombreTomador = record.nombreTomador;
         upd = true;
      }
      if (!query?.FechaValidezDNITomador && record.fechaValidezDniT) {
         data.FechaValidezDNITomador = new Date(moment(record.fechaValidezDniT, 'MM/DD/YYYY', true).toISOString());
         upd = true;
      }
      if (!query?.DNITomador && record.dniTomador) {
         data.DNITomador = record.dniTomador;
         upd = true;
      }

      if (!query?.DeporteAsegurado && record.deporte) {
         data.DeporteAsegurado = record.deporte;
         upd = true;
      }
      if (!query?.ProfesionAsegurado && record.profesion) {
         data.ProfesionAsegurado = record.profesion;
         upd = true;
      }
      if (!query?.CSRespAfirmativas && record.csResAfirm && record.csResAfirm == 'S') {
         data.CSRespAfirmativas = true;
         upd = true;
      }

      if (!query?.FechaNacimientoAsegurado && record.fechaNacimiento) {
         data.FechaNacimientoAsegurado = new Date(moment(record.fechaNacimiento, 'MM/DD/YYYY', true).toISOString());
         upd = true;
      }
      if (!query?.NombreAsegurado && record.nombreAsegurado) {
         data.NombreAsegurado = record.nombreAsegurado;
         upd = true;
      }

      if (!query?.DNIAsegurado && record.dniAsegurado) {
         data.DNIAsegurado = record.dniAsegurado;
         upd = true;
      }

      if (!query?.AnuladoSEfecto && record.anulaSE === 'S') {
         data.AnuladoSEfecto = true;
         upd = true;
      }

      if (!query?.FechaEfecto && record.fechaEfecto) {
         data.FechaEfecto = record.fechaEfecto;
         upd = true;
      }

      if (!query?.CodigoPoliza && data.CodigoPoliza) {
         data.CodigoPoliza = record.polizaContrato;
         upd = true;
      }

      if (!query?.FechaOperacion && record.fechaOperacion) {
         data.FechaOperacion = new Date(moment(record.fechaOperacion, 'MM/DD/YYYY', true).toISOString());
         upd = true;
      }
      if (branch?.ProductoId != 191 && query?.ProductoId == 191) {
         data.ProductoId = branch?.ProductoId;
         upd = true;
      }
      if (company?.CompaniaId != 5 && query?.CompaniaId == 5) {
         data.CompaniaId = company?.CompaniaId;
         upd = true;
      }
      if (solicitud && CONTRATO) {
         data.CodigoPoliza = CONTRATO;
         data.ClaveOperacion = CONTRATO;
         upd = true;
      }

      if (upd == true && query?.EstadoContrato != 'TRAMITADA') {
         data.EstadoContrato = ESTADO_CONTRATO.PENDIENTE_INCIDENCIA;
         const updated = await updatePolicy(data, query!.ContratoId);
         insert = false;
         details.push({
            ...record,
            estado: 'ACTUALIZADO',
            errores: err,
         });
         if ((data?.ResultadoFDCON?.includes('acept') && data?.IndicadorFDCON) || !data.Conciliar) {
            const query1 = await findDocumentContracts(updated.ContratoId);

            for (const dc of query1)
               await prismaClient.documentoContrato.update({
                  where: {
                     DocumentoId: dc.DocumentoId,
                  },
                  data: {
                     EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                  },
               });

            await prismaClient.contrato.update({
               where: {
                  ContratoId: updated.ContratoId,
               },
               data: {
                  EstadoContrato: 'TRAMITADA',
                  Conciliar: false,
               },
            });
         }
         data.ContratoId = updated.ContratoId;
         const { CompaniaId, ProductoId, CodigoPoliza, MediadorId, ClaveOperacion, ...rest } = data;

         await createContractHistory({
            ...rest,
            Operacion: OPERACION_CONTRATO.ACTUALIZADO,
            /*          EstadoContrato: ESTADO_CONTRATO.PENDIENTE_INCIDENCIA,
             */
         });
      }
   } else {
      const createdContract = await createContract(record, company, branch, mediator, user, err, clave);
      insert = true;
      details.push({
         ...record,
         estado: 'INSERTADO',
         errores: err,
      });

      if (
         (createdContract?.ResultadoFDCON.includes('acept') && createdContract?.IndicadorFDCON) ||
         !createdContract.Conciliar
      ) {
         console.log('Entrando aqui 1 ');

         await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, false);
         //await handlePreLoadConciliation(createdContract);
      } else if (
         /*  (createdContract?.ResultadoFDCON !== 'Transacción aceptada' && createdContract?.IndicadorFDCON) || */
         createdContract?.ResultadoFDPRECON.includes('acept') &&
         !createdContract?.ResultadoFDCON.includes('acept') /*  === 'Transacción aceptada' */
      ) {
         console.log('Entrando aqui 2 ');
         await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, true);
         // await handlePreLoadConciliation(createdContract);
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
   record: RecordDiaria,
   company: Company | null,
   branch: any,
   mediator: any,
   user: { UsuarioId: any },
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
         CSRespAfirmativas: record.csResAfirm == 'S',
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
         Suplemento: record.suplemento === '1',
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
               EstadoDoc: ContractDocumentStatusesEnum.NOT_PRESENT,
               FechaConciliacion: new Date(),
               ProdctoDoc: productoDocumento.ProductoDocId,
            },
         });
      }
   }

   if (!forPrecon) {
      console.log('primer if');
      await prismaClient.documentoContrato.updateMany({
         where: {
            ContratoId: createdContract.ContratoId,
         },
         data: {
            EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
         },
      });

      await handlePreLoadConciliation(createdContract);
   } else if (forPrecon) {
      console.log('segundo if');

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

      console.log(preconIds);

      await prismaClient.documentoContrato.updateMany({
         where: {
            ContratoId: createdContract.ContratoId,
            DocId: { in: preconIds },
            ProdctoDoc: { in: preconIdsPD },
         },
         data: {
            EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
         },
      });
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
            Conciliar: false,
         },
      });
   }
};

const handleIncidences = async (createdContract: any, systemUser: Usuario) => {
   for (const productoTipoOperacion of createdContract.Producto.ProductoTipoOperacion) {
      for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
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
               EstadoDoc: ContractDocumentStatusesEnum.NOT_PRESENT,
               ProdctoDoc: productoDocumento.ProductoDocId,
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
