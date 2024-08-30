import { prismaClient } from '../server';

const validateRequiredFields = (record: any, errors: { [key: string]: string }) => {
   const requiredFields = [
      { field: 'NUM_POLIZA', message: 'NUM_POLIZA es obligatorio' },
      { field: 'RESULTADO', message: 'RESULTADO es obligatorio' },
   ];

   requiredFields.forEach(({ field, message }) => {
      if (!record[field]) {
         errors[field] = message;
      }
   });
};

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

   validateRequiredFields(record, errors);
   await validateNumPolicy(record, errors);

   return {
      errors,
   };
};
