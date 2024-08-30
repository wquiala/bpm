import { OPERACION_CONTRATO, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { digitalSignature } from './digitalSignatureCreator';
import { ContractHistoryData } from '../../../interfaces/contractsInterfaces';
import { createContractHistory } from '../policy/policyCreator';

export const contractUpdater = async (
   record: any,
   systemUser: Usuario,
   user: { UsuarioId: any },
   err: { [key: string]: string },
   details: any[],
) => {
   let updated;

   if (
      record['RESULTADO'].includes('acept')
      /*  record['RESULTADO'] === 'Todos los usuarios del grupo han aceptado el proceso' */
   ) {
      const contract = await prismaClient.contrato.findFirst({
         where: {
            CodigoPoliza: record['NUM_POLIZA'],
         },
         include: {
            DocumentoContrato: {
               include: {
                  IncidenciaDocumento: true,
                  MaestroDocumentos: true,
               },
            },
         },
      });

      const conciliationType = await prismaClient.tipoConciliacion.findFirst({
         where: {
            nombre: 'Firma digital',
         },
      });

      if (contract && conciliationType) {
         await digitalSignature(record, true, err);
         updated = true;
         for (const documentoContrato of contract.DocumentoContrato) {
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
         }

         const contratoUpdated = await prismaClient.contrato.update({
            where: {
               ContratoId: contract.ContratoId,
            },
            data: {
               TipoConciliacion: {
                  connect: {
                     tipoConciliacionId: conciliationType.tipoConciliacionId,
                  },
               },
               FechaEfecto: new Date(),
               ResultadoFDCON: record['RESULTADO'],
               EstadoContrato: 'TRAMITADA',
               Conciliar: false,
               /*   Usuario: {
                                    connect: {
                                          UsuarioId: systemUser?.UsuarioId,
         ado:                            },
                              }, */
            },
         });

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
         } = contratoUpdated;
         const dataH: ContractHistoryData = data;

         await createContractHistory({
            ...data,
            Operacion: OPERACION_CONTRATO.ACTUALIZADO,
            /*          EstadoContrato: ESTADO_CONTRATO.PENDIENTE_INCIDENCIA,
             */
         });
         details.push({
            ...record,
            estado: 'ACTUALIZADO',
            errores: err,
         });
      } else {
         await digitalSignature(record, false, err);
         updated = false;
         details.push({
            ...record,
            estado: 'NO ACTUALIZADO',
            errores: err,
         });
      }
   } else {
      await digitalSignature(record, false, err);
      updated = false;
      details.push({
         ...record,
         estado: 'NO ACTUALIZADO',
         errores: err,
      });
   }
   return {
      updated,
   };
};
