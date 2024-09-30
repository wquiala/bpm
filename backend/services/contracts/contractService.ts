import { NoProcesar } from '@prisma/client';
import { BadRequestsException } from '../../exceptions/bad-requests';
import { ErrorCode } from '../../exceptions/root';
import { prismaClient } from '../../server';
import { NoProcesarInterface, RecordDiaria } from '../../interfaces/contractsInterfaces';

export const findContractByClaveOperacion = async (clave: string) => {
   try {
      const contrato = await prismaClient.contrato.findFirstOrThrow({
         where: { ClaveOperacion: clave },
         include: {
            DocumentoContrato: {
               include: { IncidenciaDocumento: { include: { MaestroIncidencias: true } }, MaestroDocumentos: true },
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

export const createDesechados = async (data: any) => {
   return await prismaClient.noProcesar.create({
      data: {
         ...data,
      },
   });
};
