import api from '@/utils/api/useApi';

const baseUrl = '/caja-lote';

export default {
   getCajaLote(params: any) {
      return api.get(`${baseUrl}`, params);
   },

   createCajaLote(data: any) {
      return api.post(`${baseUrl}`, data);
   },
};
