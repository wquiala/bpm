import { OPERACION_CONTRATO, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { tabletsCreator } from './tabletsCreator';
import { ContractHistoryData } from '../../../interfaces/contractsInterfaces';
import { createContractHistory } from '../policy/policyCreator';

const fetchContract = async (ccc: string) => {
   return prismaClient.contrato.findFirst({
      where: { CCC: ccc },
      include: {
         DocumentoContrato: {
            include: {
               IncidenciaDocumento: true,
               MaestroDocumentos: true,
            },
         },
      },
   });
};

const fetchConciliationType = async (name: string) => {
   return prismaClient.tipoConciliacion.findFirst({
      where: { nombre: name },
   });
};

const resolveIncidences = async (documentoContrato: any, systemUser: Usuario) => {
   for (const documentIncidence of documentoContrato.IncidenciaDocumento) {
      await prismaClient.incidenciaDocumento.update({
         where: {
            IncidenciaDocId: documentIncidence.IncidenciaDocId,
         },
         data: {
            Resuelta: true,
            Usuario: {
               connect: {
                  UsuarioId: systemUser?.UsuarioId,
               },
            },
         },
      });
   }
};

const updateDocumentStatus = async (documentoContrato: any, systemUser: Usuario) => {
   await prismaClient.documentoContrato.update({
      where: {
         DocumentoId: documentoContrato.DocumentoId,
      },
      data: {
         EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
         FechaConciliacion: new Date(),
         Usuario: {
            connect: {
               UsuarioId: systemUser?.UsuarioId,
            },
         },
      },
   });
};

const updateContractStatus = async (
   contractId: number,
   conciliationTypeId: number,
   record: any,
   systemUser: Usuario,
) => {
   return await prismaClient.contrato.update({
      where: {
         ContratoId: contractId,
      },
      data: {
         TipoConciliacion: {
            connect: {
               tipoConciliacionId: conciliationTypeId,
            },
         },
         ResultadoFDCON: record['SITUACION_FIRMA'],
         EstadoContrato: 'TRAMITADA',
         Conciliar: false,
         /*  Usuario: {
                        connect: {
                              UsuarioId: systemUser?.UsuarioId,
                        },
                  }, */
      },
   });
};

const checkAndUpdateContractStatus = async (contract: any, conciliationType: any, record: any, systemUser: Usuario) => {
   const documentContracts = await prismaClient.documentoContrato.findMany({
      where: {
         ContratoId: contract.ContratoId,
      },
   });

   const hasIncidences = documentContracts.some((documentContract) => documentContract.FechaConciliacion === null);

   if (!hasIncidences) {
      const updated = await updateContractStatus(
         contract.ContratoId,
         conciliationType.tipoConciliacionId,
         record,
         systemUser,
      );

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
         TipoConciliacionId,
         ...data
      } = updated;
      const dataH: ContractHistoryData = data;

      await createContractHistory({
         ...data,
         Operacion: OPERACION_CONTRATO.ACTUALIZADO,
         /*          EstadoContrato: ESTADO_CONTRATO.PENDIENTE_INCIDENCIA,
          */
      });
   }
};

export const contractUpdater = async (
   record: any,
   systemUser: Usuario,
   user: { UsuarioId: any },
   details: any,
   err: { [key: string]: string },
) => {
   let conError = 0;
   let hasError;
   let updated;
   if (
      record['CODIGO_INTERNO_FORMULARIO'] === 'SOL' ||
      record['CODIGO_INTERNO_FORMULARIO'] === 'SEPA' ||
      record['CODIGO_INTERNO_FORMULARIO'] === 'CP' ||
      record['CODIGO_INTERNO_FORMULARIO'] === 'CS' ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' && record['DESC_OPERACION'] === 'Alta') ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' && record['DESC_OPERACION'] === 'Solicitud') ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' && record['*cuestio*']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'PDUR' && record['Alta']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'PDUR' && record['Solicitud']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'PDUR' && record['*cuestio*']) ||
      record['FECHA_FIRMA'] ||
      record['CONCILIAR'] === '1'
   ) {
      const contract = await fetchContract(record['CCC']);
      const codigoForm = record['CODIGO_INTERNO_FORMULARIO'];

      const conciliationType = await fetchConciliationType('Por Fichero Tableta (CCC)');
      await tabletsCreator(record, true, err);
      let a = 0;

      if (contract && conciliationType) {
         for (const documentoContrato of contract.DocumentoContrato) {
            if (['SOL', 'SEPA', 'CP', 'CS'].includes(documentoContrato.MaestroDocumentos.Codigo)) {
               if (documentoContrato.MaestroDocumentos.Codigo == codigoForm) {
                  await resolveIncidences(documentoContrato, systemUser);

                  const query = await updateDocumentStatus(documentoContrato, systemUser);
                  if (codigoForm == 'CP') {
                     const cs = await prismaClient.documentoContrato.findFirst({
                        where: {
                           ContratoId: contract.ContratoId,
                           DocId: 11,
                        },
                     });
                     await prismaClient.documentoContrato.update({
                        where: {
                           DocumentoId: cs?.DocumentoId,
                        },
                        data: {
                           EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                           FechaConciliacion: new Date(),
                           Usuario: {
                              connect: {
                                 UsuarioId: systemUser?.UsuarioId,
                              },
                           },
                        },
                     });
                  }
                  if (codigoForm == 'SOL') {
                     const cs = await prismaClient.documentoContrato.findFirst({
                        where: {
                           ContratoId: contract.ContratoId,
                           DocId: 4,
                        },
                     });
                     await prismaClient.documentoContrato.update({
                        where: {
                           DocumentoId: cs?.DocumentoId,
                        },
                        data: {
                           EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                           FechaConciliacion: new Date(),
                           Usuario: {
                              connect: {
                                 UsuarioId: systemUser?.UsuarioId,
                              },
                           },
                        },
                     });
                  }
                  if (codigoForm == 'CS') {
                     const cp = await prismaClient.documentoContrato.findFirst({
                        where: {
                           ContratoId: contract.ContratoId,
                           DocId: 4,
                        },
                     });
                     await prismaClient.documentoContrato.update({
                        where: {
                           DocumentoId: cp?.DocumentoId,
                        },
                        data: {
                           EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                           FechaConciliacion: new Date(),
                           Usuario: {
                              connect: {
                                 UsuarioId: systemUser?.UsuarioId,
                              },
                           },
                        },
                     });
                  }
                  updated = true;
                  details.push({
                     ...record,
                     estado: 'ACTUALIZADO',
                     errores: err,
                  });
               }
            }
         }
         /*          if (documentoContrato.EstadoDoc == 'CORRECT') a++;
          */

         const cant = await prismaClient.documentoContrato.findMany({
            where: {
               ContratoId: contract.ContratoId,
               EstadoDoc: 'CORRECT',
            },
         });
         console.log(contract.DocumentoContrato.length);
         if (cant.length == contract.DocumentoContrato.length) {
            const updated = await checkAndUpdateContractStatus(contract, conciliationType, record, systemUser);
         }
      } else {
         updated = false;
         details.push({
            ...record,
            estado: 'NO ACTUALIZADO',
            errores: err,
         });
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
   } else {
      await tabletsCreator(record, true, err);

      details.push({
         ...record,
         estado: 'DESECHADO',
         errores: err,
      });
   }
   return { updated };
};
