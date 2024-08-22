import { ContractUpdate } from '../../../interfaces/contractsInterfaces';
import { prismaClient } from '../../../server';

export const updatePolicy = (data: any, id?: number) => {
      return prismaClient.contrato.update({
            where: {
                  ContratoId: id,
            },
            data: {
                  ...data,
            },
      });
};
