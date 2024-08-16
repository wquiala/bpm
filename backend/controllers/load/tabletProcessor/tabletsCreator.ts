import moment from 'moment';
import { TabletaRecord } from '../../../interfaces/contractsInterfaces';
import { prismaClient } from '../../../server';

export const tabletsCreator = async (record: any) => {
      console.log(record);
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
                  FechaGrabacion: new Date(moment(record.FECHA_GRABACION, 'MM/DD/YYYY', true).toISOString()),
                  DNIAsegurado: record.NUM_IDENTIFICACION_ASE,
                  NombreAsegurado: record.NOMBRE_ASE,
                  NumIdentificacionTo: record.NUM_IDENTIFICACION_TO,
                  NombreTo: record.NOMBRE_TO,
                  CodigoMediador: record.CODIGO_MEDIADOR,
                  NombreMediador: record.NOMBRE_MEDIADOR,
                  CodigoSubmediador: record.CODIGO_SUBMEDIADOR,
                  NombreSubMediador: record.NOMBRE_SUBMEDIADOR,
                  CCC: record.CCC,
                  FechaOperacion: new Date(moment(record.FECHA_OPERACION, 'MM/DD/YYYY', true).toISOString()),
                  FechaActualizacion: new Date(moment(record.FECHA_ACTUALIZACION, 'MM/DD/YYYY', true).toISOString()),
                  DescOperacion: record.DESC_OPERACION,
                  TipoRegistro: record.TIPO_REGISTRO,
                  CodigoInternoFormulario: record.CODIGO_INTERNO_FORMULARIO,
                  DescFormulario: record.DESC_FORMULARIO,
                  TipoFirma: record.TIPO_FIRMA,
                  FechaFirma: new Date(moment(record.FECHA_FIRMA, 'MM/DD/YYYY', true).toISOString()),
                  SituacionFirma: record.SITUACION_FIRMA,
                  CanalMediador: record.CANAL_MEDIADOR,
                  CanalRecepcionFirma: record.CANAL_RECEPCION_FIRMA,
                  CodigoCentro: record.CODIGO_CENTRO,
                  NumActualizaciones: Number(record.NUM_ACTUALIZACIONES),
                  Usuario: record.USUARIO,
                  Conciliar: record['CONCILIAR'] === '1',
                  FormularioPrincipal: record['FORMULARIO_PRINCIPAL'] === '1',
                  Observaciones: record.OBSERVACIONES,
                  FechaGeneracion: new Date(moment(record.FECHA_GENERACION, 'MM/DD/YYYY', true).toISOString()),
                  FechaCarga: new Date(moment(record.FECHA_CARGA, 'MM/DD/YYYY', true).toISOString()),
            },
      });
};
