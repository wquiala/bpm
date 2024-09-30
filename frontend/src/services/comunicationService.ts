import api from '@/utils/api/useApi';

const baseUrl = '/comunications';

export default {
   createComunication(data: any) {
      return api.post(`${baseUrl}`, data);
   },

   getComunications() {
      return api.get(`${baseUrl}`);
   },

   getComunicatioBYId(id: string) {
      return api.get(`${baseUrl}/${id}`);
   },

   sendEmail(data: any) {
      return api.post(`${baseUrl}/send-emails`, data);
   },
};
