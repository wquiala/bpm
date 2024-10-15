import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { createRamoSchema, updateRamoSchema } from '../schema/branch';
import { BadRequestsException } from '../exceptions/bad-requests';
import { InternalException } from '../exceptions/internal-exception';
import { getProductoById } from '../services/producto/producto';

export const getBranches = async (req: Request, res: Response) => {
   const branches = await prismaClient.producto.findMany({});

   res.json(branches);
};

export const createBranch = async (req: Request, res: Response) => {
   const validatedData = createRamoSchema.parse(req.body);

   const branch = await prismaClient.producto.findFirst({
      where: {
         Codigo: validatedData.Codigo,
      },
   });

   if (branch) {
      throw new BadRequestsException('Branch code already taken', ErrorCode.BAD_REQUEST_EXCEPTION);
   }

   try {
      await prismaClient.compania.findFirstOrThrow({
         where: {
            CompaniaId: validatedData.CompId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Company not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      const { CompId, ...dataWithoutCompId } = validatedData;
      const createdBranch = await prismaClient.producto.create({
         data: {
            Compania: {
               connect: {
                  CompaniaId: CompId,
               },
            },
            ...(dataWithoutCompId as any),
         },
      });

      res.json(createdBranch);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

export const updateBranch = async (req: Request, res: Response) => {
   try {
      await prismaClient.producto.findFirstOrThrow({
         where: {
            ProductoId: parseInt(req.params.id),
         },
      });
   } catch (error) {
      throw new NotFoundException('Branch not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   const validatedData = updateRamoSchema.parse(req.body);

   if (validatedData.Codigo) {
      const code = await prismaClient.producto.findFirst({
         where: {
            Codigo: validatedData.Codigo,
         },
      });

      if (code && code.ProductoId !== parseInt(req.params.id)) {
         throw new NotFoundException('Code already in use', ErrorCode.BAD_REQUEST_EXCEPTION);
      }
   }

   try {
      await prismaClient.compania.findFirstOrThrow({
         where: {
            CompaniaId: validatedData.CompId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Company not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      const { CompId, ...dataWithoutCompId } = validatedData;
      const updatedMediator = await prismaClient.producto.update({
         where: {
            ProductoId: parseInt(req.params.id),
         },
         data: {
            ...(dataWithoutCompId as any),
            FechaUltimaModif: new Date(),
            Compania: {
               connect: {
                  CompaniaId: validatedData.CompId,
               },
            },
         },
      });

      res.json(updatedMediator);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

export const getBranchById = async (req: Request, res: Response) => {
   const producto = await getProductoById(parseInt(req.params.id));

   res.json(producto);
};

export const getBranchByCode = async (req: Request, res: Response) => {
   try {
      const branch = await prismaClient.producto.findFirstOrThrow({
         where: {
            Codigo: req.params.code,
         },
         include: {
            ProductoTipoOperacion: {
               include: {
                  ProductoDocumento: {
                     include: {
                        MaestroDocumento: {
                           include: {
                              TipoDocumentoIncidencia: true,
                           },
                        },
                     },
                  },
               },
            },
         },
      });

      res.json(branch);
   } catch (error) {
      throw new NotFoundException('Branch not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};

export const deleteBranch = async (req: Request, res: Response) => {
   try {
      await prismaClient.producto.findFirstOrThrow({
         where: {
            ProductoId: parseInt(req.params.id),
         },
      });
   } catch (error) {
      throw new NotFoundException('Branch not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   await prismaClient.producto.delete({
      where: {
         ProductoId: parseInt(req.params.id),
      },
   });

   res.json({ message: 'deleted' });
};
