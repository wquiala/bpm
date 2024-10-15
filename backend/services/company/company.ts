import { NotFoundException } from '../../exceptions/not-found';
import { ErrorCode } from '../../exceptions/root';
import { prismaClient } from '../../server';

export const getCompanyByIdService = async (id: number | undefined) => {
   try {
      const company = await prismaClient.compania.findFirstOrThrow({
         where: {
            CompaniaId: id,
         },
      });

      return company;
   } catch (error) {
      throw new NotFoundException('Compañía not found', ErrorCode.COMPANY_NOT_FOUND);
   }
};
