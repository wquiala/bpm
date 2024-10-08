import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { InternalException } from '../exceptions/internal-exception';
import { createIncidenciaDocumentoSchema, updateIncidenciaDocumentoSchema } from '../schema/incidenceDocument';
import { ContractDocumentStatusesEnum } from '../constants/ContractDocumentStatusesEnum';
import { ContractHistoryData, OPERACION_CONTRATO } from '../interfaces/contractsInterfaces';
import { createContractDocumentHistory } from '../services/contractDocuments/contractDocuments';
import { createContractHistory } from '../services/contracts/contractService';
import { findIncidenceHistory } from '../helpers/incidenceDocumentHistory';
import { findContractDocumentHistory } from '../helpers/documentContract';

/* export const getincidencesDocumentsByCompanyDate = async (req: Request, res: Response) => {
   const { companyId, date } = req.query;

   try {
      const incidencesDocuments = await prismaClient.incidenciaDocumento.findMany({
         where: {},
      });
   } catch (error) {}
};
 */
export const getIncidenceDocuments = async (req: Request, res: Response) => {
   const { documentId } = req.query;

   if (documentId) {
      try {
         await prismaClient.documentoContrato.findFirstOrThrow({
            where: {
               DocumentoId: parseInt(documentId as string),
            },
         });
      } catch (error) {
         throw new NotFoundException('Document not found', ErrorCode.NOT_FOUND_EXCEPTION);
      }
   }

   const incidenceDocuments = await prismaClient.incidenciaDocumento.findMany({
      where: {
         ...(documentId
            ? {
                 DocumentoContratoId: parseInt(documentId as string),
              }
            : {}),
      },
      include: {
         DocumentoContrato: {
            include: {
               Contrato: {
                  include: {
                     Mediador: true,
                  },
               },
               MaestroDocumentos: true,
            },
         },
         TipoDocumentoIncidencia: {
            include: { MaestroDocumentos: true, MaestroIncidencias: true },
         },
      },
   });

   res.json(incidenceDocuments);
};

export const createIncidenceDocument = async (req: Request, res: Response) => {
   const validatedData = createIncidenciaDocumentoSchema.parse(req.body);
   console.log(validatedData);
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
      await prismaClient.documentoContrato.findFirstOrThrow({
         where: {
            DocumentoId: validatedData.DocumentoContratoId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract document not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   try {
      const createdIncidenceDocument = await prismaClient.incidenciaDocumento.create({
         data: {
            Usuario: {
               connect: {
                  //@ts-ignore
                  UsuarioId: parseInt(req.user.UsuarioId),
               },
            },
            TipoDocumentoIncidencia: {
               connect: {
                  TipoDocumentoIncidenciaId: validatedData.Incidencia,
               },
            },

            DocumentoContrato: {
               connect: {
                  DocumentoId: validatedData.DocumentoContratoId,
               },
            },

            ...(validatedData.Resuelta !== null && validatedData.Resuelta !== undefined
               ? {
                    Resuelta: validatedData.Resuelta,
                 }
               : {}),
            Nota: validatedData.Nota,

            /*   ...(validatedData.NumReclamaciones
                  ? {
                       NumReclamaciones: validatedData.NumReclamaciones,
                    }
                  : {}), */
         },
      });

      const { DocumentoContratoId, TipoIncidenciaDocumentoId, ...data } = createdIncidenceDocument;
      await createIncidenceDocumentHistory(data);

      const docContraUpdated = await prismaClient.documentoContrato.update({
         where: {
            DocumentoId: validatedData.DocumentoContratoId,
         },
         data: {
            EstadoDoc: ContractDocumentStatusesEnum.PRESENT_INCIDENCE,
         },
      });

      const exist = await findContractDocumentHistory({
         DocumentoId: docContraUpdated.DocumentoId,
         DocId: docContraUpdated.DocId,
         EstadoDoc: docContraUpdated.EstadoDoc,
      });

      if (!exist) {
         console.log('lo metemos');
         const { ContratoId, ...dataD } = docContraUpdated;

         await createContractDocumentHistory(dataD);
      }

      res.json(createdIncidenceDocument);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

export const updateIncidenceDocument = async (req: Request, res: Response) => {
   let incidence;
   // Validations
   try {
      incidence = await prismaClient.incidenciaDocumento.findFirstOrThrow({
         where: {
            IncidenciaDocId: parseInt(req.params.id),
         },
      });
   } catch (error) {
      throw new NotFoundException('Incidence document not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   const validatedData = updateIncidenciaDocumentoSchema.parse(req.body);

   // Validations
   try {
      await prismaClient.contrato.findFirstOrThrow({
         where: {
            ContratoId: validatedData.ContratoId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   // Validations
   try {
      await prismaClient.documentoContrato.findFirstOrThrow({
         where: {
            DocumentoId: validatedData.DocumentoId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Contract document not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   // Validati
   /*  try {
      await prismaClient.tipoDocumentoIncidencia.findFirstOrThrow({
         where: {
            TipoDocumentoIncidenciaId: validatedData.TipoDocumentoincidenciaId,
         },
      });
   } catch (error) {
      throw new NotFoundException('Incidence not found', ErrorCode.NOT_FOUND_EXCEPTION);
   } */

   //Update incidence document
   try {
      const updatedIncidenceDocument = await prismaClient.incidenciaDocumento.update({
         where: {
            IncidenciaDocId: parseInt(req.params.id),
         },
         data: {
            Usuario: {
               connect: {
                  //@ts-ignore
                  UsuarioId: parseInt(req.user.UsuarioId),
               },
            },
            /*  DocumentoContrato: {
               connect: {
                  DocumentoId: validatedData.DocumentoId,
               },
            }, */

            ...(validatedData.Resuelta !== null && validatedData.Resuelta !== undefined
               ? {
                    Resuelta: validatedData.Resuelta,
                 }
               : {}),
            Nota: validatedData.Nota ? validatedData.Nota : incidence.Nota,
            Revisada: validatedData.Revisada,
            Enviar: validatedData.Enviar,
            Reclamada: validatedData.Reclamada,

            /*  ...(validatedData.NumReclamaciones
               ? {
                    NumReclamaciones: validatedData.NumReclamaciones,
                 }
               : {}), */
         },
      });

      const exist = await findIncidenceHistory({
         IncidenciaDocId: updatedIncidenceDocument.IncidenciaDocId,
         Resultado: updatedIncidenceDocument.Resuelta!,
      });

      if (!exist) {
         const { DocumentoContratoId, TipoIncidenciaDocumentoId, ...data } = updatedIncidenceDocument;
         await createIncidenceDocumentHistory(data);
      }
      //Update document contract

      const inci = await prismaClient.incidenciaDocumento.findMany({
         where: {
            DocumentoContratoId: validatedData.DocumentoId,
            Resuelta: false,
         },
      });

      if (inci.length == 0) {
         const docContraUpdated = await prismaClient.documentoContrato.update({
            where: {
               DocumentoId: validatedData.DocumentoId,
            },
            data: {
               EstadoDoc: ContractDocumentStatusesEnum.PRESENT_CORRECT,
            },
         });

         /*  const exist = await findContractDocumentHistory({
            DocId: docContraUpdated.DocId,
            DocumentoId: docContraUpdated.DocumentoId,
            EstadoDoc: docContraUpdated.EstadoDoc,
         });

         if (!exist) { */
         const { ContratoId, ...dataD } = docContraUpdated;

         await createContractDocumentHistory(dataD);
      }
      //}
      const docContractIDs = await prismaClient.documentoContrato.findMany({
         where: {
            ContratoId: validatedData.ContratoId,
         },
         include: {
            IncidenciaDocumento: true,
         },
      });

      const ids = docContractIDs.map((doc) => doc.DocumentoId);

      /*       const v = id.includes();
       */
      let cantidad = 0;
      for (const id of ids) {
         const cant = inci.map((inc) => inc.DocumentoContratoId == id && inc.Resuelta);
         if (cant.length > 0) {
            cantidad++;
         }
      }

      const corrects = docContractIDs.map(
         (doc) =>
            doc.EstadoDoc == ContractDocumentStatusesEnum.CORRECT ||
            doc.EstadoDoc == ContractDocumentStatusesEnum.PRESENT_CORRECT,
      );

      if (cantidad == 0 && corrects.length == docContractIDs.length) {
         const contract = await prismaClient.contrato.findFirstOrThrow({
            where: {
               ContratoId: validatedData.ContratoId,
            },
         });

         if (contract) {
            const updated = await prismaClient.contrato.update({
               where: {
                  ContratoId: contract.ContratoId,
               },
               data: {
                  EstadoContrato: 'TRAMITADA',
                  updatedAt: new Date(),
                  TipoConciliacionId: 13,
                  FechaGrabacion: new Date(),
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
         }
      }

      res.json(updatedIncidenceDocument);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

export const getIncidenceDocumentById = async (req: Request, res: Response) => {
   try {
      const incidenceDocument = await prismaClient.incidenciaDocumento.findFirstOrThrow({
         where: {
            IncidenciaDocId: parseInt(req.params.id),
         },
      });

      res.json(incidenceDocument);
   } catch (error) {
      throw new NotFoundException('Incidence document not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};

export const deleteIncidenceDocument = async (req: Request, res: Response) => {
   try {
      await prismaClient.incidenciaDocumento.findFirstOrThrow({
         where: {
            IncidenciaDocId: parseInt(req.params.id),
         },
      });
   } catch (error) {
      throw new NotFoundException('Incidence document not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   await prismaClient.incidenciaDocumento.delete({
      where: {
         IncidenciaDocId: parseInt(req.params.id),
      },
   });

   res.json({ message: 'deleted' });
};

export const createIncidenceDocumentHistory = async (data: any) => {
   return await prismaClient.incidenciaDocumentoHistory.create({
      data: {
         ...data,
      },
   });
};
