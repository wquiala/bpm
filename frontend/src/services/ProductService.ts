import api from '@/utils/api/useApi';

const baseUrl = '/branches';

export const ProductService = {
   createComunication(data: any) {
      return api.post(`${baseUrl}`, data);
   },

   getBranches() {
      return api.get(`${baseUrl}`);
   },

   getProductByCode(code: string) {
      return api.get(`${baseUrl}/code/${code}`);
   },

   sendEmail(data: any) {
      return api.post(`${baseUrl}/send-emails`, data);
   },
};
