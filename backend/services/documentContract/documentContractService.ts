import { NotFoundException } from '../../exceptions/not-found';
import { ErrorCode } from '../../exceptions/root';
import { prismaClient } from '../../server';

export const getDocumentContractById = async (id: number) => {
   try {
      const documentContract = await prismaClient.documentoContrato.findFirstOrThrow({
         where: {
            DocumentoId: id,
         },
      });

      return documentContract;
   } catch (error) {
      throw new NotFoundException('No se encuentra este documento', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};
