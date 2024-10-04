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
import { sendPolicyWithIncidenceReminder } from '../jobs/sendEmailWithIncidencesByContract';
import moment from 'moment';

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
      const comunication = await createComunicationService(validateData, userId);

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

export const sendEmail = async (req: Request, res: Response) => {
   const incidences = req.body;

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
         contrato.DocumentoContrato.map((doc: any) => {
            if (doc.EstadoDoc == 'PENDIENTE') {
               documentPending.push(doc);
            }
            doc.IncidenciaDocumento.map((incidence: any) => {
               if (
                  incidence.Resuelta == false &&
                  moment(incidence.Reclamada).isBefore(moment(), 'minute') &&
                  incidence.Revisada == true
               ) {
                  incidencesToSend.push({
                     DocumentoId: doc.DocumentoId,
                     IncidenciaDocId: incidence.IncidenciaDocId,
                     claveOperacion: contrato.ClaveOperacion,
                     nombreDocumento: doc.MaestroDocumentos.Nombre,
                     codigoDocumento: doc.MaestroDocumentos.Codigo,
                     incidenciaNombre: incidence.MaestroIncidencias.Nombre,
                     mediador: contrato.Mediador.Nombre,
                     emailTo: contrato.Mediador.Email,
                     nota: incidence.Nota,
                     contratoId: contrato.ContratoId,
                  });
               }
            });
         });
      }

      let incidences;

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

      const send = await sendPolicyWithIncidenceReminder(
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
      );
   }

   res.json({
      ...incidences,
   });
};
