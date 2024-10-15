import { Request, Response } from 'express';
import printer from 'printer';

export const imprimir = (req: Request, res: Response) => {
   const { documents } = req.body;

   documents.forEach((doc: any) => {
      // Supongamos que cada doc es una URL de archivo PDF o base64
      printer.printFile({
         filename: doc, // Ruta del archivo o nombre del archivo temporal
         success: (jobID: any) => {
            console.log('Enviado a la impresora, Job ID:', jobID);
         },
         error: (err: any) => {
            console.error('Error al imprimir:', err);
         },
      });
   });

   res.json({ success: true });
};
