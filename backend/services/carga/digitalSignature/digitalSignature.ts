import { prismaClient } from '../../../server';

export const digitalSignatureCreator = async (data: any) => {
   return await prismaClient.firmaDigital.create({
      data: {
         ...data,
      },
   });
};
