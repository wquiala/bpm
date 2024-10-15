import api from '@/utils/api/useApi';

const baseUrl = '/contract-documents';

export default {
   createDocumentContract(data: any) {
      return api.post(`${baseUrl}`, data);
   },
   updateDocumentContract(id: string | number, data: any) {
      return api.put(`${baseUrl}/${id}`, data);
   },

   getDocumentById(id: string) {
      return api.get(`${baseUrl}/${id}`);
   },

   getDocumentByContract(id: string) {
      return api.get(`${baseUrl}/${id}`);
   },

   findIncidencesDocumentsAndUpdateStatus(data: any) {
      return api.post(`${baseUrl}/`, data);
   },
};
