import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';

import { TabletaRecord } from '../../../interfaces/contractsInterfaces';
import { tabletValidator } from '../../../helpers/tabletValidator';
import { contractUpdater } from './contractUpdater';
import { objetInspectElement } from '../../../helpers/objetcInspect';

export const processTabletData = async (records: TabletaRecord[], user: { UsuarioId: any }) => {
   let actualizados = 0;
   let noactualizados = 0;
   let details: any[] = [];
   let RegistrosOk: number = 0;
   let RegistrosError: number = 0;
   let Desechados: number = 0;

   const systemUser = await prismaClient.usuario.findFirst({
      where: {
         Codigo: '0001',
         Nombre: 'Sistema',
      },
   });

   for await (let record of records) {
      const { error: errs } = await tabletValidator(record);

      const withElements = objetInspectElement(errs);

      if (!record.CCC || !record.CODIGO_INTERNO_FORMULARIO || !record.FECHA_FIRMA) {
         details.push({
            ...record,
            estado: 'DESECHADO SIN INFORMACIÓN SUFICIENTE PARA ACTUALIZAR',
         });
         Desechados++;
      } else if (withElements) {
         details.push({
            ...record,
            estado: 'DESECHADO CONTRATO NO ENCONTRADO',
            errores: errs,
         });
         Desechados++;
      } else {
         const { updated } = await contractUpdater(record, systemUser as Usuario, user, details, errs);

         updated ? actualizados++ : Desechados++;
      }
   }

   return {
      actualizados,
      details,
      Desechados,
   };
};
