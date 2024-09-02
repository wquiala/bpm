import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { InternalException } from '../exceptions/internal-exception';
import { createContratoSchema, updateContratoSchema } from '../schema/contract';
import { BadRequestsException } from '../exceptions/bad-requests';

export const getContracts = async (req: Request, res: Response) => {
   const { company, policy, dni, secuencialDni, ccc, code, requestCode, operationType, reconcile } = req.query;
   let requestedCompany = null;
   if (!company && !policy && !dni && !secuencialDni && !ccc && !code && !requestCode && !operationType && !reconcile) {
      throw new BadRequestsException('No filters selected', ErrorCode.BAD_REQUEST_EXCEPTION);
   }
   if (company) {
      try {
         requestedCompany = await prismaClient.compania.findFirstOrThrow({
            where: {
               CompaniaId: parseInt(company as string),
            },
         });
      } catch (error) {
         throw new NotFoundException('Company not found', ErrorCode.NOT_FOUND_EXCEPTION);
      }
   }

   const contracts = await prismaClient.contrato.findMany({
      include: {
         /*             Usuario: true,
          */ Compania: true,
         /*                   TipoConciliacion: true,
          */ Producto: {
            include: {
               ProductoTipoOperacion: {
                  include: {
                     ProductoDocumento: {
                        include: {
                           MaestroDocumento: true,
                        },
                     },
                  },
               },
            },
         },
         Mediador: true,
         DetalleObservacion: {
            include: {
               Usuario: true,
            },
            orderBy: {
               FechaObs: 'desc',
            },
         },
         DocumentoContrato: {
            include: {
               MaestroDocumentos: {
                  include: {
                     MaestroIncidencias: true,
                  },
               },
               IncidenciaDocumento: {
                  include: {
                     MaestroIncidencias: true,
                  },
               },
               ProductoDocumento: true,
            },
         },
      },
      where: {
         ...(requestedCompany && requestedCompany.Codigo === 'UCV' && policy
            ? {
                 CCC: policy as string,
              }
            : {}),
         ...(requestedCompany && requestedCompany.Codigo !== 'UCV' && policy
            ? {
                 OR: [{ CodigoSolicitud: policy as string }, { CodigoPoliza: policy as string }],
              }
            : {}),
         ...(dni
            ? {
                 DNIAsegurado: dni as string,
              }
            : {}),
         ...(secuencialDni
            ? {
                 DNIAsegurado: secuencialDni as string,
              }
            : {}),
         ...(ccc
            ? {
                 CCC: ccc as string,
              }
            : {}),
         ...(code
            ? {
                 CodigoPoliza: code as string,
              }
            : {}),
         ...(requestCode
            ? {
                 CodigoSolicitud: requestCode as string,
              }
            : {}),
         ...(company
            ? {
                 CompaniaId: parseInt(company as string),
              }
            : {}),
         ...(operationType
            ? {
                 TipoConciliacionId: parseInt(operationType as string),
              }
            : {}),
         ...(reconcile
            ? {
                 Conciliar: reconcile == 'true',
              }
            : {}),
      },
   });

   res.json(contracts);
};

export const createContract = async (req: Request, res: Response) => {
   const validatedData = createContratoSchema.parse(req.body);

   try {
      await prismaClient.compania.findFirstOrThrow({
         where: {
            CompaniaId: validatedData.CompaniaId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Company not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      await prismaClient.producto.findFirstOrThrow({
         where: {
            ProductoId: validatedData.ProductoId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Branch not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      await prismaClient.mediador.findFirstOrThrow({
         where: {
            MediadorId: validatedData.MediadorId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Mediator not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      const { CompaniaId, ProductoId, MediadorId, ...dataWithoutConnects } = validatedData;
      const createdContract = await prismaClient.contrato.create({
         data: {
            Usuario: {
               connect: {
                  //@ts-ignore
                  UsuarioId: parseInt(req.user.UsuarioId),
               },
            },
            Compania: {
               connect: {
                  CompaniaId: CompaniaId,
               },
            },
            Producto: {
               connect: {
                  ProductoId: ProductoId,
               },
            },
            CanalMediador: {
               connect: {
                  Mediador: MediadorId,
               },
            },
            ...(dataWithoutConnects as any),
         },
      });

      res.json(createdContract);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

export const updateContract = async (req: Request, res: Response) => {
   let contrato;
   let compania;
   let mediador;
   let producto;
   try {
      contrato = await prismaClient.contrato.findFirstOrThrow({
         where: {
            ContratoId: parseInt(req.params.id),
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   const validatedData = updateContratoSchema.parse(req.body);
   console.log(validatedData);
   try {
      compania = await prismaClient.compania.findFirstOrThrow({
         where: {
            CompaniaId: validatedData.CompaniaId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Company not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      producto = await prismaClient.producto.findFirstOrThrow({
         where: {
            ProductoId: validatedData.ProductoId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Product not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      mediador = await prismaClient.mediador.findFirstOrThrow({
         where: {
            MediadorId: validatedData.MediadorId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Mediator not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      /*       const { CompaniaId, ProductoId, MediadorId, ...dataWithoutConnects } = validatedData;
       */ const updatedContract = await prismaClient.contrato.update({
         where: {
            ContratoId: parseInt(req.params.id),
         },
         data: {
            /*  ...(dataWithoutConnects as any), */
            /*  Usuario: {
               connect: {
                  //@ts-ignore
                  UsuarioId: parseInt(req.user.UsuarioId),
               },
            }, */
            /*   Compania: {
               connect: {
                  CompaniaId: ,
               },
            },
            Producto: {
               connect: {
                  ProductoId: ,
               },
            },
            Mediador: {
               connect: {
                  MediadorId: ,
               },
            }, */
            ...(validatedData as any),
         },
      });

      res.json(updatedContract);
   } catch (error) {
      console.log(error, 'ERROR');
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

export const getContractById = async (req: Request, res: Response) => {
   try {
      const contract = await prismaClient.contrato.findFirstOrThrow({
         where: {
            ContratoId: parseInt(req.params.id),
         },
      });

      res.json(contract);
   } catch (error) {
      throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};

export const deleteContract = async (req: Request, res: Response) => {
   try {
      await prismaClient.contrato.findFirstOrThrow({
         where: {
            ContratoId: parseInt(req.params.id),
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   await prismaClient.contrato.delete({
      where: {
         ContratoId: parseInt(req.params.id),
      },
   });

   res.json({ message: 'deleted' });
};
