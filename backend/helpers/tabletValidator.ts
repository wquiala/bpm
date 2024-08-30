import { TabletaRecord } from '../interfaces/contractsInterfaces';
import { prismaClient } from '../server';

const validateRequiredFields = (record: any, errors: { [key: string]: string }) => {
   const requiredFields = [
      { field: 'CCC', message: 'CCC es obligatorio' },
      { field: 'CODIGO_INTERNO_FORMULARIO', message: 'CODIGO_INTERNO_FORMULARIO es obligatorio' },
      { field: 'SITUACION_FIRMA', message: 'SITUACION_FIRMA es obligatorio' },
   ];

   requiredFields.forEach(({ field, message }) => {
      if (!record[field]) {
         errors[field] = message;
      }
   });
};

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
   let hasError = false;

   validateRequiredFields(record, error);
   await validateCCC(record, error);

   return {
      error,
   };
};
