import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { digitalSignatureValidator } from '../../../helpers/digitalSignatureValidator';
import { contractUpdater } from './contractUpdater';
import { objetInspectElement } from '../../../helpers/objetcInspect';

export const processDigitalSignatureData = async (records: any[], user: { UsuarioId: any }) => {
   let actualizados = 0;
   let noactualizados = 0;
   let details: any[] = [];
   let RegistrosOk: number = 0;
   let RegistrosError: number = 0;
   let Insertados = 0;
   let Desechados = 0;

   const systemUser = await prismaClient.usuario.findFirst({
      where: {
         Codigo: '0001',
         Nombre: 'Sistema',
      },
   });

   for await (let record of records) {
      let hasError = false;

      const { errors: err } = await digitalSignatureValidator(record);

      const withElement = objetInspectElement(err);

      if (!record['NUM_POLIZA'] || !record['RESULTADO']) {
         details.push({
            ...record,
            estado: 'DESECHADO SIN NUMERO DE PÓLIZA O RESULTADO',
            errores: err,
         });
         Desechados++;
      } else if (withElement) {
         details.push({
            ...record,
            estado: 'DESECHADO SIN CONTRATO QUE ACTUALIZAR',
            errores: err,
         });
         Desechados++;
      } else {
         const { updated } = await contractUpdater(record, systemUser as Usuario, user, err, details);

         updated ? actualizados++ : Desechados++;
      }
   }

   return {
      actualizados,
      details,
      Desechados,
      totalRegistros: records.length,
   };
};
