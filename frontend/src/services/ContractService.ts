import api from '@/utils/api/useApi';
import { number } from 'yup';

const baseUrl = '/contracts';

export default {
   getContracts(params: any) {
      return api.get(`${baseUrl}`, params);
   },
   getContractById(id: string) {
      return api.get(`${baseUrl}/${id}`);
   },
   createContract(data: any) {
      return api.post(`${baseUrl}`, data);
   },
   updateContract(id: any, data: any) {
      return api.put(`${baseUrl}/${id}`, data);
   },
   deleteContract(id: any) {
      return api.delete(`${baseUrl}/${id}`);
   },

   deleteIncompletosByClave(id: number) {
      return api.delete(`${baseUrl}/incompletos/${id}`);
   },
   getIncompletos() {
      return api.get(`${baseUrl}/incompletos`);
   },
};
