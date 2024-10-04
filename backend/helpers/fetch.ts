import { RecordDiaria } from '../interfaces/contractsInterfaces';
import { prismaClient } from '../server';

export const fetchContrato = async (record: RecordDiaria, clave: string) => {
   let solicitud;
   let query;
   let actualizar = false;
   let desechar = false;
   let insertar = false;
   let query1;

   if (clave == record.CodigoPoliza) {
      query = await prismaClient.contrato.findFirst({
         where: { ClaveOperacion: record.CodigoPoliza },
      });
      if (record.CodigoSolicitud)
         query1 = await prismaClient.contrato.findFirst({
            where: {
               CodigoSolicitud: record.CodigoSolicitud,
            },
         });

      if (
         query != null ||
         (query1 != null && query1.CodigoPoliza != record.CodigoPoliza && query1.CodigoPoliza != '')
      ) {
         desechar = true;
      } else {
         query = await prismaClient.contrato.findFirst({
            where: { ClaveOperacion: record.CodigoSolicitud },
         });

         if (query != null) {
            solicitud = true;
            actualizar = true;
         } else {
            insertar = true;
         }
      }
   } else if (clave == record.CodigoSolicitud) {
      query = await prismaClient.contrato.findFirst({
         where: { OR: [{ ClaveOperacion: record.CodigoSolicitud }, { CodigoSolicitud: record.CodigoSolicitud }] },
      });

      if (query != null) {
         desechar = true;
      } else {
         insertar = true;
      }
   }

   return {
      query,
      actualizar,
      solicitud,
      desechar,
      insertar,
   };
};

export const fetchBranch = async (err: { [key: string]: string }, code: string = '') => {
   const producto = await prismaClient.producto.findFirst({
      where: { Codigo: code },
   });

   if (!producto) {
      if (err['Producto'])
         err['Producto'] +=
            '. El producto no se encuentra registrado en la tabla maestra de productos del sistema, actualícela';
      else
         err['Producto'] =
            'El producto no se encuentra registrado en la tabla maestra de productos del sistema, actualícela';
   }
   /* if (query) {
      producto = query;
   } else {
      producto = await prismaClient.producto.findFirst({
         where: { Codigo: 'Sin Producto' },
      });

      } */
   return producto;
};

export const fetchMediator = async (err: { [key: string]: string }, code: string = '') => {
   const mediador = await prismaClient.mediador.findFirst({
      where: { Codigo: code },
   });

   if (!mediador) {
      if (err['Mediador'])
         err['Mediador'] +=
            '. El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, actualícela';
      else
         err['Mediador'] =
            'El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, actualícela';
   }
   /*  if (query) {
      mediador = query;
   } else {
      mediador = await prismaClient.mediador.findFirst({
         where: { Codigo: 'Sin Mediador' },
      });

      if (err['mediador'])
         err['mediador'] +=
            '. El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal';
      else
         err['mediador'] =
            'El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal';
   } */
   return mediador;
};


export const fetchCompany = async (err: { [key: string]: string }, code?: string) => {
   let companyCode = code;
   let comp;

   if (code == 'UCV') {
      companyCode = 'UNI';
   } else if (code == 'AVP') {
      companyCode = 'SLS';
   }

   const query = await prismaClient.compania.findFirst({
      where: { Nombre: companyCode },
   });

   if (!query) {
      if (err['Compania'])
         err['Compania'] +=
            '. Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, actualícela';
      else
         err['Compania'] =
            'Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, actualícela';
   }

   /*  if (query!) {
      comp = query!;
   } else {
      comp = prismaClient.compania.findFirst({
         where: { Nombre: 'Sin Companía' },
      });

      if (err['compania'])
         err['compania'] +=
            '. Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, se asignará un código de compañia temporal';
      else
         err['compania'] =
            'Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, se asignará un código de compañia temporal';
   } */

   return query;
};

export const fetchClave = (record: RecordDiaria) => {
   let clave: string;
   const SOLICITUD = record.CodigoSolicitud;
   const CONTRATO = record.CodigoPoliza;

   if (CONTRATO) {
      clave = CONTRATO;
   } else clave = SOLICITUD;

   return clave;
};
