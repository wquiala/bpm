import { z } from 'zod';

// Zod schema for creating a ContratoDocumento
export const createContratoDocumentoSchema = z.object({
   ContratoId: z.number(),
   DocId: z.number(),
   EstadoDoc: z.string().optional(),
   ProductoId: z.number(),
   CajaLote: z.number().optional(),
   TipoConciliacionId: z.number().optional(),
});

// Zod schema for updating a ContratoDocumento
export const updateContratoDocumentoSchema = z.object({
   ContratoId: z.number(),
   /*  DocId: z.number(), */
   EstadoDoc: z.string().optional(),
   CajaLote: z.number().optional(),
   TipoConciliacionId: z.number().optional(),
});
