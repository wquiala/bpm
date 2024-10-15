import { TabletaRecord } from '../interfaces/contractsInterfaces';
import { prismaClient } from '../server';

const validateCCC = async (record: any, error: { [key: string]: string }) => {
   if (record['CCC']) {
      const contract = await prismaClient.contrato.findFirst({
         where: {
            CCC: `${record['CCC']}`,
         },
      });
      if (!contract) {
         error['contrato'] = 'Contrato no encontrado';
      }
   }
};

export const tabletValidator = async (record: TabletaRecord) => {
   const error: { [key: string]: string } = {};

   await validateCCC(record, error);

   return {
      error,
   };
};
