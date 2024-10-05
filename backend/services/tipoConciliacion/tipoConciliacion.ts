import { prismaClient } from '../../server';

export const findTipoConciliacion = async (nombre: string) => {
   return await prismaClient.tipoConciliacion.findFirst({
      where: {
         nombre: nombre,
      },
   });
};
