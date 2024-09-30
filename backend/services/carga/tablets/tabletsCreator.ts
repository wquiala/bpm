import moment from 'moment';
import { TabletaRecord } from '../../../interfaces/contractsInterfaces';
import { prismaClient } from '../../../server';
import { parserDate } from '../../../helpers/time';

export const tabletsCreator = async (record: any, actualizado: boolean, err: { [key: string]: string }) => {
   return await prismaClient.tableta.create({
      data: {
         Compannia: record['#COMPANNIA'],
         TipoProducto: record.TIPO_PRODUCTO,
         TipoSubProducto: record.TIPO_SUBPRODUCTO,
         NombreComercialProducto: record.NOMBRE_COMERCIAL_PRODUCTO,
         CodigoProducto: record.CODIGO_PRODUCTO,
         CodigoModalidad: record.CODIGO_MODALIDAD,
         CodigoPoliza: record.CODIGO_POLIZA,
         CodigoSolicitud: record.CODIGO_SOLICITUD,
         FechaGrabacion: new Date(),
         DNIAsegurado: record.NUM_IDENTIFICACION_ASE,
         NombreAsegurado: record.NOMBRE_ASE,
         NumIdentificacionTo: record.NUM_IDENTIFICACION_TO,
         NombreTo: record.NOMBRE_TO,
         CodigoMediador: record.CODIGO_MEDIADOR,
         NombreMediador: record.NOMBRE_MEDIADOR,
         CodigoSubmediador: record.CODIGO_SUBMEDIADOR,
         NombreSubMediador: record.NOMBRE_SUBMEDIADOR,
         CCC: record.CCC,
         FechaOperacion: new Date(),
         FechaActualizacion: new Date(),
         DescOperacion: record.DESC_OPERACION,
         TipoRegistro: record.TIPO_REGISTRO,
         CodigoInternoFormulario: record.CODIGO_INTERNO_FORMULARIO,
         DescFormulario: record.DESC_FORMULARIO,
         TipoFirma: record.TIPO_FIRMA,
         FechaFirma: new Date(),
         SituacionFirma: record.SITUACION_FIRMA,
         CanalMediador: record.CANAL_MEDIADOR,
         CanalRecepcionFirma: record.CANAL_RECEPCION_FIRMA,
         CodigoCentro: record.CODIGO_CENTRO,
         NumActualizaciones: Number(record.NUM_ACTUALIZACIONES),
         Usuario: record.USUARIO,
         Conciliar: record['CONCILIAR'] === '1',
         FormularioPrincipal: record['FORMULARIO_PRINCIPAL'] === '1',
         Observaciones: record.OBSERVACIONES,
         FechaGeneracion: new Date(),
         FechaCarga: new Date(),
         Actualiazado: actualizado,
         errores: err,
      },
   });
};
