import { Incompletas, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { policyValidator } from '../../../helpers/policiyValidator';
import { RecordDiaria } from '../../../interfaces/contractsInterfaces';
import { incompletas } from './incompletas';
import { policyCreator } from './policyCreator';

export const processPolicyData = async (data: RecordDiaria[], user: { UsuarioId: any }) => {
   let details: any[] = [];
   let Insertados: number = 0;
   let Desechados: number = 0;
   let Actualizados: number = 0;
   let TotalRegistros: number = data.length;

   let conError: number = 0;
   let revisarCont = 0;

   const systemUser = await prismaClient.usuario.findFirst({
      where: {
         Codigo: '0001',
         Nombre: 'Sistema',
      },
   });
   for await (let record of data) {
      let errors: any[] = [];
      let errorMsg;

      const { error: err } = await policyValidator(record);

      if (!record.CodigoPoliza && !record.CodigoSolicitud && !record.CCC) {
         const incompletos = await prismaClient.incompletas.findMany();
         const withOut = incompletos.map((i: Incompletas) => {
            const { incompletaId, errores, createdAt, ...rest } = i;
            return rest;
         });

         const isIn = withOut.find(
            (w: any) => record.CodigoPoliza == w.CodigoPoliza && record.CodigoSolicitud == w.CodigoSolicitud,
         );
         if (!isIn) {
            await incompletas({ ...record, errores: err });
            revisarCont++;
            details.push({
               ...record,
               estado: 'INCOMPLETO REVISAR',
               errores: err,
            });
         }
      } else {
         const {
            hasError: hasErr,
            insert,
            Desechados: des,
            revisar,
         } = await policyCreator(record, systemUser as Usuario, user, err, details);
         Desechados += des;
         if (revisar) revisarCont++;

         if (hasErr) {
            conError++;
            details.push({
               ...record,
               estado: 'INCOMPLETO',
               errores: err,
            });
         }
         if (insert) Insertados++;
         if (insert == false) Actualizados++;
      }
   }

   return {
      Insertados,
      conError,
      Actualizados,
      Desechados,
      TotalRegistros,
      details,
      revisarCont,
   };
};
