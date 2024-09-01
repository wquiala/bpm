import { z } from 'zod';

// Zod schema for creating a IncidenciaDocumento
export const createIncidenciaDocumentoSchema = z.object({
   ContratoId: z.number(),
   DocumentoContratoId: z.number(),
   /*    TipoIncidenciaId: z.number(),
    */ Resuelta: z.boolean().optional(),
   /*    NumReclamaciones: z.number().optional(),
    */
   IncidenciaDocId: z.number(),
});
