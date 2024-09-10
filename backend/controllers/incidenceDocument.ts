import { Request, Response } from 'express';
import { prismaClient } from '../server';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { InternalException } from '../exceptions/internal-exception';
import { createIncidenciaDocumentoSchema, updateIncidenciaDocumentoSchema } from '../schema/incidenceDocument';
import { ContractDocumentStatusesEnum } from '../constants/ContractDocumentStatusesEnum';

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
         MaestroIncidencias: true,
      },
   });

   res.json(incidenceDocuments);
};

export const createIncidenceDocument = async (req: Request, res: Response) => {
   const validatedData = createIncidenciaDocumentoSchema.parse(req.body);
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
      await prismaClient.maestroIncidencias.findFirstOrThrow({
         where: {
            IncidenciaId: validatedData.Incidencia,
         },
      });
   } catch (error) {
      throw new NotFoundException('Incidence not found', ErrorCode.NOT_FOUND_EXCEPTION);
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
            MaestroIncidencias: {
               connect: {
                  IncidenciaId: validatedData.Incidencia,
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

      await prismaClient.documentoContrato.update({
         where: {
            DocumentoId: validatedData.DocumentoContratoId,
         },
         data: {
            EstadoDoc: ContractDocumentStatusesEnum.PRESENT_INCIDENCE,
         },
      });
      /*   await prismaClient.contrato.update({
         where: {
            ContratoId: validatedData.ContratoId,
         },
         data: {
            updatedAt: new Date(),
         },
      });
 */
      res.json(createdIncidenceDocument);
   } catch (error) {
      throw new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
   }
};

export const updateIncidenceDocument = async (req: Request, res: Response) => {
   let inci = {};
   // Validations
   try {
      inci = await prismaClient.incidenciaDocumento.findFirstOrThrow({
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

   // Validations
   try {
      await prismaClient.maestroIncidencias.findFirstOrThrow({
         where: {
            IncidenciaId: validatedData.Incidencia,
         },
      });
   } catch (error) {
      throw new NotFoundException('Incidence not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

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
            DocumentoContrato: {
               connect: {
                  DocumentoId: validatedData.DocumentoId,
               },
            },

            ...(validatedData.Resuelta !== null && validatedData.Resuelta !== undefined
               ? {
                    Resuelta: validatedData.Resuelta,
                 }
               : {}),
            Nota: validatedData.Nota ? validatedData.Nota : '',
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

      //Update document contract

      const inci = await prismaClient.incidenciaDocumento.findMany({
         where: {
            DocumentoContratoId: validatedData.DocumentoId,
            Resuelta: false,
         },
      });

      if (inci.length == 0) {
         await prismaClient.documentoContrato.update({
            where: {
               DocumentoId: validatedData.DocumentoId,
            },
            data: {
               EstadoDoc: ContractDocumentStatusesEnum.PRESENT_CORRECT,
            },
         });
      }
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
         const cant = inci.map((inc) => inc.DocumentoContratoId == id && inc.Resuelta == true);
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
         console.log('Aqui hay que actualizar');
         await prismaClient.contrato.update({
            where: {
               ContratoId: validatedData.ContratoId,
            },
            data: {
               EstadoContrato: 'TRAMITADA',
               updatedAt: new Date(),
               Conciliar: false,
               TipoConciliacionId: 13,
               FechaGrabacion: new Date(),
            },
         });
      }

      //Update contract last modification date
      /*  await prismaClient.contrato.update({
         where: {
            ContratoId: validatedData.ContratoId,
         },
         data: {
            EstadoContrato: inci.length > 0 ? 'SIN_CONCILIAR' : 'TRAMITADA',
            updatedAt: new Date(),
         },
      }); */

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
