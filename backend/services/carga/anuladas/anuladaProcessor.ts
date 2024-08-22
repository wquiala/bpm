import moment from 'moment';
import promise from '../../../../frontend/src/utils/promise';
import { prismaClient } from '../../../server';
import { ESTADO_CONTRATO, OPERACION_CONTRATO } from '@prisma/client';
import { createContractHistory, fetchContrato } from '../policy/policyCreator';

export const anuladaProcessor = async (records: any, user: { UsuarioId: any }) => {
   let conError = 0;
   let actualizados = 0;
   let noactualizados = 0;
   console.log(records);
   for (let record of records) {
      if (!record['CLAVE_OPERACI�N'] || !record['FECHA EMISI�N ANULACI�N']) {
         conError++;
      } else if (!moment(record['FECHA EMISI�N ANULACI�N'], 'DD/MM/YYYY', true).isValid()) {
         conError++;
      } else {
         const contract = await prismaClient.contrato.findFirst({
            where: {
               ClaveOperacion: record['CLAVE_OPERACI�N'],
            },
         });

         if (contract) {
            const anulada = await prismaClient.contrato.update({
               where: {
                  ClaveOperacion: record['CLAVE_OPERACI�N'],
               },
               data: {
                  AnuladoSEfecto: true,
                  EstadoContrato: 'ANULADA',
               },
            });
            actualizados++;
            const {
               CompaniaId,
               ProductoId,
               CodigoPoliza,
               MediadorId,
               ClaveOperacion,
               TipoOperacion,
               CCC,
               CodigoSolicitud,
               updatedAt,
               TipoConciliacionId,
               ...rest
            } = anulada;
            await createContractHistory({
               ...rest,
               Operacion: OPERACION_CONTRATO.ANULADO,
               EstadoContrato: ESTADO_CONTRATO.ANULADA,
            });
         } else noactualizados++;
      }
      await prismaClient.anuladas.create({
         data: {
            claveOperacion: record['CLAVE_OPERACI�N'],
            compannia: record['COMPA��A'],
            motivoAnulacion: record['MOTIVO ANULACI�N'],
            fechaEfectoAnulacion:
               new Date(moment(record['FECHA EMISIÓN ANULACIÓN'], 'DD/MM/YYYY', true).toISOString()) ?? null,
            fechaEmisionAnulacion:
               new Date(moment(record['FECHA EFECTO ANULACI�N'], 'DD/MM/YYYY', true).toISOString()) ?? null,
         },
      });
   }
   return {
      actualizados,
      noactualizados,
      conError,
   };
};
