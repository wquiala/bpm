import { prismaClient } from '../server';
interface Props {
   DocumentoId: number;
   DocId: number;
   EstadoDoc: string;
}
export const findContractDocumentHistory = async ({ DocId, DocumentoId, EstadoDoc }: Props) => {
   return await prismaClient.documentoContratoHistory.findFirst({
      where: {
         AND: {
            DocumentoId: DocumentoId,
            DocId: DocId,
            EstadoDoc: EstadoDoc,
            //createdAt: fecha,
         },
      },
   });
};
