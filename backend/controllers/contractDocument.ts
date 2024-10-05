import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { InternalException } from '../exceptions/internal-exception';
import { createContratoDocumentoSchema, updateContratoDocumentoSchema } from '../schema/contractDocument';
import { ContractDocumentStatusesEnum } from '../constants/ContractDocumentStatusesEnum';
import { ContractHistoryData, OPERACION_CONTRATO } from '../interfaces/contractsInterfaces';
import { createIncidenceDocumentHistory } from './incidenceDocument';
import { createContractHistory, updateContractService } from '../services/contracts/contractService';
import { createContractDocumentHistory } from '../services/contractDocuments/contractDocuments';
import { findIncidenceHistory } from '../helpers/incidenceDocumentHistory';

export const getContractDocuments = async (req: Request, res: Response) => {
   const { contratoId } = req.query;

   if (contratoId) {
      try {
         await prismaClient.contrato.findFirstOrThrow({
            where: {
               ContratoId: parseInt(contratoId as string),
            },
         });
      } catch (error) {
         throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
      }
   }

   const contracts = await prismaClient.documentoContrato.findMany({
      where: {
         ...(contratoId
            ? {
                 ContratoId: parseInt(contratoId as string),
              }
            : {}),
      },
      include: {
         MaestroDocumentos: {
            include: {
               TipoDocumentoIncidencia: true,
               FamiliaDocumento: true,
            },
         },
         TipoConciliacion: true,
      },
   });

   res.json(contracts);
};

export const createContractDocument = async (req: Request, res: Response) => {
   const validatedData = createContratoDocumentoSchema.parse(req.body);

   try {
      await prismaClient.contrato.findFirstOrThrow({
         where: {
            ContratoId: validatedData.ContratoId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      const createdContractDocument = await prismaClient.documentoContrato.create({
         data: {
            Usuario: {
               connect: {
                  //@ts-ignore
                  UsuarioId: parseInt(req.user.UsuarioId),
               },
            },
            Contrato: {
               connect: {
                  ContratoId: validatedData.ContratoId,
               },
            },
            MaestroDocumentos: {
               connect: {
                  DocumentoId: validatedData.DocId,
               },
            },

            EstadoDoc: ContractDocumentStatusesEnum.PENDING,
            ProductoDocumento: {
               connect: {
                  ProductoDocId: validatedData.ProductoId,
               },
            },
         },
      });

      const { ContratoId, ...dataD } = createdContractDocument;

      await createContractDocumentHistory(dataD);

      const updated = await prismaClient.contrato.update({
         where: {
            ContratoId: validatedData.ContratoId,
         },
         data: {
            updatedAt: new Date(),
         },
      });

      const {
         Activo,

         TipoOperacion,
         updatedAt,
         TipoConciliacionId,
         UsuarioId,
         ...data
      } = updated;
      const dataH: ContractHistoryData = data;

      await createContractHistory(dataH, OPERACION_CONTRATO.ACTUALIZADO);

      res.json(createdContractDocument);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

export const updateContractDocument = async (req: Request, res: Response) => {
   //Validations

   console.log('Vamos a actualizar');

   try {
      await prismaClient.documentoContrato.findFirstOrThrow({
         where: {
            DocumentoId: parseInt(req.params.id),
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract document not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   const validatedData = updateContratoDocumentoSchema.parse(req.body);

   //Validations
   try {
      await prismaClient.contrato.findFirstOrThrow({
         where: {
            ContratoId: validatedData.ContratoId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   let cajaLote;

   try {
      cajaLote = await prismaClient.cajaLote.findFirstOrThrow({
         where: {
            CajaLoteId: validatedData.CajaLote,
         },
      });
   } catch (error) {
      throw new NotFoundException('Caja Lote not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
   const id = req.params.id;
   //Update contract document
   let conciliacion;
   try {
      conciliacion = await prismaClient.tipoConciliacion.findFirst({
         where: {
            nombre: 'MANUAL',
         },
      });

      const updatedContractDocument = await prismaClient.documentoContrato.update({
         where: {
            DocumentoId: Number(id),
         },
         data: {
            TipoConciliacion: {
               connect: {
                  tipoConciliacionId: conciliacion?.tipoConciliacionId,
               },
            },
            Usuario: {
               connect: {
                  //@ts-ignore
                  UsuarioId: parseInt(req.user.UsuarioId),
               },
            },
            CajaLote: {
               connect: {
                  CajaLoteId: cajaLote.CajaLoteId,
               },
            },
            /* Contrato: {
               connect: {
                  ContratoId: validatedData.ContratoId!,
               },
            }, */

            ...(validatedData.EstadoDoc
               ? {
                    EstadoDoc: validatedData.EstadoDoc,
                 }
               : {}),

            FechaConciliacion: new Date(),
            updatedAt: new Date(),
         },
         include: {
            MaestroDocumentos: { include: { FamiliaDocumento: true } },
            IncidenciaDocumento: true,
         },
      });

      /*   const exist = await findContractDocumentHistory({
         DocId: updatedContractDocument.DocId,
         DocumentoId: updatedContractDocument.DocumentoId,
         EstadoDoc: updatedContractDocument.EstadoDoc,
      });

      if (!exist) { */
      const { ContratoId, MaestroDocumentos, IncidenciaDocumento, ...dataD } = updatedContractDocument;
      //Metemos la caja, la conciliacion y el lote
      const toSend = {
         ...dataD,
         TipoConciliacion: conciliacion?.nombre,
         Caja: cajaLote.Caja,
         Lote: cajaLote.Lote,
      };
      await createContractDocumentHistory(toSend);
      //}

      //Check if the documentContract is correct
      const hasActiveIncidences = await prismaClient.incidenciaDocumento.findFirst({
         where: {
            DocumentoContratoId: updatedContractDocument.DocumentoId,
            Resuelta: false,
         },
      });

      if (hasActiveIncidences && validatedData.EstadoDoc == ContractDocumentStatusesEnum.PRESENT_CORRECT) {
         await prismaClient.incidenciaDocumento.updateMany({
            where: {
               DocumentoContratoId: updatedContractDocument.DocumentoId,
            },
            data: {
               Resuelta: true,
            },
         });

         const updatedInci = await prismaClient.incidenciaDocumento.findMany({
            where: {
               DocumentoContratoId: updatedContractDocument.DocumentoId,
            },
         });

         for (const inci of updatedInci) {
            const exist = await findIncidenceHistory({
               IncidenciaDocId: inci.IncidenciaDocId,
               Resultado: inci.Resuelta!,
            });

            if (!exist) {
               const { DocumentoContratoId, TipoIncidenciaDocumentoId, ...data } = inci;
               await createIncidenceDocumentHistory(data);
            }
         }
      }

      const checkDocuments = await prismaClient.documentoContrato.findMany({
         where: {
            ContratoId: updatedContractDocument.ContratoId,
         },
      });

      const correctsOrEmail = checkDocuments.filter(
         (doc: any) =>
            doc.EstadoDoc == ContractDocumentStatusesEnum.PRESENT_CORRECT ||
            doc.EstadoDoc == ContractDocumentStatusesEnum.POR_EMAIL,
      );

      if (correctsOrEmail.length == checkDocuments.length) {
         const dataToSend = {
            EstadoContrato: 'TRAMITADA',
            FechaGrabacion: new Date(),
         };
         await updateContractService(updatedContractDocument.ContratoId, dataToSend);
      }

      res.json(updatedContractDocument);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

export const getContractDocumentById = async (req: Request, res: Response) => {
   try {
      const contractDocument = await prismaClient.documentoContrato.findFirstOrThrow({
         where: {
            DocumentoId: parseInt(req.params.id),
         },
         include: {
            MaestroDocumentos: {
               include: {
                  TipoDocumentoIncidencia: {
                     include: {
                        MaestroIncidencias: true,
                     },
                  },
                  FamiliaDocumento: true,
               },
            },
            IncidenciaDocumento: true,
            TipoConciliacion: true,
            CajaLote: true,
         },
      });

      res.json(contractDocument);
   } catch (error) {
      throw new NotFoundException('Contract document not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};

export const deleteContractDocument = async (req: Request, res: Response) => {
   try {
      await prismaClient.documentoContrato.findFirstOrThrow({
         where: {
            DocumentoId: parseInt(req.params.id),
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract document not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   await prismaClient.documentoContrato.delete({
      where: {
         DocumentoId: parseInt(req.params.id),
      },
   });

   res.json({ message: 'deleted' });
};
