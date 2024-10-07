import { ESTADO_CONTRATO, OPERACION_CONTRATO } from '@prisma/client';
import { BadRequestsException } from '../../exceptions/bad-requests';
import { ErrorCode } from '../../exceptions/root';
import { prismaClient } from '../../server';
import { ContractHistoryData } from '../../interfaces/contractsInterfaces';

export const findContractByClaveOperacion = async (clave: string) => {
   try {
      const contrato = await prismaClient.contrato.findFirstOrThrow({
         where: { ClaveOperacion: clave },
         include: {
            DocumentoContrato: {
               include: {
                  IncidenciaDocumento: {
                     include: {
                        TipoDocumentoIncidencia: {
                           include: {
                              MaestroDocumentos: true,
                              MaestroIncidencias: true,
                           },
                        },
                     },
                  },
                  MaestroDocumentos: true,
               },
            },
            Mediador: true,
         },
      });
      return contrato;
   } catch (error) {
      throw new BadRequestsException('Contrato no encontrato', ErrorCode.BAD_REQUEST_EXCEPTION);
   }
};

export const updateContractService = async (id: number, data: any) => {
   const contrato = await prismaClient.contrato.findFirst({
      where: {
         ContratoId: id,
      },
   });

   if (contrato) {
      return await prismaClient.contrato.update({
         where: {
            ContratoId: id,
         },
         data: {
            ...data,
         },
      });
   }
   return false;
};

export const handlePreLoadConciliation = async (createdContract: any) => {
   const preLoadConciliation = await prismaClient.tipoConciliacion.findFirst({
      where: { nombre: 'Carga previa' },
   });

   if (preLoadConciliation) {
      const updated = await prismaClient.contrato.update({
         where: { ContratoId: createdContract.ContratoId },
         data: {
            TipoConciliacion: {
               connect: {
                  tipoConciliacionId: preLoadConciliation?.tipoConciliacionId,
               },
            },
            EstadoContrato: createdContract.AnuladoSEfecto ? 'ANULADA' : 'TRAMITADA',
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
};

export const createDesechados = async (data: any) => {
   return await prismaClient.noProcesar.create({
      data: {
         ...data,
      },
   });
};

export const createContractHistory = async (
   data: ContractHistoryData,
   Operacion?: OPERACION_CONTRATO,
   EstadoContrato?: ESTADO_CONTRATO,
) => {
   const { ContratoId, ...rest } = data;

   return ContratoId
      ? await prismaClient.historialContrato.create({
           data: {
              Contrato: { connect: { ContratoId: ContratoId } },
              Operacion,
              EstadoContrato,
              ...rest,
           },
           include: {
              Contrato: true,
           },
        })
      : await prismaClient.historialContrato.create({
           data: {
              ...rest,
           },
        });
};
