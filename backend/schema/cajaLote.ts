import { z } from 'zod';

export const createCajaLoteSchema = z.object({
   contratoId: z.number(),
   caja: z.number(),
   lote: z.number(),
   nota: z.string().optional(),
   /*    documento: z.number().optional(),
    */
});
