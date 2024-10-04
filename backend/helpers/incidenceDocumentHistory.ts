import { prismaClient } from '../server';

interface Props {
   IncidenciaDocId: number;
   Resultado: boolean;
}

export const findIncidenceHistory = async ({ IncidenciaDocId, Resultado }: Props) => {
   return await prismaClient.incidenciaDocumentoHistory.findFirst({
      where: {
         IncidenciaDocId: IncidenciaDocId,
         Resuelta: Resultado,
      },
   });
};
