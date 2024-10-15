import { NotFoundException } from '../../exceptions/not-found';
import { ErrorCode } from '../../exceptions/root';
import { prismaClient } from '../../server';

export const getProductoById = async (id: number) => {
   try {
      const branch = await prismaClient.producto.findFirstOrThrow({
         where: {
            ProductoId: id,
         },
      });
      return branch;
   } catch (error) {
      throw new NotFoundException('Branch not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};
