import { NotFoundException } from '../../exceptions/not-found';
import { ErrorCode } from '../../exceptions/root';
import { prismaClient } from '../../server';

export const getMediatorByIdService = async (id: number | undefined) => {
   try {
      const mediador = await prismaClient.mediador.findFirstOrThrow({
         where: {
            MediadorId: id,
         },
      });

      return mediador;
   } catch (error) {
      throw new NotFoundException('Mediator not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};
