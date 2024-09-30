import handlePromise from '../../utils/promise';
import { DigitalSignatureService } from '@/services/digitalSignature';

export const getDigitalSignatureByContract = async (contract: string) => {
   const [error, response, data] = await handlePromise(DigitalSignatureService.getDigitalSignaturebyContract(contract));

   return {
      error,
      data,
      response,
   };
};
