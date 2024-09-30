import { prismaClient } from '../../server';

export const updateIncidenciaDocumentoService = (id: number, data: any) => {
   return prismaClient.incidenciaDocumento.update({
      where: {
         IncidenciaDocId: id,
      },
      data: {
         ...data,
      },
   });
};
