import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';

import { TabletaRecord } from '../../../interfaces/contractsInterfaces';
import { tabletValidator } from '../../../helpers/tabletValidator';
import { contractUpdater } from './contractUpdater';

export const processTabletData = async (records: TabletaRecord[], user: { UsuarioId: any }) => {
   let actualizados = 0;
   let noactualizados = 0;
   let details: any[] = [];
   let RegistrosOk: number = 0;
   let RegistrosError: number = 0;
   let Desechado: number = 0;

   const systemUser = await prismaClient.usuario.findFirst({
      where: {
         Codigo: '0001',
         Nombre: 'Sistema',
      },
   });

   for await (let record of records) {
      let hasError = false;
      let errors: any[] = [];

      const { error: errs } = await tabletValidator(record);

      const { updated } = await contractUpdater(record, systemUser as Usuario, user, details, errs);

      updated ? actualizados++ : noactualizados++;
   }

   return {
      actualizados,
      noactualizados,
      details,
      RegistrosOk,
      RegistrosError,
   };
};
