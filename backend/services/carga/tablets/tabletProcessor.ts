import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';

import { TabletaRecord } from '../../../interfaces/contractsInterfaces';
import { tabletsCreator } from './tabletsCreator';
import { tabletValidator } from '../../../helpers/tabletValidator';
import { contractUpdater } from './contractUpdater';

export const processTabletData = async (records: TabletaRecord[], user: { UsuarioId: any }) => {
   let actualizados = 0;
   let noactualizados = 0;
   let ErrorLogs: any[] = [];
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

      const { hasError: hasErr, errors: err } = await tabletValidator(record);

      if (hasErr) {
         hasError = true;
         errors = [...err, ...errors];
      }

      if (hasError) {
         ErrorLogs.push({
            ...record,
            errors,
         });
         RegistrosError++;
      } else {
         const { updated } = await contractUpdater(record, systemUser as Usuario, user);

         updated ? actualizados++ : noactualizados++;
      }
   }

   return {
      actualizados,
      noactualizados,
      ErrorLogs,
      RegistrosOk,
      RegistrosError,
   };
};
