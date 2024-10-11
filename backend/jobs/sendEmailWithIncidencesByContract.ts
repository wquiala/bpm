import { transporter } from '../nodemailer';
import { prismaClient } from '../server';
import { htmlToText } from 'html-to-text';
import { createComunicationService } from '../services/comunications/comunicationService';
import { updateContractService } from '../services/contracts/contractService';
import moment from 'moment';
import { Contrato } from '@prisma/client';
//import { updateIncidenciaDocumentoService } from '../services/incidenciasDocumentos/incidenciaDocumento';
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

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
export const sendEmailWithIncidencesByContract = async () => {
   const contracts = await prismaClient.contrato.findMany({
      include: {
         Compania: true,
         Mediador: true,
         DocumentoContrato: {
            include: {
               MaestroDocumentos: true,
               IncidenciaDocumento: {
                  include: {
                     TipoDocumentoIncidencia: { include: { MaestroDocumentos: true, MaestroIncidencias: true } },
                  },
               },
            },
         },
      },
   });

   const contractsTocheck = contracts.filter(
      (contract: Contrato) =>
         contract.Conciliar &&
         moment(contract.FechaProximaReclamacion).isSameOrBefore(moment(), 'day') &&
         contract.EstadoContrato != 'TRAMITADA' &&
         contract.EstadoContrato != 'ANULADA',
   );
   for (const contract of contractsTocheck) {
      let hasIncidences = false;
      /*  const test = contract.DocumentoContrato.map((document: any) =>
         document.IncidenciaDocumento.map((incidence: any) => {
            if (incidence.Resuelta == false && incidence.Revisada == true) {
               hasIncidences = true;
            }
         }),
      ); */

      /*       const pendings = findPendingDocumentsByContranct(contract.DocumentoContrato);
       */ /*  const documents = pendings.map((doc) => {
         return { nombre: doc.MaestroDocumentos.Nombre, reclamations: doc.NumeReclamaciones };
      }); */

      if (/* documents.length > 0 && */ hasIncidences == false && contract.NumeroReclamaciones < 3) {
         /*  await sendPolicyWithIncidenceReminder(
            contract.Mediador.Email ?? '',
            '',
            //@ts-ignore
            1,
            contract,
            {},
            documents,
         ); */
      } else if (hasIncidences && contract.NumeroReclamaciones < 4) {
         // const incidences = await buildDocumentsWithIncidences(contract);

         let incidencesToSend: any = [];

         /*  contract.DocumentoContrato.map((doc: any) => {
            if (doc.IncidenciaDocumento.length > 0) {
               doc.IncidenciaDocumento.map((incidence: any) => {
                  if (incidence.Resuelta == false && incidence.Revisada == true) {
                     incidencesToSend.push({
                        DocumentoId: doc.DocumentoId,
                        IncidenciaDocId: incidence.IncidenciaDocId,
                        numeroReclamaciones: incidence.NumReclamaciones,
                        claveOperacion: contract.ClaveOperacion,
                        nombreDocumento: doc.MaestroDocumentos.Nombre,
                        codigoDocumento: doc.MaestroDocumentos.Codigo,
                        incidenciaNombre: incidence.MaestroIncidencias.Nombre,
                        mediador: contract.Mediador.Nombre,
                        emailTo: contract.Mediador.Email,
                        nota: incidence.Nota,
                        contratoId: contract.ContratoId,
                     });
                  }
               });
            }
         }); */

         if (incidencesToSend.length > 0) {
            const incidences = incidencesToSend.reduce((acc: any, incidenciaDoc: any) => {
               const nombreDocumento = incidenciaDoc.nombreDocumento;

               if (!acc[nombreDocumento]) {
                  acc[nombreDocumento] = [];
               }
               acc[nombreDocumento].push(incidenciaDoc);
               return acc;
            }, {} as Record<string, Incidencia[]>);

            /* await sendPolicyWithIncidenceReminder(
               contract.Mediador.Email ?? '',
               '',
               //@ts-ignore
               1,
               contract,
               incidences,
               documents.length > 0 ? documents : [],
            ); */
         }
      }
   }
};

export const checkTimesClaim = () => {};

export const findPendingDocumentsByContranct = (contractDocuments: any[]) => {
   const documentsPending = [];
   for (const cd of contractDocuments) {
      if (cd.EstadoDoc == 'PENDIENTE') documentsPending.push(cd);
   }

   return documentsPending;
};

export const findIncidencesByDocument = (contractDocument: any) => {
   const incidences = [];

   for (const incidence of contractDocument.IncidenciaDocumento) {
      if (!incidence.Resuelta) incidences.push(incidence);
   }

   return incidences;
};

const isDueForReminderInMinutes = (fechaOperacion: Date): boolean => {
   const currentDate = new Date();
   const fechaOp = new Date(fechaOperacion);

   // Calcular la diferencia en minutos
   const diffInTime = currentDate.getTime() - fechaOp.getTime();
   const diffInMinutes = Math.floor(diffInTime / (1000 * 60)); // Diferencia en minutos
   console.log(`Diferencia en minutos: ${diffInMinutes}`); // Registro para depuración

   // Comprobar si la diferencia es exactamente 1, 2 o 3 minutos
   return diffInMinutes == 1 || diffInMinutes == 2 || diffInMinutes == 3;
};

export const buildDocumentsWithIncidences = async (contract: any) => {
   let incidencesToSend: any[] = [];
   contract.DocumentoContrato.map((doc: any) => {
      if (doc.EstadoDoc == 'PRESENTE CON INCIDENCIA')
         doc.IncidenciaDocumento.map((incidence: any) => {
            if (!incidence.Resuelta && !incidence.Revisada) {
               incidencesToSend.push({
                  DocumentoId: doc.DocumentoId,
                  IncidenciaDocId: incidence.IncidenciaDocId,
                  numeroReclamaciones: incidence.NumReclamaciones,
                  claveOperacion: contract.ClaveOperacion,
                  nombreDocumento: doc.MaestroDocumentos.Nombre,
                  codigoDocumento: doc.MaestroDocumentos.Codigo,
                  incidenciaNombre: incidence.MaestroIncidencias.Nombre,
                  mediador: contract.Mediador.Nombre,
                  emailTo: contract.Mediador.Email,
                  nota: incidence.Nota,
                  contratoId: contract.ContratoId,
               });
            }
         });
   });

   let incidences;

   if (incidencesToSend.length > 0) {
      incidences = incidencesToSend.reduce((acc: any, incidenciaDocumento: any) => {
         const nombreDocumento = incidenciaDocumento.nombreDocumento;

         if (!acc[nombreDocumento]) {
            acc[nombreDocumento] = [];
         }

         acc[nombreDocumento].push(incidenciaDocumento);

         return acc;
      }, {} as Record<string, any[]>);
   }

   /*  let incitoSend;
   for (const nombreDocumento in incidences) {
      incitoSend = incidences[nombreDocumento].map((inci: any) => inci);
   }
   console.log(incitoSend); */
   return incidences;
};

export const generateDocument = (data: any, content: any) => {
   // Cargar la plantilla .docx
   // Cargar la plantilla en un zip usando PizZip
   const zip = new PizZip(content);

   // Cargar el zip en docxtemplater
   const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
   });

   // Reemplazar las variables en la plantilla con los valores de 'data'
   const test = doc.setData(data);

   try {
      // Rellenar los campos en el documento
      doc.render();
   } catch (error) {
      console.error('Error rendering document:', error);
      throw error;
   }

   // Generar el archivo .docx a partir de la plantilla actualizada
   const output = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
   });

   // Guardar el archivo generado

   const outputPath = path.resolve(
      __dirname,
      `../files/emails/emailsCopy/${data.claveOperacion}_${new Date().toISOString()}.docx`,
   );
   fs.writeFileSync(outputPath, output);

   mammoth
      .extractRawText({ path: outputPath })
      .then((result) => {
         console.log('Contenido del documento:');
         console.log(result.value); // Texto extraído del documento .docx
      })
      .catch((err) => {
         console.error('Error al extraer texto del documento:', err);
      });
};

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
export const sendPolicyWithIncidenceReminder = async (
   to: string,
   cc: string,
   user: string,
   contrato: any,

   documentsWhitIncidencesToSend?: any,
   pendings?: any,
) => {
   let ruta;

   if (contrato.Compania.Nombre == 'PLV') {
      let fullInciden: string = '';

      const content = fs.readFileSync(path.resolve(__dirname, '../files/emails/templates/Plantilla_PLV.docx'));
      Object.keys(documentsWhitIncidencesToSend).forEach((nombreDocumento) => {
         const inciList: any[] = [];
         let incidoc;

         const incidencias = documentsWhitIncidencesToSend[nombreDocumento];
         const documento = nombreDocumento;
         incidencias.forEach((element: any) => {
            inciList.push(element.incidenciaNombre);
         });

         incidoc = `${nombreDocumento}: \n\n     •  ${inciList.join('\n     •  ')}\n\n`;

         fullInciden += incidoc;
      });

      const data: DocumentData = {
         tipo: contrato.CodigoPoliza ? 'póliza' : 'solicitud',
         IncidencesDocuments: fullInciden.length > 0 ? 'Documentación recibida con incidencias' : '',
         DocumentNoRecivida: pendings.length > 0 ? 'Documentación no recibida' : '',
         nombreCompania: contrato.Compania.Descripcion,
         claveOperacion: contrato.ClaveOperacion,
         DNITomador: contrato.DNITomador,
         nombreProducto: contrato.Producto.Descripcion,
         nombreTomador: contrato.NombreTomador,
         comentarios: fullInciden,
         documentosPendiente: pendings.map((element: any) => `• ${element.nombre}\n`),
         Observaciones: 'Prueba',
      };

      generateDocument(data, content);
   } else if (contrato.Compania.Nombre == 'UNI') {
      let fullInciden: string = '';

      let incidoc;
      const content = fs.readFileSync(path.resolve(__dirname, '../files/emails/templates/Plantilla_Unicorp.docx'));
      Object.keys(documentsWhitIncidencesToSend).forEach((nombreDocumento) => {
         const inciList: any[] = [];
         const incidencias = documentsWhitIncidencesToSend[nombreDocumento];
         const documento = nombreDocumento;
         incidencias.forEach((element: any) => {
            inciList.push(element.incidenciaNombre);
         });

         incidoc = `${nombreDocumento}: \n\n     •  ${inciList.join('\n     •  ')}\n\n`;

         fullInciden += incidoc;
      });

      const data: DocumentData = {
         nombreCompania: contrato.Compania.Descripcion,
         claveOperacion: contrato.ClaveOperacion,
         DNITomador: contrato.DNITomador,
         nombreProducto: contrato.Producto.Descripcion,
         nombreTomador: contrato.NombreTomador,
         IncidencesDocuments: fullInciden.length > 0 ? 'Documentación recibida con incidencias' : '',

         DocumentNoRecivida: pendings.length > 0 ? 'Documentación no recibida' : '',
         CCC: contrato.CCC,

         comentarios: incidoc,

         documentosPendiente: pendings.map((element: any) => element.nombre),
         FechaOperacion: new Date(contrato.FechaOperacion).toLocaleString(),
         CodigoPoliza: contrato.CodigoPoliza,
         CdigoSolicitud: contrato.CodigoSolicitud,
         nombreAsegurado: contrato.NombreAsegurado,
         DNIAsegurado: contrato.DNIAsegurado,
         Observaciones: 'Prueba',
      };

      generateDocument(data, content);
   } else {
      let fullInciden: string = '';

      let incidoc;
      const content = fs.readFileSync(path.resolve(__dirname, '../files/emails/templates/Plantilla_AVP.docx'));
      Object.keys(documentsWhitIncidencesToSend).forEach((nombreDocumento) => {
         const inciList: any[] = [];
         const incidencias = documentsWhitIncidencesToSend[nombreDocumento];
         const documento = nombreDocumento;
         incidencias.forEach((element: any) => {
            inciList.push(element.incidenciaNombre);
         });

         incidoc = `${nombreDocumento}: \n\n     •  ${inciList.join('\n     •  ')}\n\n`;

         fullInciden += incidoc;
      });

      const data: DocumentData = {
         nombreCompania: contrato.Compania.Descripcion,
         claveOperacion: contrato.ClaveOperacion,
         DNITomador: contrato.DNITomador,
         nombreProducto: contrato.Producto.Descripcion,
         nombreTomador: contrato.NombreTomador,

         IncidencesDocuments: fullInciden.length > 0 ? 'Documentación recibida con incidencias' : '',
         DocumentNoRecivida: pendings.length > 0 ? 'Documentación no recibida' : '',

         comentarios: incidoc,

         documentosPendiente: pendings.map((element: any) => element.nombre),
         Observaciones: 'Prueba',
      };

      generateDocument(data, content);
   }
   const plantilla = ``;
   let html = '';
   let incitoUpdate: any = [];
   const pendingsNames = `<div style="margin-bottom: 20px; border: 1px solid #ddd; padding: 20px; border-radius: 5px; background-color: #f5f5f5;">
                <h1 style="color: #5bc0de;">Documentos Pendientes</h1>
                ${
                   pendings.length > 0
                      ? pendings.map((element: any) => {
                           return `<h2>${element.nombre}</h2>`;
                        })
                      : 'No hay documentos pendientes'
                }
               
            </div>`;
   let caja = '';

   if (Object.keys(documentsWhitIncidencesToSend).length > 0) {
      Object.keys(documentsWhitIncidencesToSend).forEach((nombreDocumento) => {
         const incidencias = documentsWhitIncidencesToSend[nombreDocumento];
         const documento = nombreDocumento;
         caja = `<div style="margin-bottom: 20px; border: 1px solid #ddd; padding: 20px; border-radius: 5px; background-color: #f5f5f5;">
                      <h1><strong>Documento:</strong> ${documento}</h1>`;

         incidencias.forEach((incidencia: any, index: number) => {
            incitoUpdate.push(incidencia);
            caja =
               caja +
               `<p><strong>Incidencia ${index + 1}:</strong></p>
            <p>${incidencia.incidenciaNombre}</p>
             <p><strong>Nota:</strong> ${incidencia.nota}</p>


          `;
         });
         html = html + (`${caja}` + `</div>`);
      });
   } else html = 'No hay Incidencias que reclamar';
   let mailOptions = {
      from: 'kaosolution8@gmail.com',
      to: to,
      cc: cc,
      bcc: 'Aqui van los correos con copia oculta',
      subject: 'Hello',
      text: '',
      html: `<div><h1>Contrato: ${contrato.ClaveOperacion}</h1></div> ${html + `</div>`}${pendingsNames ?? ''}`,
   };

   // Send email
   /*  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      getInfoEmailAndUpdateDB(info, mailOptions, user, contrato, documentsWhitIncidencesToSend, pendings);
   }); */
   // Setup email data

   //actualizamos las fechas de reclamaciones de las incidencias

   /*  if (incitoUpdate.length > 0) {
      for (const incidence of incitoUpdate) {
         await updateIncidenciaDocumentoService(incidence.IncidenciaDocId, { Reclamada: new Date() });
      }
   } */
};

export const getInfoEmailAndUpdateDB = async (
   info: any,
   mailOption: any,
   user: string,
   contrato: any,

   incidences: any,
   documents: any,
) => {
   let tipoComunicacion: string;

   if (Object.keys(incidences).length > 0 && documents.length > 0) {
      tipoComunicacion = 'DOCUMENTOS_PENDIENTES_INCIDENCIAS';
   } else if (Object.keys(incidences).length > 0) {
      tipoComunicacion = 'INCIDENCIAS';
   } else {
      tipoComunicacion = 'DOCUMENTOS_PENDIENTES';
   }

   const dataToSend = {
      contratoId: contrato.ContratoId,
      tipoComunicacion,
      data: htmlToText(mailOption.html),
      emailDestinatario: mailOption.to,
   };
   const in30Days = moment().add(30, 'days').toDate();
   await createComunicationService(dataToSend, user);

   await updateContractService(contrato.ContratoId, {
      FechaProximaReclamacion: in30Days,
      NumeroReclamaciones: contrato.NumeroReclamaciones + 1,
      FechaReclamacion: new Date(),
   });

   /*  await updateContractService(contrato.ContratoId, {
      FechaProximaReclamacion: in30Days,
      FechaReclamacion: new Date(),
      NumeroReclamaciones: contrato.NumeroReclamaciones + 1,
   }); */
};
