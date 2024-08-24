import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { digitalSignatureValidator } from '../../../helpers/digitalSignatureValidator';
import { contractUpdater } from './contractUpdater';
import { digitalSignature } from './digitalSignatureCreator';

/* import { contractUpdater } from "./contractUpdater";
 */
export const processDigitalSignatureData = async (records: any[], user: { UsuarioId: any }) => {
   let actualizados = 0;
   let noactualizados = 0;
   let details: any[] = [];
   let RegistrosOk: number = 0;
   let RegistrosError: number = 0;

   const systemUser = await prismaClient.usuario.findFirst({
      where: {
         Codigo: '0001',
         Nombre: 'Sistema',
      },
   });

   for await (let record of records) {
      let hasError = false;
      let errors: any[] = [];

      const { hasError: hasErr, errors: err } = await digitalSignatureValidator(record);

      if (hasErr) {
         hasError = true;
         errors = [...err, ...errors];
      }

      if (hasError) {
         details.push({
            ...record,
            estado: 'NO ACTUALIZADA',
         });
         RegistrosError++;
      } else {
         const { updated } = await contractUpdater(record, systemUser as Usuario, user);
         details.push({
            ...record,
            estado: 'ACTUALIZADO',
         });

         updated ? actualizados++ : noactualizados++;
      }
   }

   return {
      actualizados,
      noactualizados,
      details,
      /*       ErrorLogs,
       */ RegistrosError,
      totalRegistros: records.length,
   };
};
