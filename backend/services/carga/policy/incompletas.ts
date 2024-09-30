import { prismaClient } from '../../../server';

export const incompletas = async (data: any) => {
   return await prismaClient.incompletas.create({
      data: {
         ...data,
      },
   });
};
