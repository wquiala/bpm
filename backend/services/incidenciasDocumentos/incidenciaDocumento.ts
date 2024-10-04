import { Usuario } from '@prisma/client';
import { prismaClient } from '../../server';
import { ContractDocumentStatusesEnum } from '../../constants/ContractDocumentStatusesEnum';
import { createContractDocumentHistory, updateDNiState } from '../contractDocuments/contractDocuments';
import moment from 'moment';

export const updateIncidenciaDocumentoService = (id: number, data: any) => {
   return prismaClient.incidenciaDocumento.update({
      where: {
         IncidenciaDocId: id,
      },
      data: {
         ...data,
      },
   });
};

export const handleIncidences = async (createdContract: any, systemUser: Usuario) => {
   const listDocuments: any = [];
   for (const productoTipoOperacion of createdContract.Producto.ProductoTipoOperacion) {
      for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
         const fechaOperacion = createdContract.FechaOperacion;
         const fechaBaja = productoDocumento.FechaBaja;
         if (productoDocumento.FechaBaja != null && moment(fechaOperacion).isSameOrAfter(moment(fechaBaja), 'day')) {
            continue;
         } else {
            console.log('Fecha de baja mayor que fecha operacion');

            const document = await prismaClient.documentoContrato.create({
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

            listDocuments.push(document);

            const { ContratoId, ...dataD } = document;

            await createContractDocumentHistory(dataD);
         }
      }
   }

   if (createdContract.FechaValidezDNITomador) await updateDNiState(createdContract, listDocuments);
};
