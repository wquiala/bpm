/* import { ContractDocumentStatusesEnum } from '../constants/ContractDocumentStatusesEnum';
import { prismaClient } from '../server';

export const checkNoLoadedContracts = async () => {
   const contracts = await prismaClient.contrato.findMany({
      include: {
         Mediador: true,
         DocumentoContrato: {
            include: {
               MaestroDocumentos: true,
               IncidenciaDocumento: {
                  include: {
                     MaestroIncidencias: true,
                  },
               },
            },
         },
      },
   });

   for (const contract of contracts) {
      const createdAt = contract.FechaEfecto ? contract.FechaEfecto : contract.FechaEfecto;

      if (createdAt) {
         const currentDate = new Date();
         const createdDate = new Date(createdAt);

         const diffInTime = currentDate.getTime() - createdDate.getTime();
         const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

         if (diffInDays === 30 && contract.DocumentoContrato.length === 0) {
            await generateIncidences(contract.ContratoId, createdDate);
         }
      }
   }
};

const generateIncidences = async (contractId: number, createdDate: Date) => {
   const systemUser = await prismaClient.usuario.findFirst({
      where: {
         Codigo: '0001',
         Nombre: 'Sistema',
      },
   });

   const contract = await prismaClient.contrato.findFirst({
      where: { ContratoId: contractId },
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
               IncidenciaDocumento: true,
            },
         },
      },
   });

   if (contract) {
      const ProductoTipoOperacionArray = contract.Producto.ProductoTipoOperacion;
      const docList = [];

      for (const productoTipoOperacion of ProductoTipoOperacionArray) {
         for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
            docList.push({
               id: productoDocumento.ProductoDocId,
               productoDocId: productoDocumento.ProductoDocId,
            });
         }
      }

      for (const doc of docList) {
         const createdContractDocument = await prismaClient.documentoContrato.create({
            data: {
               Usuario: { connect: { UsuarioId: systemUser?.UsuarioId } },
               Contrato: { connect: { ContratoId: contractId } },
               MaestroDocumentos: { connect: { DocumentoId: doc.id } },
               EstadoDoc: ContractDocumentStatusesEnum.PENDING,
               ProductoDocumento: {
                  connect: {
                     ProductoDocId: doc.productoDocId,
                  },
               },
            },
            include: { MaestroDocumentos: true },
         });

         const familiaDocId = createdContractDocument.DocId;

         if (familiaDocId) {
            const incidenceList = await prismaClient.maestroIncidencias.findMany({
               where: { DocAsociadoId: familiaDocId },
            });

            const notFoundIncidence = incidenceList.find((incidence) => incidence.Nombre.includes('no se ha recibido'));

            if (notFoundIncidence) {
               await prismaClient.incidenciaDocumento.create({
                  data: {
                     Usuario: { connect: { UsuarioId: systemUser?.UsuarioId } },
                     DocumentoContrato: { connect: { DocumentoId: createdContractDocument.DocumentoId } },
                     MaestroIncidencias: { connect: { IncidenciaId: notFoundIncidence.IncidenciaId } },
                  },
               });
            }
         }
      }

      await prismaClient.contrato.update({
         where: { ContratoId: contract.ContratoId },
         data: { updatedAt: createdDate },
      });
   }
};
 */
