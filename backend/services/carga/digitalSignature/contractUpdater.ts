import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { digitalSignature } from './digitalSignatureCreator';

export const contractUpdater = async (record: any, systemUser: Usuario, user: { UsuarioId: any }) => {
   let updated;

   if (
      record['RESULTADO'] === 'Transacción aceptada' ||
      record['RESULTADO'] === 'Todos los usuarios del grupo han aceptado el proceso'
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
         await digitalSignature(record, true);
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

         await prismaClient.contrato.update({
            where: {
               ContratoId: contract.ContratoId,
            },
            data: {
               TipoConciliacion: {
                  connect: {
                     tipoConciliacioId: conciliationType.tipoConciliacioId,
                  },
               },
               FechaEfecto: new Date(),
               ResultadoFDCON: record['RESULTADO'],
               /*   Usuario: {
                                    connect: {
                                          UsuarioId: systemUser?.UsuarioId,
                                    },
                              }, */
            },
         });
      } else {
         await digitalSignature(record, false);
         updated = false;
      }
   } else {
      await digitalSignature(record, false);
      updated = false;
   }
   return {
      updated,
   };
};
