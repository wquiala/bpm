import z from 'zod';

export const createComunicationSchema = z.object({
   IncidenciaDocumento: z.array(z.any()),
   DocumentoContrato: z.array(z.any()),
   tipoComunicacion: z.string(),
   data: z.string(),
});
