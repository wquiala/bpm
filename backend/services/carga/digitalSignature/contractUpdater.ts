import { OPERACION_CONTRATO, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { digitalSignature } from './digitalSignatureCreator';
import { createContractHistory } from '../../contracts/contractService';
import { findTipoConciliacion } from '../../tipoConciliacion/tipoConciliacion';
import { TiposConciliacion } from '../../../constants/TiposConciliacion';
import { createContractDocumentHistory } from '../../contractDocuments/contractDocuments';
import { parserDate } from '../../../helpers/time';
import moment from 'moment';

export const contractUpdater = async (
   record: any,
   systemUser: Usuario,
   user: { UsuarioId: any },
   err: { [key: string]: string },
   details: any[],
) => {
   let updated = false;

   if (record['RESULTADO']) {
      const contract = await prismaClient.contrato.findFirst({
         where: {
            OR: [{ CodigoPoliza: record['NUM_POLIZA'] }, { CodigoSolicitud: record['NUM_POLIZA'] }],
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

      if (record['RESULTADO'].toLowerCase().includes('acept')) {
         const conciliationType = await findTipoConciliacion(TiposConciliacion.firma_digital);

         if (
            contract &&
            contract.EstadoContrato == 'TRAMITADA' &&
            (contract.ResultadoFDCON == '' || !contract.ResultadoFDCON.includes('acept'))
         ) {
            const contratoUpdated = await prismaClient.contrato.update({
               where: {
                  ContratoId: contract?.ContratoId,
               },
               data: {
                  ResultadoFDCON: record['RESULTADO'],
                  TipoEnvioCON: record['TIPO_ENVIO'],

                  Usuario: {
                     connect: {
                        UsuarioId: systemUser?.UsuarioId,
                     },
                  },
               },
            });

            updated = true;

            const {
               Activo,

               TipoOperacion,
               updatedAt,
               TipoConciliacionId,
               UsuarioId,
               ...data
            } = contratoUpdated;

            await createContractHistory({
               ...data,
               Operacion: OPERACION_CONTRATO.ACTUALIZADO,
            });
            details.push({
               ...record,
               estado: 'ACTUALIZADO',
               errores: err,
            });

            //Aqui tengo que ponerlo como actualizado en true en el history
            await digitalSignature(record, true, err);
         } else if (contract && conciliationType && contract.EstadoContrato != 'TRAMITADA') {
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
               const document = await prismaClient.documentoContrato.update({
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

                     TipoConciliacion: {
                        connect: { tipoConciliacionId: conciliationType.tipoConciliacionId },
                     },
                     FechaEstado: moment(record['FECHA_CIERRE'], 'DD/MM/YYYY HH:mm:ss').toDate(),
                  },
               });

               const { ContratoId, ...dataD } = document;
               const toSend = {
                  ...dataD,
                  TipoConciliacion: conciliationType.nombre,
               };
               /*  */
               await createContractDocumentHistory(toSend);
            }

            const contratoUpdated = await prismaClient.contrato.update({
               where: {
                  ContratoId: contract?.ContratoId,
               },
               data: {
                  TipoConciliacion: {
                     connect: {
                        tipoConciliacionId: conciliationType.tipoConciliacionId,
                     },
                  },
                  FechaEfecto: new Date(),
                  ResultadoFDCON: record['RESULTADO'],
                  TipoEnvioCON: record['TIPO_ENVIO'],

                  EstadoContrato: 'TRAMITADA',

                  Usuario: {
                     connect: {
                        UsuarioId: systemUser?.UsuarioId,
                     },
                  },
               },
            });
            updated = true;

            const {
               Activo,

               TipoOperacion,
               updatedAt,
               TipoConciliacionId,
               UsuarioId,
               ...data
            } = contratoUpdated;

            await createContractHistory({
               ...data,
               Operacion: OPERACION_CONTRATO.ACTUALIZADO,
            });
            details.push({
               ...record,
               estado: 'ACTUALIZADO',
               errores: err,
            });

            //Aqui tengo que ponerlo como actualizado en true en el history
            await digitalSignature(record, true, err);
         } else {
            details.push({
               ...record,
               estado: 'DESECHADO',
               errores: err,
            });
         }
      } else if (
         contract &&
         (contract.EstadoContrato != 'TRAMITADA' ||
            (contract.EstadoContrato == 'TRAMITADA' &&
               (contract.ResultadoFDCON == '' || !contract.ResultadoFDCON.includes('acept'))))
      ) {
         const contratoUpdated = await prismaClient.contrato.update({
            where: {
               ContratoId: contract?.ContratoId,
            },
            data: {
               ResultadoFDCON: record['RESULTADO'],
               TipoEnvioCON: record['TIPO_ENVIO'],

               Usuario: {
                  connect: {
                     UsuarioId: systemUser?.UsuarioId,
                  },
               },
            },
         });

         updated = true;

         const {
            Activo,

            TipoOperacion,
            updatedAt,
            TipoConciliacionId,
            UsuarioId,
            ...data
         } = contratoUpdated;

         await createContractHistory({
            ...data,
            Operacion: OPERACION_CONTRATO.ACTUALIZADO,
         });
         details.push({
            ...record,
            estado: 'ACTUALIZADO',
            errores: err,
         });

         //Aqui tengo que ponerlo como actualizado en true en el history
         await digitalSignature(record, true, err);
      } else {
         details.push({
            ...record,
            estado: 'DESECHADO',
            errores: err,
         });
      }
   }

   return {
      updated,
   };
};
