import { Request, Response } from 'express';
import { prismaClient } from '../../server';
import { NotFoundException } from '../../exceptions/not-found';
import { ErrorCode } from '../../exceptions/root';
import { BadRequestsException } from '../../exceptions/bad-requests';
import { parseCsv, parseExcel } from '../../utils/fileProcessors';

import { processPolicyData } from '../../services/carga/policy/policyProcessor';
import { anuladaProcessor } from '../../services/carga/anuladas/anuladaProcessor';
import { processDigitalSignatureData } from '../../services/carga/digitalSignature/digitalSignatureProcessor';
import { processTabletData } from '../../services/carga/tablets/tabletProcessor';
import { TIPO_CARGA } from '@prisma/client';
import { RecordDiaria } from '../../interfaces/contractsInterfaces';

export const getLoadLogs = async (req: Request, res: Response) => {
   const { type } = req.query;
   const loadLogs = await prismaClient.logCarga.findMany({
      where: {
         ...(type && type !== ''
            ? {
                 Tipo: type as TIPO_CARGA,
              }
            : {}),
      },
      orderBy: {
         createdAt: 'desc', // Ordena por la columna createdAt en orden descendente
      },
   });

   res.json(loadLogs);
};

export const importData = async (req: Request, res: Response) => {
   if (!req.file && req.body.type != 'reload') {
      throw new BadRequestsException('File is required', ErrorCode.BAD_REQUEST_EXCEPTION);
   }

   if (!req.body.type) {
      throw new BadRequestsException('Type is required', ErrorCode.BAD_REQUEST_EXCEPTION);
   }

   let records: any[] = [];
   if (req.file)
      if (req.file.mimetype === 'text/csv' || req.file.mimetype === 'text/plain') {
         records = await parseCsv(req.file);
      } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
         records = await parseExcel(req.file);
      } else {
         throw new Error('Unsupported file format');
      }

   //@ts-ignore
   const user = req.user;
   let processedData = null;
   let result = null;
   switch (req.body.type) {
      case 'policy': {
         const contracts: RecordDiaria[] = records.map((d) => {
            return {
               Compania: d['COMPAÑÍA'],
               Producto: d['PRODUCTO'],
               Mediador: d['MEDIADOR'],
               Operador: d['OPERADOR'],

               CCC: d['CCC'],
               CodigoSolicitud: d['CODIGO SOLICITUD'],
               CodigoPoliza: d['POLIZA_CONTRATO'],

               TipoOperacion: d['TIPO DE OPERACIÓN'],

               AnuladoSEfecto: d['ANULADO SIN EFECTO'],

               DNIAsegurado: d['ID_ASEGURADO'],
               NombreAsegurado: d['NOMBRE ASEGURADO'],
               FechaNacimientoAsegurado: d['FECHA DE NACIMIENTO'],
               DeporteAsegurado: d['DEPORTE'],
               ProfesionAsegurado: d['PROFESION'],

               DNITomador: d['ID_TOMADOR_PARTICIPE'],
               NombreTomador: d['NOMBRE TOMADOR_PARTICIPE'],
               FechaValidezDNITomador: d['FECHA VALIDEZ IDENTIDAD TOMADOR'],

               FechaEfecto: d['FECHA EFECTO'],
               FechaOperacion: d['FECHA DE OPERACIÓN'],

               CSRespAfirmativas: d['CS CON RESPUESTAS AFIRMATIVAS'],

               IndicadorFDPRECON: d['INDICADOR FIRMA DIGITAL PRECON'],
               TipoEnvioPRECON: d['TIPO DE ENVÍO PRECON'],
               ResultadoFDPRECON: d['RESULTADO FIRMA DIGITAL PRECON'],

               IndicadorFDCON: d['INDICADOR FIRMA DIGITAL CON'],
               TipoEnvioCON: d['TIPO DE ENVÍO CON'],
               ResultadoFDCON: d['RESULTADO FIRMA DIGITAL CON'],

               Suplemento: d['SUPLEMENTO'],
               Revisar: d['REVISAR'],
               Conciliar: d['CONCILIAR'],
            };
         });
         processedData = await processPolicyData(contracts, user);
         const { Actualizados, Insertados, TotalRegistros, Desechados, conError, details, revisarCont } = processedData;
         const policyLogAction = await prismaClient.logAccion.create({
            data: {
               Accion: 'CARGA',
               Usuario: { connect: { UsuarioId: user.UsuarioId } },
            },
         });

         result = await prismaClient.logCarga.create({
            data: {
               TotalRegistros,
               revisarCont,
               Actualizados,
               Insertados,
               ConError: conError,
               Desechados,
               Tipo: 'POLIZA',
               LogAccion: { connect: { LogId: policyLogAction.LogId } },
               Details: JSON.stringify(details),
            },
         });

         break;
      }
      case 'digitalSignature': {
         const { actualizados, totalRegistros, details, Desechados } = await processDigitalSignatureData(records, user);

         const digitalSignatureLogAction = await prismaClient.logAccion.create({
            data: {
               Accion: 'UPDATE_CARGA',

               Usuario: {
                  connect: {
                     UsuarioId: user.UsuarioId,
                  },
               },
            },
         });

         result = await prismaClient.logCarga.create({
            data: {
               Tipo: 'DIGITAL',
               LogAccion: {
                  connect: {
                     LogId: digitalSignatureLogAction.LogId,
                  },
               },
               Actualizados: actualizados,
               TotalRegistros: totalRegistros,
               Details: JSON.stringify(details),
               Desechados,
            },
         });
         break;
      }
      case 'tablet': {
         const { actualizados, Desechados, details } = await processTabletData(records, user);

         const tabletLogAction = await prismaClient.logAccion.create({
            data: {
               Accion: 'UPDATE_CARGA',
               Usuario: {
                  connect: {
                     UsuarioId: user.UsuarioId,
                  },
               },
            },
         });

         result = await prismaClient.logCarga.create({
            data: {
               Tipo: 'TABLETA',
               Actualizados: actualizados,
               TotalRegistros: records.length,
               Details: JSON.stringify(details),
               Desechados,
               LogAccion: {
                  connect: {
                     LogId: tabletLogAction.LogId,
                  },
               },
            },
         });
         break;
      }

      case 'reload': {
         console.log(req.body);
         processedData = await processPolicyData(req.body.data, user);
         const { Actualizados, Insertados, TotalRegistros, Desechados, conError, details, revisarCont } = processedData;
         const policyLogAction = await prismaClient.logAccion.create({
            data: {
               Accion: 'RELOAD',
               Usuario: { connect: { UsuarioId: user.UsuarioId } },
            },
         });

         result = await prismaClient.logCarga.create({
            data: {
               TotalRegistros,
               revisarCont,
               Actualizados,
               Insertados,
               ConError: conError,
               Desechados,
               Tipo: 'POLIZA',
               LogAccion: { connect: { LogId: policyLogAction.LogId } },
               Details: JSON.stringify(details),
            },
         });

         break;
      }

      case 'anuladas':
         {
            const { actualizados, details, Desechados } = await anuladaProcessor(records, user);
            const tabletLogAction = await prismaClient.logAccion.create({
               data: {
                  Accion: 'UPDATE_CARGA',
                  Usuario: {
                     connect: {
                        UsuarioId: user.UsuarioId,
                     },
                  },
               },
            });

            result = await prismaClient.logCarga.create({
               data: {
                  Tipo: 'ANULADA',
                  Actualizados: actualizados,
                  TotalRegistros: records.length,
                  Details: JSON.stringify(details),
                  Desechados: Desechados,
                  LogAccion: {
                     connect: {
                        LogId: tabletLogAction.LogId,
                     },
                  },
               },
            });
         }

         break;
   }

   res.status(200).json({ result });
};

export const getLoadLogById = async (req: Request, res: Response) => {
   try {
      const logCarga = await prismaClient.logCarga.findFirstOrThrow({
         where: {
            LogCargaId: parseInt(req.params.id),
         },
      });
      res.json(logCarga);
   } catch (error) {
      throw new NotFoundException('logCarga not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }
};

export const deleteLoadLog = async (req: Request, res: Response) => {
   try {
      await prismaClient.logCarga.findFirstOrThrow({
         where: {
            LogCargaId: parseInt(req.params.id),
         },
      });
   } catch (error) {
      throw new NotFoundException('logCarga not found', ErrorCode.NOT_FOUND_EXCEPTION);
   }

   await prismaClient.logCarga.delete({
      where: {
         LogCargaId: parseInt(req.params.id),
      },
   });

   res.json({ message: 'deleted' });
};
