import { Comunicacion } from '@prisma/client';
import { prismaClient } from '../../server';

export const createComunicationService = async (data: any, userId: string) => {
   const { contratoId, ...rest } = data;
   return await prismaClient.comunicacion.create({
      data: {
         ...rest,
         Usuario: {
            connect: {
               UsuarioId: parseInt(userId),
            },
         },
         Contrato: {
            connect: {
               ContratoId: contratoId,
            },
         },
      },
   });
};

export const getComunicationByIdService = async (id: number) => {
   return await prismaClient.comunicacion.findFirst({
      where: {
         comunicationId: id,
      },
   });
};

export const getComunicationsService = async () => {
   return await prismaClient.comunicacion.findMany();
};
