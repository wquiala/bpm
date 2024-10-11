import moment from 'moment';
import { prismaClient } from '../../../server';
import { ESTADO_CONTRATO, OPERACION_CONTRATO } from '@prisma/client';
import { parserDate } from '../../../helpers/time';
import { createContractHistory } from '../../contracts/contractService';

export const anuladaProcessor = async (records: any, user: { UsuarioId: any }) => {
   let conError = 0;
   let actualizados = 0;
   let noactualizados = 0;
   let details: any[] = [];
   let insertado = 0;
   let Desechados = 0;

   for (let record of records) {
      if (!record['CLAVE_OPERACIÓN'] || !record['FECHA EMISIÓN ANULACIÓN']) {
         Desechados++;
         details.push({
            ...record,
            estado: 'DESECHADO',
            errores: {
               claveFecha: 'Sin clave o fecha',
            },
         });
      } else if (!moment(record['FECHA EMISIÓN ANULACIÓN'], 'DD/MM/YYYY', true).isValid()) {
         Desechados++;
         details.push({
            ...record,
            estado: 'DESECHADO',
            errores: {
               fechaemision: 'Fecha no válida',
            },
         });
      } else {
         let anulada;

         const contract = await prismaClient.contrato.findFirst({
            where: {
               OR: [
                  {
                     CodigoPoliza: record['CLAVE_OPERACIÓN'],
                  },
                  {
                     CodigoSolicitud: record['CLAVE_OPERACIÓN'],
                  },
               ],
            },
         });
         if (contract && contract.EstadoContrato != 'ANULADA') {
            anulada = await prismaClient.contrato.update({
               where: {
                  ContratoId: contract.ContratoId,
               },
               data: {
                  AnuladoSEfecto: true,
                  EstadoContrato: 'ANULADA',
               },
            });
            details.push({
               ...record,
               estado: 'ACTUALIZADO',
               errores: {
                  estado: 'ANULADA',
               },
            });
            actualizados++;
            const {
               Activo,

               TipoOperacion,
               updatedAt,
               TipoConciliacionId,
               UsuarioId,

               ...rest
            } = anulada;
            await createContractHistory({
               ...rest,
               Operacion: OPERACION_CONTRATO.ANULADO,
               EstadoContrato: ESTADO_CONTRATO.ANULADA,
            });

            await prismaClient.anuladas.create({
               data: {
                  claveOperacion: record['CLAVE_OPERACIÓN'],
                  compannia: record['COMPAÑÍA'],
                  motivoAnulacion: record['MOTIVO ANULACIÓN'],
                  fechaEfectoAnulacion: parserDate(record['FECHA EMISIÓN ANULACIÓN']) ?? null,
                  fechaEmisionAnulacion: parserDate(record['FECHA EFECTO ANULACIÓN']) ?? null,
               },
            });
         } else {
            Desechados++;
            details.push({
               ...record,
               estado: 'DESECHADO',
               errores: {
                  claveFecha: 'Sin registro que actualizar',
               },
            });
         }
      }
   }
   return {
      actualizados,
      details,
      Desechados,
   };
};
