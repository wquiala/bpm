import moment from 'moment';
import promise from '../../../../frontend/src/utils/promise';
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

   for (let record of records) {
      if (!record['CLAVE_OPERACIÓN'] || !record['FECHA EMISIÓN ANULACIÓN']) {
         conError++;
         details.push({
            ...record,
            estado: 'NO PROCESADA',
            errores: {
               claveFecha: 'Sin clave o fecha',
            },
         });
      } else if (!moment(record['FECHA EMISIÓN ANULACIÓN'], 'DD/MM/YYYY', true).isValid()) {
         conError++;
         details.push({
            ...record,
            estado: 'NO PROCESADA',
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
         if (contract) {
            anulada = await prismaClient.contrato.update({
               where: {
                  ContratoId: contract.ContratoId,
               },
               data: {
                  AnuladoSEfecto: true,
                  EstadoContrato: 'ANULADA',
                  Conciliar: false,
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
            console.log(rest);
            await createContractHistory({
               ...rest,
               Operacion: OPERACION_CONTRATO.ANULADO,
               EstadoContrato: ESTADO_CONTRATO.ANULADA,
            });
         } else noactualizados++;
      }
      await prismaClient.anuladas.create({
         data: {
            claveOperacion: record['CLAVE_OPERACIÓN'],
            compannia: record['COMPAÑÍA'],
            motivoAnulacion: record['MOTIVO ANULACIÓN'],
            fechaEfectoAnulacion: parserDate(record['FECHA EMISIÓN ANULACIÓN']) ?? null,
            fechaEmisionAnulacion: parserDate(record['FECHA EFECTO ANULACIÓN']) ?? null,
         },
      });

      insertado++;
   }
   return {
      actualizados,
      noactualizados,
      conError,
      details,
      insertado,
   };
};
