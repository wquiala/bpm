import handlePromise from '../../utils/promise';
import { MediadorService } from '../../services/MediatorService';

export const getMediadores = async () => {
   const [error, response, data] = await handlePromise(MediadorService.getMediatores());

   /* if (data.length === 1) {
      setSelectedContract(data[0]);
   } else {
      setFilteredContracts(data);
   } */

   return {
      error,
      response,
      data,
   };
};

export const getMediadorByCode = async (code: string) => {
   const [error, response, data] = await handlePromise(MediadorService.getMediatorByCode(code));

   return {
      error,
      data,
      response,
   };
};
