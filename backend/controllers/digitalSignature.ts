import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';

export const getDigitalSignatureByContract = async (req: Request, res: Response) => {
   console.log(req.params.contract);
   try {
      const digitalSignature = await prismaClient.firmaDigital.findMany({
         where: {
            NumPoliza: req.params.contract,
         },
         orderBy: { createdAt: 'desc' },
      });

      res.json(digitalSignature);
   } catch (error) {
      throw new NotFoundException('Firma Digital no encontrada', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};
