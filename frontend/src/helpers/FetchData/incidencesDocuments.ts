import handlePromise from '../../utils/promise';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';

export const getIncidences = async () => {
   const [error, response, data] = await handlePromise(DocumentIncidenceService.getIncidenceDocuments());
   return {
      data,
      response,
      error,
   };
};
