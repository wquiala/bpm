import { Request, Response } from 'express';
import { prismaClient } from '../../server';
import { NotFoundException } from '../../exceptions/not-found';
import { ErrorCode } from '../../exceptions/root';
import { BadRequestsException } from '../../exceptions/bad-requests';
import { parseCsv, parseExcel } from '../../utils/fileProcessors';
import { LogActionsEnum } from '../../constants/LogActionsEnum';
import { LogCargaTypeEnum } from '../../constants/LogCargaTypeEnum';
import { processPolicyData } from '../../services/carga/policy/policyProcessor';
import { anuladaProcessor } from '../../services/carga/anuladas/anuladaProcessor';
import { processDigitalSignatureData } from '../../services/carga/digitalSignature/digitalSignatureProcessor';
import { processTabletData } from '../../services/carga/tablets/tabletProcessor';
import { TIPO_CARGA } from '@prisma/client';
import { json } from 'stream/consumers';
import { Record } from '../../interfaces/contractsInterfaces';

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
   });

   res.json(loadLogs);
};

export const importData = async (req: Request, res: Response) => {
   if (!req.file) {
      throw new BadRequestsException('File is required', ErrorCode.BAD_REQUEST_EXCEPTION);
   }

   if (!req.body.type) {
      throw new BadRequestsException('Type is required', ErrorCode.BAD_REQUEST_EXCEPTION);
   }

   let data: any[] = [];
   if (req.file.mimetype === 'text/csv' || req.file.mimetype === 'text/plain') {
      data = await parseCsv(req.file);
   } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      data = await parseExcel(req.file);
   } else {
      throw new Error('Unsupported file format');
   }
   const records: Record[] = data.map((d) => {
      return {
         compania: d['COMPAÑÍA'],
         producto: d['PRODUCTO'],
         mediador: d['MEDIADOR'],
         operador: d['OPERADOR'],

         ccc: d['CCC'],
         codigoSolicitud: d['CODIGO SOLICITUD'],
         polizaContrato: d['POLIZA_CONTRATO'],

         tipoOperacion: d['TIPO DE OPERACIÓN'],

         anulaSE: d['ANULADO SIN EFECTO'],

         dniAsegurado: d['ID_ASEGURADO'],
         nombreAsegurado: d['NOMBRE ASEGURADO'],
         fechaNacimiento: d['FECHA DE NACIMIENTO'],
         deporte: d['DEPORTE'],
         profesion: d['PROFESION'],

         dniTomador: d['ID_TOMADOR_PARTICIPE'],
         nombreTomador: d['NOMBRE TOMADOR_PARTICIPE'],
         fechaValidezDniT: d['FECHA VALIDEZ IDENTIDAD TOMADOR'],

         fechaEfecto: d['FECHA EFECTO'],
         fechaOperacion: d['FECHA DE OPERACIÓN'],

         csResAfirm: d['CS CON RESPUESTAS AFIRMATIVAS'],

         indicadorPrecon: d['INDICADOR FIRMA DIGITAL PRECON'],
         tipoEnvioPrecon: d['TIPO DE ENVÍO PRECON'],
         resultadoPrecon: d['RESULTADO FIRMA DIGITAL PRECON'],

         indicadorCon: d['INDICADOR FIRMA DIGITAL CON'],
         tipoEnvioC: d['TIPO DE ENVÍO CON'],
         resultadoCon: d['RESULTADO FIRMA DIGITAL CON'],

         suplemento: d['SUPLEMENTO'],
         revisar: d['REVISAR'],
         conciliar: d['CONCILIAR'],
      };
   });
   //@ts-ignore
   const user = req.user;
   let processedData = null;
   let result = null;
   switch (req.body.type) {
      case 'policy': {
         processedData = await processPolicyData(records, user);
         /* const { Actualizados, Insertados, TotalRegistros, Desechados, conError, details } = processedData;

         const policyLogAction = await prismaClient.logAccion.create({
            data: {
               Accion: 'CARGA',
               Usuario: { connect: { UsuarioId: user.UsuarioId } },
            },
         });

         result = await prismaClient.logCarga.create({
            data: {
               TotalRegistros,
               Actualizados,
               Insertados,
               ConError: conError,
               Desechados,
               Tipo: 'POLIZA',
               LogAccion: { connect: { LogId: policyLogAction.LogId } },
               Details: JSON.stringify(details),
            },
         });

         res.json({
            Desechados,
            Insertados,
            Actualizados,
            conError,
            TotalRegistros,
         }); */

         break;
      }
      case 'digitalSignature': {
         const { RegistrosError, actualizados, noactualizados, totalRegistros, details } =
            await processDigitalSignatureData(records, user);

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
               ConError: RegistrosError,
               TotalRegistros: totalRegistros,
               Details: JSON.stringify(details),
            },
         });
         break;
      }
      case 'tablet': {
         const { actualizados, noactualizados, RegistrosError, details } = await processTabletData(records, user);

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
               ConError: RegistrosError,
               TotalRegistros: records.length,
               Details: JSON.stringify(details),
               LogAccion: {
                  connect: {
                     LogId: tabletLogAction.LogId,
                  },
               },
            },
         });
         break;
      }
      case 'anuladas': {
         const { actualizados, noactualizados, conError } = await anuladaProcessor(records, user);
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
               ConError: conError,
               TotalRegistros: records.length,
               Details: `${noactualizados} registros no se encontraron`,
               LogAccion: {
                  connect: {
                     LogId: tabletLogAction.LogId,
                  },
               },
            },
         });
      }
      default:
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
