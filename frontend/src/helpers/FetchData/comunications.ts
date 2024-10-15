import comunicationService from '@/services/comunicationService';
import handlePromise from '../../utils/promise';

export const sendEmail = async (incidences: any) => {
   const [error, response, data] = await handlePromise(comunicationService.sendEmail(incidences));

   return {
      error,
      response,
      data,
   };
};

export const downloadEmail = async (clave: string, incidences: any) => {
   const [error, response, data] = await handlePromise(comunicationService.downloadEmail(clave, incidences));

   return {
      error,
      response,
      data,
   };
};
