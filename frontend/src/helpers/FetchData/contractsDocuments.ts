import DocumentContractService from '@/services/DocumentContractService';
import handlePromise from '../../utils/promise';

export const getContractDocumentsbyContract = async (id: string) => {
   const [error, response, data] = await handlePromise(DocumentContractService.getDocumentById(id));
   return {
      data,
      response,
      error,
   };
};
