import z, { any } from 'zod';
import { createIncidenciaDocumentoSchema } from './incidenceDocument';
import { createContratoDocumentoSchema } from './contractDocument';

export const createComunicationSchema = z.object({
   IncidenciaDocumento: z.array(z.any()),
   DocumentoContrato: z.array(z.any()),
   tipoComunicacion: z.string(),
   data: z.string(),
});
