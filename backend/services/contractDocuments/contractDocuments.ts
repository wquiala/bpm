import { Usuario } from '@prisma/client';
import { ContractDocumentStatusesEnum } from '../../constants/ContractDocumentStatusesEnum';
import { prismaClient } from '../../server';
import { handlePreLoadConciliation } from '../contracts/contractService';
import moment from 'moment';
import { findTipoConciliacion } from '../tipoConciliacion/tipoConciliacion';
import { TiposConciliacion } from '../../constants/TiposConciliacion';

export const createDocuments = async (
   createdContract: any,
   systemUser: Usuario,
   status: string,
   forPrecon: boolean,
) => {
   const listDocuments: any[] = [];
   for (const productoTipoOperacion of createdContract.Producto.ProductoTipoOperacion) {
      for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
         const fechaOperacion = createdContract.FechaOperacion;
         const fechaBaja = productoDocumento.FechaBaja;

         if (productoDocumento.FechaBaja != null && moment(fechaOperacion).isSameOrAfter(moment(fechaBaja), 'day')) {
            continue;
         } else {
            const documents = await prismaClient.documentoContrato.create({
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
               },
            });

            const { ContratoId, ...dataD } = documents;

            await createContractDocumentHistory(dataD);
            listDocuments.push(documents);
         }
      }
   }

   await updateDNiState(createdContract, listDocuments);

   const tipoConciliacion = await findTipoConciliacion(TiposConciliacion.carga_previa);
   if (!forPrecon) {
      await prismaClient.documentoContrato.updateMany({
         where: {
            ContratoId: createdContract.ContratoId,
         },
         data: {
            TipoConciliacionId: tipoConciliacion!.tipoConciliacionId,
            EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
            FechaConciliacion: new Date(),
         },
      });

      const updated = await prismaClient.documentoContrato.findMany({
         where: {
            ContratoId: createdContract.ContratoId,
         },
         include: {
            TipoConciliacion: true,
         },
      });

      for (const updt of updated) {
         /* const exist = await findContractDocumentHistory({
            DocId: updt.DocId,
            DocumentoId: updt.DocumentoId,
            EstadoDoc: updt.EstadoDoc,
         });

         if (!exist) { */
         const { ContratoId, TipoConciliacion, ...dataD } = updt;

         const toSend = {
            ...dataD,
            TipoConciliacion: tipoConciliacion?.nombre,
         };

         await createContractDocumentHistory(toSend);
         //}
      }

      await handlePreLoadConciliation(createdContract);
   } else if (forPrecon) {
      const documentosPrecon = await prismaClient.productoDocumento.findMany({
         where: {
            ProductoId: createdContract.ProductoId,
            Fase: 'PRECON', // Asegúrate de que esto coincida con la fase utilizada en la base de datos
         },
         select: {
            DocumentoId: true,
            ProductoDocId: true,
         },
      });

      const preconIds = documentosPrecon.map((doc) => doc.DocumentoId);
      const preconIdsPD = documentosPrecon.map((id) => id.ProductoDocId);

      await prismaClient.documentoContrato.updateMany({
         where: {
            ContratoId: createdContract.ContratoId,
            DocId: { in: preconIds },
            ProdctoDoc: { in: preconIdsPD },
         },
         data: {
            EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
            FechaConciliacion: new Date(),
            TipoConciliacionId: tipoConciliacion?.tipoConciliacionId,
         },
      });

      const updated = await prismaClient.documentoContrato.findMany({
         where: {
            ContratoId: createdContract.ContratoId,
            DocId: { in: preconIds },
            ProdctoDoc: { in: preconIdsPD },
         },
         include: {
            TipoConciliacion: true,
         },
      });

      for (const updt of updated) {
         const { ContratoId, TipoConciliacion, ...dataD } = updt;
         const toSend = {
            ...dataD,
            TipoConciliacion: tipoConciliacion?.nombre,
         };

         await createContractDocumentHistory(toSend);
         //}
      }
   }
};

export const createContractDocumentHistory = async (data: any) => {
   return await prismaClient.documentoContratoHistory.create({
      data: {
         ...data,
      },
   });
};

export const updateDNiState = async (contract: any, documents: any[]) => {
   if (contract.FechaValidezDNITomador) {
      const dni = await prismaClient.maestroDocumentos.findFirst({
         where: {
            Codigo: 'DNI',
         },
      });

      const tipoConciliacion = await findTipoConciliacion(TiposConciliacion.carga_previa);
      if (dni) {
         const conDNI = documents.find((d: any) => d.DocId == dni.DocumentoId);

         if (conDNI) {
            const conDNIUpdated = await prismaClient.documentoContrato.update({
               where: {
                  DocumentoId: conDNI.DocumentoId,
               },
               data: {
                  EstadoDoc: ContractDocumentStatusesEnum.CORRECT,
                  FechaConciliacion: new Date(),
                  TipoConciliacionId: tipoConciliacion?.tipoConciliacionId,
               },
            });

            /*  const exist = await findContractDocumentHistory({
               DocumentoId: conDNIUpdated.DocumentoId,
               DocId: conDNIUpdated.DocId,
               EstadoDoc: conDNIUpdated.EstadoDoc,
            });
            if (!exist) { */
            const { ContratoId, ...dataD } = conDNIUpdated;

            await createContractDocumentHistory(dataD);
            //}
         }
      }
   }
};
