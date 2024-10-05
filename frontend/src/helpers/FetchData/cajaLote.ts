import cajaLoteService from '@/services/cajaLoteService';
import handlePromise from '../../utils/promise';

export const createCajaLote = async (dataC: any) => {
   const [error, response, data] = await handlePromise(cajaLoteService.createCajaLote(dataC));

   return {
      error,
      response,
      data,
   };
};
