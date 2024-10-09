import handlePromise from '../../utils/promise';
import ContractService from '../../services/ContractService';
import LoadService from '@/services/LoadService';

export const getContracts = async (id: string) => {
   const [error, response, data] = await handlePromise(ContractService.getContractById(id));

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

export const updateContract = async (id: string, contractUpdate: any) => {
   const [error, response, data] = await handlePromise(ContractService.updateContract(id, contractUpdate));

   return {
      error,
      response,
      data,
   };
};

export const createContract = async (dataC: any) => {
   const [error, response, data] = await handlePromise(ContractService.createContract(dataC));

   return { response, error, data };
};

export const reprocesarPolizas = async (dataP: any) => {
   const [error, response, data] = await handlePromise(LoadService.reprocesarPolizas(dataP));
   return {
      response,
      data,
      error,
   };
};

export const incompletos = async () => {
   const [error, response, data] = await handlePromise(ContractService.getIncompletos());
   return {
      response,
      data,
      error,
   };
};

export const deleteIncompletosByClave = async (id: number) => {
   const [error, response, data] = await handlePromise(ContractService.deleteIncompletosByClave(id));
   console.log(data);
   return {
      response,
      data,
      error,
   };
};
