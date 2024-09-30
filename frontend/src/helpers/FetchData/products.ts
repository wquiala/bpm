import { ProductService } from '@/services/ProductService';
import handlePromise from '@/utils/promise';
export const getProducts = () => {
   const [error, data, response] = handlePromise(ProductService.getBranches());

   return {
      error,
      data,
      response,
   };
};

export const getProductsByCodigo = async (code: string) => {
   const [error, response, data] = await handlePromise(ProductService.getProductByCode(code));

   return {
      error,
      data,
      response,
   };
};
