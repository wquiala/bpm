import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { InternalException } from '../exceptions/internal-exception';
import { createContratoSchema, updateContratoSchema } from '../schema/contract';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ContractDocumentStatusesEnum } from '../constants/ContractDocumentStatusesEnum';
import { ESTADO_CONTRATO, Usuario } from '@prisma/client';
import { ContractHistoryData, OPERACION_CONTRATO } from '../interfaces/contractsInterfaces';
import { processPolicyData } from '../services/carga/policy/policyProcessor';
import { createContractHistory, getContracById, updateContractService } from '../services/contracts/contractService';
import { createContractDocumentHistory } from '../services/contractDocuments/contractDocuments';
import { getCompanyByIdService } from '../services/company/company';
import { getMediatorByIdService } from '../services/mediador/mediador';

export const getContracts = async (req: Request, res: Response) => {
   const { company, policy, dni, secuencialDni, ccc, code, requestCode, operationType, reconcile } = req.query;
   let requestedCompany = null;
   if (!company && !policy && !dni && !secuencialDni && !ccc && !code && !requestCode && !operationType && !reconcile) {
      throw new BadRequestsException('No hay filtro seleccionado', ErrorCode.BAD_REQUEST_EXCEPTION);
   }
   if (company) {
      requestedCompany = await getCompanyByIdService(parseInt(company as string));
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
         TipoConciliacion: true,
         DocumentoContrato: {
            include: {
               MaestroDocumentos: {
                  include: {
                     TipoDocumentoIncidencia: { include: { MaestroDocumentos: true, MaestroIncidencias: true } },
                     FamiliaDocumento: true,
                  },
               },
               TipoConciliacion: true,
               CajaLote: true,
               DocumentoContratoHistory: true,

               IncidenciaDocumento: {
                  include: {
                     TipoDocumentoIncidencia: {
                        include: {
                           MaestroDocumentos: true,
                           MaestroIncidencias: true,
                        },
                     },
                     IncidenciaDocumentoHistory: true,
                  },
               },
               ProductoDocumento: true,
            },
         },
         Usuario: true,
         CajaLote: true,
         Comunicacion: true,
         HistorialContrato: true,
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
                 OR: [{ DNIAsegurado: dni as string }, { DNITomador: dni as string }],
              }
            : {}),
         ...(secuencialDni
            ? {
                 OR: [{ DNIAsegurado: secuencialDni as string }, { DNITomador: secuencialDni as string }],
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
   let company;

   const contract = await prismaClient.contrato.findFirst({
      where: {
         OR: [
            { CodigoPoliza: validatedData.CodigoPoliza },
            { CodigoSolicitud: validatedData.CodigoSolicitud },
            {
               ClaveOperacion: validatedData.ClaveOperacion,
            },
         ],
      },
   });
   if (contract) {
      throw new BadRequestsException('Este contrato ya está registrado en el sistema', ErrorCode.BAD_REQUEST_EXCEPTION);
   }
   try {
      company = await prismaClient.compania.findFirstOrThrow({
         where: {
            Nombre: validatedData.CompaniaNombre,
         },
      });
   } catch (error) {
      throw new NotFoundException('Compañia no encontrada', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   let producto;

   try {
      producto = await prismaClient.producto.findFirstOrThrow({
         where: {
            Codigo: validatedData.ProductoCodigo,
         },
      });
   } catch (error) {
      throw new NotFoundException('Producto no encontrado', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   let mediador;
   try {
      mediador = await prismaClient.mediador.findFirstOrThrow({
         where: {
            Codigo: validatedData.MediadorCodigo,
         },
      });
   } catch (error) {
      throw new NotFoundException('Mediador no encontrado', ErrorCode.NOT_FOUND_EXCEPTION);
   }
   let user;
   try {
      user = await prismaClient.usuario.findFirstOrThrow({
         where: {
            //@ts-ignore

            UsuarioId: parseInt(req.user.UsuarioId),
         },
      });
   } catch (error) {
      throw new NotFoundException('User not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      const { CompaniaNombre, ProductoCodigo, MediadorCodigo, ...dataWithoutConnects } = validatedData;
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
                  CompaniaId: company.CompaniaId,
               },
            },
            Producto: {
               connect: {
                  ProductoId: producto.ProductoId,
               },
            },
            Mediador: {
               connect: {
                  MediadorId: mediador.MediadorId,
               },
            },
            ...(dataWithoutConnects as any),
         },
         include: {
            Producto: {
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
            DocumentoContrato: {
               include: {
                  MaestroDocumentos: {
                     include: {
                        TipoDocumentoIncidencia: { include: { MaestroDocumentos: true, MaestroIncidencias: true } },
                     },
                  },
                  TipoConciliacion: true,
                  CajaLote: true,
               },
            },
            Comunicacion: true,
            HistorialContrato: true,
         },
      });

      const {
         Activo,

         TipoOperacion,
         updatedAt,
         TipoConciliacionId,
         UsuarioId,
         Producto,
         DocumentoContrato,
         Comunicacion,
         HistorialContrato,
         ...data
      } = createdContract;
      const dataH: ContractHistoryData = data;

      await createContractHistory(dataH, OPERACION_CONTRATO.INSERTADO, ESTADO_CONTRATO.PENDIENTE);

      //Creamos los d(ocumentos asociados al contrato como pendientes
      await createDocuments(createdContract, user);

      const fullContract = await prismaClient.contrato.findFirst({
         where: {
            ContratoId: createdContract.ContratoId,
         },
         include: {
            DocumentoContrato: {
               include: {
                  MaestroDocumentos: true,
               },
            },
         },
      });
      res.json(fullContract);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

const createDocuments = async (createdContract: any, systemUser: Usuario) => {
   for (const productoTipoOperacion of createdContract.Producto.ProductoTipoOperacion) {
      for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
         const doc = await prismaClient.documentoContrato.create({
            data: {
               Contrato: {
                  connect: {
                     ContratoId: createdContract.ContratoId,
                  },
               },
               MaestroDocumentos: {
                  connect: {
                     DocumentoId: productoDocumento.MaestroDocumento.DocumentoId,
                  },
               },
               Usuario: {
                  connect: {
                     UsuarioId: systemUser?.UsuarioId,
                  },
               },
               EstadoDoc: ContractDocumentStatusesEnum.PENDING,
               ProductoDocumento: {
                  connect: {
                     ProductoDocId: productoDocumento.ProductoDocId,
                  },
               },
               FechaEstado: new Date(),
            },
         });
         const { ContratoId, ...dataD } = doc;

         const toSend = {
            ...dataD,
         };

         await createContractDocumentHistory(toSend);
      }
   }
};

export const updateContract = async (req: Request, res: Response) => {
   const validatedData = updateContratoSchema.parse(req.body);

   await getContracById(parseInt(req.params.id));

   await getCompanyByIdService(validatedData.CompaniaId);

   await getMediatorByIdService(validatedData.MediadorId);

   const updatedContract = await updateContractService(parseInt(req.params.id), validatedData);

   const {
      Activo,

      TipoOperacion,
      updatedAt,
      TipoConciliacionId,
      UsuarioId,

      ...data
   } = updatedContract;
   const dataH: ContractHistoryData = data;

   await createContractHistory(dataH, OPERACION_CONTRATO.ACTUALIZADO);

   res.json(updatedContract);
};

export const getContractById = async (req: Request, res: Response) => {
   try {
      const contract = await prismaClient.contrato.findFirstOrThrow({
         where: {
            ContratoId: parseInt(req.params.id),
         },
         include: {
            Producto: true,
            Usuario: true,
            Compania: true,
            TipoConciliacion: true,
            DocumentoContrato: {
               include: {
                  IncidenciaDocumento: {
                     include: {
                        TipoDocumentoIncidencia: { include: { MaestroDocumentos: true, MaestroIncidencias: true } },
                     },
                  },
               },
            },
            Comunicacion: true,
            HistorialContrato: true,
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

export const reprocesar = async (req: Request, res: Response) => {
   //@ts-ignore
   const insertRows = await processPolicyData(req.body, req.user);
   res.json(insertRows);
};

export const Incompletos = async (req: Request, res: Response) => {
   const incompletos = await prismaClient.incompletas.findMany({
      where: {
         Insertada: false,
      },
   });

   res.json(incompletos);
};

export const deleteIncompletoById = async (req: Request, res: Response) => {
   //@ts-ignore

   const id = req.params.id;
   const incompleta = await prismaClient.incompletas.findFirst({
      where: {
         incompletaId: parseInt(id),
      },
   });

   if (!incompleta) throw new NotFoundException('Contrato no encontrado', ErrorCode.NOT_FOUND_EXCEPTION);

   const del = await prismaClient.incompletas.delete({
      where: { incompletaId: incompleta.incompletaId },
   });

   res.json(del);
};

export const editIncompleto = async (req: Request, res: Response) => {
   const id = parseInt(req.params.id);

   const data = req.body;

   const incompleta = await prismaClient.incompletas.update({
      where: { incompletaId: id },
      data: {
         ...data,
      },
   });

   res.json(incompleta);
};
