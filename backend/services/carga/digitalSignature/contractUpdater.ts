import { OPERACION_CONTRATO, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { digitalSignature } from './digitalSignatureCreator';
import { createContractHistory, findContractByCode, updateContractService } from '../../contracts/contractService';
import { findTipoConciliacion } from '../../tipoConciliacion/tipoConciliacion';
import { TiposConciliacion } from '../../../constants/TiposConciliacion';
import { updateDocumentContractByContract } from '../../documentContract/documentContractService';

export const contractUpdater = async (
   record: any,
   systemUser: Usuario,
   user: { UsuarioId: any },
   err: { [key: string]: string },
   details: any[],
) => {
   let updated = false;

   const contract = await findContractByCode(record['NUM_POLIZA']);

   if (record['RESULTADO'].toLowerCase().includes('acept')) {
      const conciliationType = await findTipoConciliacion(TiposConciliacion.firma_digital);

      if (
         contract &&
         contract.EstadoContrato == 'TRAMITADA' &&
         (contract.ResultadoFDCON == '' || !contract.ResultadoFDCON.includes('acept'))
      ) {
         const toSend = {
            ResultadoFDCON: record['RESULTADO'],
            TipoEnvioCON: record['TIPO_ENVIO'],

            Usuario: {
               connect: {
                  UsuarioId: systemUser?.UsuarioId,
               },
            },
         };
         const contratoUpdated = await updateContractService(contract.ContratoId, toSend);

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
         await updateDocumentContractByContract(
            contract,
            ContractDocumentStatusesEnum.CORRECT,
            systemUser,
            conciliationType,
            record['FECHA_CIERRE'],
         );

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
            estado: 'DESECHADO PÓLIZA YA ACTUALIZADA ACEPTADA',
            errores: err,
         });
      }
   } else if (
      contract &&
      record['RESULTADO'] != contract.ResultadoFDCON &&
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
         estado: 'DESECHADO RESULTADO DE LA FIRMA YA ACTUALIZADO',
         errores: err,
      });
   }

   return {
      updated,
   };
};
