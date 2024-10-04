import api from '@/utils/api/useApi';

const baseUrl = '/digital-signature';

export const DigitalSignatureService = {
   getDigitalSignaturebyContract(contract: string) {
      return api.get(`${baseUrl}/${contract}`);
   },
};
