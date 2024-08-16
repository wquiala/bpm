import { FirmaDigital } from '@prisma/client';
import { prismaClient } from '../../../server';
import moment from 'moment';

export const digitalSignature = (records: any) => {
      return prismaClient.firmaDigital.create({
            data: {
                  AnnoMes: records['AÑO/MES'],
                  NumPoliza: records['NUM_POLIZA'],
                  CodigoPolizaTc: records['CODIGO_POLIZA_TC'],
                  EstadoPoliza: records['ESTADO_POLIZA'],
                  TIPO_ENVIO: records['TIPO_ENVIO'],
                  Estado: records['ESTADO'],
                  Resultado: records['RESULTADO'],
                  FechaInicio: new Date(moment(records['FECHA_INICIO'], 'MM/DD/YYYY', true).toISOString()),
                  FechaCierre: new Date(moment(records['FECHA_CIERRE'], 'MM/DD/YYYY', true).toISOString()),
                  Mediador: records['MEDIADOR'],
                  DNIAsegurado: records['DNI_ASEGURADO'],
                  NombreAsegurado: records['ASEGURADO'],
                  MovilAsegurado: Number(records['MOVIL_ASEGURADO']),
                  DNITomador: records['DNI_TOMADOR'],
                  MovilTomador: Number(records['MOVIL_TOMADOR']),
                  NombreTomador: records['TOMADOR'],
            },
      });
};
