import { prismaClient } from '../server';

const validateNumPolicy = async (record: any, errors: { [key: string]: string }) => {
   if (record['NUM_POLIZA']) {
      const contract = await prismaClient.contrato.findFirst({
         where: {
            CodigoPoliza: `${record['NUM_POLIZA']}`,
         },
      });
      if (!contract) {
         errors['contrato'] = 'Contrato no encontrado';
      }
   }
};

export const digitalSignatureValidator = async (record: any) => {
   const errors: { [key: string]: string } = {};
   let hasError = false;

   await validateNumPolicy(record, errors);

   return {
      errors,
   };
};
