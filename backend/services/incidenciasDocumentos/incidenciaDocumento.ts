import { Usuario } from '@prisma/client';
import { prismaClient } from '../../server';
import { ContractDocumentStatusesEnum } from '../../constants/ContractDocumentStatusesEnum';
import { createContractDocumentHistory, updateDNiState } from '../contractDocuments/contractDocuments';
import moment from 'moment';
import { NotFoundException } from '../../exceptions/not-found';
import { ErrorCode } from '../../exceptions/root';

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
                  FechaEstado: new Date(),
               },
            });

            listDocuments.push(document);

            const { ContratoId, ...dataD } = document;

            const toSend = {
               ...dataD,
            };

            await createContractDocumentHistory(toSend);
         }
      }
   }

   if (createdContract.FechaValidezDNITomador) await updateDNiState(createdContract, listDocuments);
};

export const findIncidenceDocumentById = async (id: number) => {
   try {
      const incidence = await prismaClient.incidenciaDocumento.findFirstOrThrow({
         where: {
            IncidenciaDocId: id,
         },
      });

      return incidence;
   } catch (error) {
      throw new NotFoundException('Incidence document not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};
