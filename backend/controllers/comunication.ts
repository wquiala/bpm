import { Response, Request } from 'express';
import {
   createComunicationService,
   getComunicationByIdService,
   getComunicationsService,
} from '../services/comunications/comunicationService';
import { createComunicationSchema } from '../schema/comunications';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { findContractByClaveOperacion } from '../services/contracts/contractService';
import { generateDocument, sendPolicyWithIncidenceReminder } from '../jobs/sendEmailWithIncidencesByContract';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import { prismaClient } from '../server';
import { exec } from 'child_process';
import { NODE_ENV } from '../secrets';

interface DocumentData {
   nombreCompania?: string;
   claveOperacion?: string;
   DNITomador?: string;
   DNIAsegurado?: string;
   nombreAsegurado?: string;

   nombreProducto?: string;
   nombreTomador?: string;
   comentarios?: string;
   documentosPendiente?: string;
   Observaciones?: string;
   tipo?: string;
   IncidencesDocuments?: string;
   DocumentNoRecivida?: string;
   FechaOperacion?: string;
   CCC?: string;
   CodigoPoliza?: string;
   CdigoSolicitud?: string;
}

export const getComunicationById = async (req: Request, res: Response) => {
   const id = req.params.id;
   try {
      const comunication = await getComunicationByIdService(parseInt(id));
      res.json({
         ...comunication,
      });
   } catch (error) {
      res.json({
         error,
      });
   }
};

export const createComunication = async (req: Request, resp: Response) => {
   const validateData = createComunicationSchema.parse(req.body);
   //@ts-ignore
   const userId = req.user.UsuarioId;
   try {
      await createComunicationService(validateData, userId);

      resp.json({});
   } catch (error) {
      console.log(error);
   }
};

export const getComunications = async (req: Request, res: Response) => {
   try {
      const comunications = await getComunicationsService();

      res.json({
         ...comunications,
      });
   } catch (error) {
      throw new BadRequestsException('Imposible buscar comunicaciones', ErrorCode.BAD_REQUEST_EXCEPTION);
   }
};

type Incidencia = {
   DocumentoId: number;
   IncidenciaDocId: number;
   codigoDocumento: string;
   nombreDocumento: string;

   claveOperacion: string;
   incidenciaNombre: string;
   mediador: string;
   anular: boolean;
   emailTo: string;
   numeroReclamaciones: number;
   nota: string;
};

const transformDataReturnDoc = async (incidences: any) => {
   let pathDocument = '';
   let document = '';
   const incidencesGroupedByClaveOperacion = incidences.reduce((acc: any, incidencia: Incidencia) => {
      const clave = incidencia.claveOperacion;

      // Si el grupo de la claveOperacion no existe aún, lo creamos
      if (!acc[clave]) {
         acc[clave] = [];
      }

      // Añadimos la incidencia al grupo correspondiente
      acc[clave].push(incidencia);

      return acc;
   }, {} as Record<string, Incidencia[]>);

   for (const claveOperacion in incidencesGroupedByClaveOperacion) {
      const incidencesToSend = incidencesGroupedByClaveOperacion[claveOperacion].map((inci: Incidencia) => inci);

      const contrato = await findContractByClaveOperacion(claveOperacion);
      const documentPending: any[] = [];

      if (contrato) {
         contrato.DocumentoContrato.forEach((doc: any) => {
            if (doc.EstadoDoc == 'PENDIENTE') {
               documentPending.push(doc);
            }
            doc.IncidenciaDocumento.forEach((incidence: any) => {
               if (
                  !incidence.Resuelta &&
                  moment(incidence.Reclamada).isBefore(moment(), 'minute') &&
                  incidence.Revisada
               ) {
                  incidencesToSend.push({
                     DocumentoId: doc.DocumentoId,
                     IncidenciaDocId: incidence.IncidenciaDocId,
                     claveOperacion: contrato.ClaveOperacion,
                     nombreDocumento: doc.MaestroDocumentos.Nombre,
                     incidenciaNombre: incidence.MaestroIncidencias.Nombre,
                     mediador: contrato.Mediador.Nombre,
                     emailTo: contrato.Mediador.Email,
                     nota: incidence.Nota,
                  });
               }
            });
         });
      }

      let incidences: any[] = [];
      if (incidencesToSend.length > 0) {
         incidences = incidencesToSend.reduce((acc: any, incidenciaDoc: Incidencia) => {
            const nombreDocumento = incidenciaDoc.nombreDocumento;

            if (!acc[nombreDocumento]) {
               acc[nombreDocumento] = [];
            }

            acc[nombreDocumento].push(incidenciaDoc);

            return acc;
         }, {} as Record<string, Incidencia[]>);
      }

      let fullInciden: string = '';
      Object.keys(incidences).forEach((nombreDocumento: any) => {
         const inciList: any[] = [];
         let incidoc;

         const incidencias = incidences[nombreDocumento];
         const documento = nombreDocumento;
         incidencias.forEach((element: any) => {
            const nota = element.nota ? `(${element.nota})` : '';
            inciList.push(`${element.incidenciaNombre} ${nota}`);
         });

         incidoc = `${nombreDocumento}: \n\n     •  ${inciList.join('\n     •  ')}\n\n`;

         fullInciden += incidoc;
      });

      const observaciones = contrato.DetalleObservacion;

      const pendings = documentPending.map((element: any) => `•  ${element.MaestroDocumentos.Descripcion}`);
      const data: DocumentData = {
         tipo: contrato.CodigoPoliza ? 'póliza' : 'solicitud',
         DocumentNoRecivida: documentPending.length > 0 ? 'Documentación no recibida' : '',
         nombreCompania: contrato.Compania.Descripcion!,
         claveOperacion: contrato.ClaveOperacion,
         DNITomador: contrato.DNITomador,
         nombreProducto: contrato.Producto.Descripcion!,
         nombreTomador: contrato.NombreTomador,
         documentosPendiente: pendings.join('\n'),
         IncidencesDocuments: fullInciden.length > 0 ? 'Documentación recibida con incidencias' : '',
         comentarios: fullInciden,

         Observaciones: observaciones.length > 0 ? observaciones[observaciones.length - 1].Contenido : '',
      };
      if (contrato.Compania.Nombre == 'PLV') {
         const content = fs.readFileSync(path.resolve(__dirname, '../files/emails/templates/Plantilla_PLV.docx'));

         const { pathDoc, docText } = await generateDocument(data, content);
         pathDocument = pathDoc;
         document = docText;
      } else if (contrato.Compania.Nombre == 'UNI') {
         const content = fs.readFileSync(path.resolve(__dirname, '../files/emails/templates/Plantilla_Unicorp.docx'));
         data.CCC = contrato.CCC;
         data.FechaOperacion = new Date(contrato.FechaOperacion!).toLocaleString();
         data.CodigoPoliza = contrato.CodigoPoliza;
         data.CdigoSolicitud = contrato.CodigoSolicitud;
         data.nombreAsegurado = contrato.NombreAsegurado;
         data.DNIAsegurado = contrato.DNIAsegurado;

         const { pathDoc, docText } = await generateDocument(data, content);
         pathDocument = pathDoc;
         document = docText;
      } else {
         const content = fs.readFileSync(path.resolve(__dirname, '../files/emails/templates/Plantilla_AVP.docx'));
         const { pathDoc, docText } = await generateDocument(data, content);
         pathDocument = pathDoc;
         document = docText;
      }
   }

   return {
      pathDocument,
      document,
   };
};

export const sendEmail = async (req: Request, res: Response) => {
   const incidences = req.body;
   let arrayList: any[] = [];

   // Agrupar por claveOperacion
   const incidencesGroupedByClaveOperacion = incidences.reduce((acc: any, incidencia: Incidencia) => {
      const clave = incidencia.claveOperacion;

      // Si el grupo de la claveOperacion no existe aún, lo creamos
      if (!acc[clave]) {
         acc[clave] = [];
      }

      // Añadimos la incidencia al grupo correspondiente
      acc[clave].push(incidencia);

      return acc;
   }, {} as Record<string, Incidencia[]>);

   for (const claveOperacion in incidencesGroupedByClaveOperacion) {
      const incidencesToSend = incidencesGroupedByClaveOperacion[claveOperacion].map((inci: Incidencia) => inci);

      const contrato = await findContractByClaveOperacion(claveOperacion);
      const documentPending: any[] = [];

      if (contrato) {
         contrato.DocumentoContrato.forEach((doc: any) => {
            if (doc.EstadoDoc == 'PENDIENTE') {
               documentPending.push(doc);
            }
            doc.IncidenciaDocumento.forEach((incidence: any) => {
               if (
                  !incidence.Resuelta &&
                  moment(incidence.Reclamada).isBefore(moment(), 'minute') &&
                  incidence.Revisada
               ) {
                  incidencesToSend.push({
                     DocumentoId: doc.DocumentoId,
                     IncidenciaDocId: incidence.IncidenciaDocId,
                     claveOperacion: contrato.ClaveOperacion,
                     nombreDocumento: doc.MaestroDocumentos.Nombre,
                     incidenciaNombre: incidence.MaestroIncidencias.Nombre,
                     mediador: contrato.Mediador.Nombre,
                     emailTo: contrato.Mediador.Email,
                     nota: incidence.Nota,
                  });
               }
            });
         });
      }

      let incidences: any[] = [];
      if (incidencesToSend.length > 0) {
         incidences = incidencesToSend.reduce((acc: any, incidenciaDoc: Incidencia) => {
            const nombreDocumento = incidenciaDoc.nombreDocumento;

            if (!acc[nombreDocumento]) {
               acc[nombreDocumento] = [];
            }

            acc[nombreDocumento].push(incidenciaDoc);

            return acc;
         }, {} as Record<string, Incidencia[]>);
      }

      let fullInciden: string = '';
      Object.keys(incidences).forEach((nombreDocumento: any) => {
         const inciList: any[] = [];
         let incidoc;

         const incidencias = incidences[nombreDocumento];
         const documento = nombreDocumento;
         incidencias.forEach((element: any) => {
            const nota = element.nota ? `(${element.nota})` : '';
            inciList.push(`${element.incidenciaNombre} ${nota}`);
         });

         incidoc = `${nombreDocumento}: \n\n     •  ${inciList.join('\n     •  ')}\n\n`;

         fullInciden += incidoc;
      });

      const observaciones = contrato.DetalleObservacion;

      const pendings = documentPending.map((element: any) => `•  ${element.MaestroDocumentos.Descripcion}`);
      const data: DocumentData = {
         tipo: contrato.CodigoPoliza ? 'póliza' : 'solicitud',
         DocumentNoRecivida: documentPending.length > 0 ? 'Documentación no recibida' : '',
         nombreCompania: contrato.Compania.Descripcion!,
         claveOperacion: contrato.ClaveOperacion,
         DNITomador: contrato.DNITomador,
         nombreProducto: contrato.Producto.Descripcion!,
         nombreTomador: contrato.NombreTomador,
         documentosPendiente: pendings.join('\n'),
         IncidencesDocuments: fullInciden.length > 0 ? 'Documentación recibida con incidencias' : '',
         comentarios: fullInciden,

         Observaciones: observaciones.length > 0 ? observaciones[observaciones.length - 1].Contenido : '',
      };
      if (contrato.Compania.Nombre == 'PLV') {
         const content = fs.readFileSync(path.resolve(__dirname, '../files/emails/templates/Plantilla_PLV.docx'));

         await generateDocument(data, content);
      } else if (contrato.Compania.Nombre == 'UNI') {
         const content = fs.readFileSync(path.resolve(__dirname, '../files/emails/templates/Plantilla_Unicorp.docx'));
         data.CCC = contrato.CCC;
         data.FechaOperacion = new Date(contrato.FechaOperacion!).toLocaleString();
         data.CodigoPoliza = contrato.CodigoPoliza;
         data.CdigoSolicitud = contrato.CodigoSolicitud;
         data.nombreAsegurado = contrato.NombreAsegurado;
         data.DNIAsegurado = contrato.DNIAsegurado;

         await generateDocument(data, content);
      } else {
         const content = fs.readFileSync(path.resolve(__dirname, '../files/emails/templates/Plantilla_AVP.docx'));
         const { pathDoc, docText } = await generateDocument(data, content);
      }

      /*   await sendPolicyWithIncidenceReminder(
         contrato.Mediador.Email ?? '',
         '',
         //@ts-ignore
         req.user.UsuarioId,
         contrato,
         Object.keys(incidences).length > 0 ? incidences : [],

         documentPending.length > 0
            ? documentPending.map((doc: any) => {
                 return { nombre: doc.MaestroDocumentos.Nombre, reclamations: doc.NumeReclamaciones };
              })
            : [],
      ); */
   }

   res.json({
      arrayList,
   });
};

export const downloadEmail = async (req: Request, res: Response) => {
   const { clave } = req.params;
   const incidences = req.body;
   await transformDataReturnDoc(incidences);

   //const filePath = path.join(__dirname, 'files', pathDocument);
   if (NODE_ENV == 'production') {
      res.json({ fileUrl: `https://santaluciapre.servinform.es/api/files/${clave}.docx` });
   } else res.json({ fileUrl: `http://localhost:5000/api/files/${clave}.docx` });
   /*
    */
};
