import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { InternalException } from '../exceptions/internal-exception';
import { createContratoSchema, updateContratoSchema } from '../schema/contract';
import { BadRequestsException } from '../exceptions/bad-requests';
import { createCajaLoteSchema } from '../schema/cajaLote';

export const getCajaLote = async (req: Request, res: Response) => {
   const { caja, lote, contratoId } = req.query;
   let contrato = null;
   let documntoContrato;
   if (!contratoId) {
      throw new BadRequestsException('El contrato es obligatorio', ErrorCode.BAD_REQUEST_EXCEPTION);
   }
   if (contratoId) {
      try {
         contrato = await prismaClient.contrato.findFirstOrThrow({
            where: {
               ContratoId: parseInt(contratoId as string),
            },
         });
      } catch (error) {
         throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
      }
   }

   const cajasLotes = await prismaClient.cajaLote.findMany({
      include: {
         Contrato: true,
      },
   });

   res.json(cajasLotes);
};

export const createCajaLote = async (req: Request, res: Response) => {
   const validatedData = createCajaLoteSchema.parse(req.body);

   try {
      await prismaClient.contrato.findFirstOrThrow({
         where: {
            ContratoId: validatedData.contratoId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   /* try {
      await prismaClient.documentoContrato.findFirstOrThrow({
         where: {
            DocumentoId: validatedData.documento,
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
 */
   try {
      const cajaLote = await prismaClient.cajaLote.create({
         data: {
            Caja: validatedData.caja,
            Lote: validatedData.lote,
            Contrato: {
               connect: {
                  ContratoId: validatedData.contratoId,
               },
            },
            Nota: validatedData.nota,
            /*             DocumentoId: validatedData.documento ?? null,
    DocumentoContrato: {
               connect: {
                  DocumentoId: validatedData.documento,
               },
            }, */
         },
      });

      res.json(cajaLote);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};
