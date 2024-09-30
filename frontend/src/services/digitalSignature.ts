import api from '@/utils/api/useApi';

const baseUrl = '/digital-signature';

export const DigitalSignatureService = {
   /* createMediator(data: any) {
      return api.post(`${baseUrl}`, data);
   },
   updateMediator(id: any, data: any) {
      return api.put(`${baseUrl}/${id}`, data);
   },
   deleteMediator(id: any) {
      return api.delete(`${baseUrl}/${id}`);
   },
   getMediatorById(id: string) {
      return api.get(`${baseUrl}/${id}`);
   },
 */
   getDigitalSignaturebyContract(contract: string) {
      return api.get(`${baseUrl}/${contract}`);
   },
   /*  getMediatores() {
      return api.get(`${baseUrl}`);
   }, */
};
