import { BadRequestsException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';

export const parserDate = (date: string) => {
   if (!date) {
      return null;
   }
   const [day, month, year] = date.split('/');

   return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0));
};
