import { z } from 'zod';

// Zod schema for creating a IncidenciaDocumento
export const createIncidenciaDocumentoSchema = z.object({
   ContratoId: z.number().optional(),
   DocumentoContratoId: z.number().optional(),
   /*    TipoIncidenciaId: z.number(),
    */ Resuelta: z.boolean().optional(),
   /*    NumReclamaciones: z.number().optional(),
    */
   Incidencia: z.number().optional(),
   Nota: z.string().optional(),
   Revisada: z.boolean().optional(),
   Enviar: z.boolean().optional(),
   Reclamada: z.string().optional() || null,
});

export const updateIncidenciaDocumentoSchema = z.object({
   ContratoId: z.number().optional(),
   DocumentoId: z.number().optional(),
   /*    TipoIncidenciaId: z.number(),
    */ Resuelta: z.boolean().optional(),
   /*    NumReclamaciones: z.number().optional(),
    */
   Incidencia: z.number().optional(),
   Nota: z.string().optional(),
   Revisada: z.boolean().optional(),
   Enviar: z.boolean().optional(),
   Reclamada: z.string().optional(),
});
