import moment from 'moment';
import { NotFoundException } from '../../exceptions/not-found';
import { ErrorCode } from '../../exceptions/root';
import { prismaClient } from '../../server';
import { createContractDocumentHistory } from '../contractDocuments/contractDocuments';
import { findIncidenceHistory } from '../../helpers/incidenceDocumentHistory';
import { createIncidenceDocumentHistory } from '../../controllers/incidenceDocument';

export const getDocumentContractById = async (id: number) => {
   try {
      const documentContract = await prismaClient.documentoContrato.findFirstOrThrow({
         where: {
            DocumentoId: id,
         },
      });

      return documentContract;
   } catch (error) {
      throw new NotFoundException('No se encuentra este documento', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};

export const updateDocumentContractByContract = async (
   contract: any,
   estado: string,
   systemUser: any,
   conciliationType: any,
   fechaEstado: any,
) => {
   for (const documentoContrato of contract.DocumentoContrato) {
      for (const documentIncidence of documentoContrato.IncidenciaDocumento) {
         const update = await prismaClient.incidenciaDocumento.update({
            where: {
               IncidenciaDocId: documentIncidence.IncidenciaDocId,
            },
            data: {
               Resuelta: true,
               Usuario: {
                  connect: {
                     UsuarioId: systemUser?.UsuarioId,
                  },
               },
            },
         });

         const exist = await findIncidenceHistory({
            IncidenciaDocId: update.IncidenciaDocId,
            Resultado: update.Resuelta!,
         });

         if (!exist) {
            const { DocumentoContratoId, TipoIncidenciaDocumentoId, ...data } = update;
            await createIncidenceDocumentHistory(data);
         }
      }
      const document = await prismaClient.documentoContrato.update({
         where: {
            DocumentoId: documentoContrato.DocumentoId,
         },
         data: {
            EstadoDoc: estado,

            FechaConciliacion: new Date(),
            Usuario: {
               connect: {
                  UsuarioId: systemUser?.UsuarioId,
               },
            },

            TipoConciliacion: {
               connect: { tipoConciliacionId: conciliationType.tipoConciliacionId },
            },
            FechaEstado: moment(fechaEstado, 'DD/MM/YYYY HH:mm:ss').toDate() ?? new Date(),
         },
      });

      const { ContratoId, ...dataD } = document;
      const toSend = {
         ...dataD,
         TipoConciliacion: conciliationType.nombre,
      };
      /*  */

      await createContractDocumentHistory(toSend);
   }
};
