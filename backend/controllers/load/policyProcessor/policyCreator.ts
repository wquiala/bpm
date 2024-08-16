import { ContractDocumentStatusesEnum } from './../../../constants/ContractDocumentStatusesEnum';
import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import moment from 'moment';
import { array, record } from 'zod';
import {
      ContractHistoryData,
      ContractUpdate,
      Contrato,
      ErroresContrato,
      ESTADO_CONTRATO,
      OPERACION_CONTRATO,
} from '../../../interfaces/contractsInterfaces';
import { validateCompany } from './policiyValidator';
import { updatePolicy } from './policyUpdater';
import { Company } from '../../../interfaces/company';

const fetchCompany = async (code: string, err: ErroresContrato /* errors?: string[] */) => {
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

      if (query!) {
            comp = query!;
      } else {
            comp = prismaClient.compania.findFirst({
                  where: { Nombre: 'Sin Compania' },
            });

            err['COMPAÑÍA']
                  ? (err['COMPAÑÍA'] +=
                          '. Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, se asignará un código de compañia temporal')
                  : (err['COMPAÑÍA'] =
                          'Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, se asignará un código de compañia temporal');
      }

      return comp;
};

export const fetchClave = (record: any) => {
      let clave: string;
      const CCC = record['CCC'];
      const SOLICITUD = record['CODIGO SOLICITUD'];
      const CONTRATO = record['POLIZA_CONTRATO'];

      if (record['COMPAÑÍA'] == 'UCV') {
            clave = CCC;
      } else if (CONTRATO) {
            clave = CONTRATO;
      } else clave = SOLICITUD;

      return clave;
};

export const fetchContrato = async (record: any, clave: string) => {
      let solicitud;
      let id;
      let newClave: string | null = null;
      let query;
      let actualizar = false;

      if (clave == record['POLIZA_CONTRATO']) {
            query = await prismaClient.contrato.findFirst({
                  where: { ClaveOperacion: record['POLIZA_CONTRATO'] },
            });

            if (query != null) {
                  actualizar = true;
            } else {
                  query = await prismaClient.contrato.findFirst({
                        where: { ClaveOperacion: record['CODIGO SOLICITUD'] },
                  });

                  if (query != null) {
                        solicitud = true;
                        actualizar = true;
                  }
            }
      } else if (clave == record['CODIGO SOLICITUD']) {
            query = await prismaClient.contrato.findFirst({
                  where: { ClaveOperacion: record['CODIGO SOLICITUD'] },
            });

            if (query != null) {
                  actualizar = true;
            }
      } else {
            query = await prismaClient.contrato.findFirst({
                  where: { ClaveOperacion: record['CCC'] },
            });
            if (query != null) {
                  actualizar = true;
            }
      }

      return {
            query,
            actualizar,
            solicitud,
      };
};

const fetchBranch = async (code: string /* errors?: string[] */, err: ErroresContrato) => {
      let producto;

      const query = await prismaClient.producto.findFirst({
            where: { Codigo: code },
      });

      if (query) {
            producto = query;
      } else {
            producto = await prismaClient.producto.findFirst({
                  where: { Codigo: 'Sin Producto' },
            });

            err['PRODUCTO']
                  ? (err['PRODUCTO'] +=
                          '. El producto no se encuentra registrado en la tabla maestra de productos del sistema, se asignará un código de producto temporal')
                  : (err['PRODUCTO'] =
                          'El producto no se encuentra registrado en la tabla maestra de productos del sistema, se asignará un código de producto temporal');
      }
      return producto;
};

const fetchMediator = async (code: string, /*  errors?: string[] */ err: ErroresContrato) => {
      let mediador;
      const query = await prismaClient.mediador.findFirst({
            where: { Codigo: code },
      });

      if (query) {
            mediador = query;
      } else {
            mediador = await prismaClient.mediador.findFirst({
                  where: { Codigo: 'Sin Mediador' },
            });

            err['MEDIADOR']
                  ? (err['MEDIADOR'] +=
                          '. El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal')
                  : (err['MEDIADOR'] =
                          'El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal');
      }
      return mediador;
};
export const policyCreator = async (
      record: any,
      systemUser: Usuario,
      user: { UsuarioId: number },
      /* errors: string[] */
      err: any,
) => {
      let conError = 0;
      let hasError;
      let insert: boolean;

      const company = await fetchCompany(record['COMPAÑÍA'], err);

      const branch = await fetchBranch(record['PRODUCTO'], err);

      const mediator = await fetchMediator(record['MEDIADOR'], err);
      const clave = fetchClave(record);

      const { actualizar, query, solicitud } = await fetchContrato(record, clave);

      const CONTRATO = record['POLIZA_CONTRATO'];
      if (actualizar) {
            console.log('Voy a actualizar');
            /*             const errors = query!.errores;
             */ const data: ContractUpdate = {
                  EstadoContrato: ESTADO_CONTRATO.PENDIENTE_INCIDENCIA,

                  CompaniaId:
                        query!.CompaniaId == 5 && company?.CompaniaId != 5 ? company!.CompaniaId! : query!!.CompaniaId!,
                  ProductoId:
                        query!.ProductoId == 191 && branch?.ProductoId != 191 ? branch!.ProductoId : query!.ProductoId!,
                  FechaOperacion:
                        !query!.FechaOperacion && record['FECHA DE OPERACIÓN']
                              ? new Date(moment(record['FECHA DE OPERACIÓN'], 'MM/DD/YYYY', true).toISOString())
                              : query!.FechaOperacion,
                  CodigoPoliza:
                        !query!.CodigoPoliza && record['POLIZA_CONTRATO']
                              ? record['POLIZA_CONTRATO']
                              : query!.CodigoPoliza,
                  FechaEfecto:
                        !query!.FechaEfecto && record['FECHA EFECTO'] ? record['FECHA EFECTO'] : query!.FechaEfecto,
                  AnuladoSEfecto: query!.AnuladoSEfecto == false && record['ANULADO SIN EFECTO'] === 'S' ? true : false,
                  DNIAsegurado:
                        !query!.DNIAsegurado && record['ID_ASEGURADO'] ? record['ID_ASEGURADO'] : query!.DNIAsegurado,
                  NombreAsegurado:
                        !query!.NombreAsegurado && record['NOMBRE ASEGURADO']
                              ? record['NOMBRE ASEGURADO']
                              : query!.NombreAsegurado,
                  FechaNacimientoAsegurado:
                        !query!.FechaNacimientoAsegurado && record['FECHA DE NACIMIENTO']
                              ? new Date(moment(record['FECHA DE NACIMIENTO'], 'MM/DD/YYYY', true).toISOString())
                              : query!.FechaNacimientoAsegurado,
                  CSRespAfirmativas:
                        !query!.CSRespAfirmativas &&
                        record['CS CON RESPUESTAS AFIRMATIVAS'] &&
                        record['CS CON RESPUESTAS AFIRMATIVAS'] == 'S'
                              ? true
                              : query!.CSRespAfirmativas,

                  ProfesionAsegurado:
                        !query!.ProfesionAsegurado && record['PROFESION']
                              ? record['PROFESION']
                              : query!.ProfesionAsegurado,

                  DeporteAsegurado:
                        !query!.DeporteAsegurado && record['DEPORTE'] ? record['DEPORTE'] : query!.DeporteAsegurado,
                  DNITomador:
                        !query!.DNITomador && record['ID_TOMADOR_PARTICIPE']
                              ? record['ID_TOMADOR_PARTICIPE']
                              : query!.DNITomador,
                  FechaValidezDNITomador:
                        !query!.FechaValidezDNITomador && record['FECHA VALIDEZ IDENTIDAD TOMADOR']
                              ? new Date(
                                      moment(
                                            record['FECHA VALIDEZ IDENTIDAD TOMADOR'],
                                            'MM/DD/YYYY',
                                            true,
                                      ).toISOString(),
                                )
                              : query!.FechaValidezDNITomador,

                  NombreTomador:
                        !query?.NombreTomador && record['NOMBRE TOMADOR_PARTICIPE']
                              ? record['NOMBRE TOMADOR_PARTICIPE']
                              : query!.NombreTomador,

                  MediadorId:
                        query?.MediadorId == 26314 && mediator!.MediadorId != 26314
                              ? mediator!.MediadorId
                              : query?.MediadorId,
                  Operador: !query?.Operador && record['OPERADOR'] ? record['OPERADOR'] : query!.Operador,
                  IndicadorFDPRECON:
                        query?.IndicadorFDPRECON && record['INDICADOR FIRMA DIGITAL PRECON'] === 'SI'
                              ? true
                              : query!.IndicadorFDPRECON,
                  TipoEnvioPRECON:
                        !query!.TipoEnvioPRECON && record['TIPO DE ENVÍO PRECON']
                              ? record['TIPO DE ENVÍO PRECON']
                              : query!.TipoEnvioPRECON,
                  ResultadoFDPRECON:
                        !query!.ResultadoFDPRECON && record['RESULTADO FIRMA DIGITAL PRECON']
                              ? record['RESULTADO FIRMA DIGITAL PRECON']
                              : query!.ResultadoFDPRECON,
                  IndicadorFDCON:
                        !query!.IndicadorFDCON && record['INDICADOR FIRMA DIGITAL CON'] === 'SI'
                              ? true
                              : query!.IndicadorFDCON,
                  TipoEnvioCON:
                        !query!.TipoEnvioCON && record['TIPO DE ENVÍO CON']
                              ? record['TIPO DE ENVÍO CON']
                              : query!.TipoEnvioCON,
                  ResultadoFDCON:
                        !query!.ResultadoFDCON && record['RESULTADO FIRMA DIGITAL CON']
                              ? record['RESULTADO FIRMA DIGITAL CON']
                              : query!.ResultadoFDCON,
                  Revisar: record['REVISAR'] === 'SI',
                  Conciliar: record['CONCILIAR'] === 'SI',
                  errores: err,
            };

            if (solicitud) data.ClaveOperacion = CONTRATO;

            const updated = await updatePolicy(data, query!.ContratoId);
            insert = false;

            const { CompaniaId, ProductoId, CodigoPoliza, MediadorId, ClaveOperacion, ...rest } = data;
            const histC: ContractHistoryData = rest;

            const history = await createContractHistory({
                  ...histC,
                  Operacion: OPERACION_CONTRATO.ACTUALIZADO,
                  EstadoContrato: ESTADO_CONTRATO.PENDIENTE_INCIDENCIA,
            });
      } else {
            const createdContract = await createContract(record, company, branch, mediator, user, err, clave);
            insert = true;

            if (createdContract?.ResultadoFDCON === 'Transacción aceptada' && createdContract?.IndicadorFDCON) {
                  await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, false);
                  //await handlePreLoadConciliation(createdContract);
            } else if (
                  (createdContract?.ResultadoFDCON !== 'Transacción aceptada' && createdContract?.IndicadorFDCON) ||
                  (createdContract?.IndicadorFDPRECON && createdContract?.ResultadoFDPRECON === 'Transacción aceptada')
            ) {
                  await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, true);
                  await handlePreLoadConciliation(createdContract);
            } else {
                  await handleIncidences(createdContract, systemUser);
            }

            const {
                  CompaniaId,
                  ProductoId,
                  CodigoSolicitud,
                  Suplemento,
                  CCC,
                  Activo,
                  ClaveOperacion,
                  EstadoContrato,
                  CodigoPoliza,
                  MediadorId,
                  TipoOperacion,
                  updatedAt,
                  Producto,
                  ...data
            } = createdContract;

            const dataH: ContractHistoryData = data;

            await createContractHistory(dataH, OPERACION_CONTRATO.INSERTADO, ESTADO_CONTRATO.PENDIENTE);
      }

      for (const key in err) {
            if (err.hasOwnProperty(key)) {
                  const value = err[key];
                  if (value) {
                        hasError = true;
                        conError++;
                  }
            }
            if (conError > 0) break;
      }

      return {
            hasError,
            insert,
      };
};

export const NoProcesar = async (data: any) => {
      return prismaClient.noProcesar.create({
            data: {
                  ...data,
            },
      });
};

export const createContractHistory = async (
      data: ContractHistoryData,
      Operacion?: OPERACION_CONTRATO,
      EstadoContrato?: ESTADO_CONTRATO,
) => {
      const { ContratoId, ...rest } = data;

      return ContratoId
            ? await prismaClient.historialContrato.create({
                    data: {
                          Contrato: { connect: { ContratoId: ContratoId } },
                          Operacion,
                          EstadoContrato,
                          ...rest,
                    },
                    include: {
                          Contrato: true,
                    },
              })
            : await prismaClient.historialContrato.create({
                    data: {
                          ...rest,
                    },
              });
};

const createContract = async (
      record: any,
      company: Company | null,
      branch: any,
      mediator: any,
      user: { UsuarioId: any },
      /* errors: string[], */
      err: any,
      claveOPeracion: string,
) => {
      console.log(record);
      return prismaClient.contrato.create({
            data: {
                  Compania: { connect: { CompaniaId: company?.CompaniaId } },
                  Producto: { connect: { ProductoId: branch?.ProductoId } },
                  Mediador: { connect: { MediadorId: mediator.MediadorId } },
                  EstadoContrato: ESTADO_CONTRATO.PENDIENTE,
                  ClaveOperacion: claveOPeracion,
                  FechaOperacion: record['FECHA DE OPERACIÓN']
                        ? new Date(moment(record['FECHA DE OPERACIÓN'], 'MM/DD/YYYY', true).toISOString())
                        : null,
                  CCC: record['CCC'] ?? null,
                  CodigoSolicitud: record['CODIGO SOLICITUD'] ?? null,
                  CodigoPoliza: record['POLIZA_CONTRATO'] ?? null,
                  FechaEfecto: record['FECHA EFECTO']
                        ? new Date(moment(record['FECHA EFECTO'], 'MM/DD/YYYY', true).toISOString())
                        : null,
                  AnuladoSEfecto: record['ANULADO SIN EFECTO'] === 'S',
                  DNIAsegurado: record['ID_ASEGURADO'],
                  NombreAsegurado: record['NOMBRE ASEGURADO'],
                  FechaNacimientoAsegurado: record['FECHA DE NACIMIENTO']
                        ? new Date(moment(record['FECHA DE NACIMIENTO'], 'MM/DD/YYYY', true).toISOString())
                        : null,
                  CSRespAfirmativas:
                        record['CS CON RESPUESTAS AFIRMATIVAS'] && record['CS CON RESPUESTAS AFIRMATIVAS'] == 'S'
                              ? true
                              : false,
                  ProfesionAsegurado: record['PROFESION'] ?? null,
                  DeporteAsegurado: record['DEPORTE'] ?? null,
                  DNITomador: record['ID_TOMADOR_PARTICIPE'],
                  NombreTomador: record['NOMBRE TOMADOR_PARTICIPE'],
                  FechaValidezDNITomador:
                        record['FECHA VALIDEZ IDENTIDAD TOMADOR'] && record['FECHA VALIDEZ IDENTIDAD TOMADOR'] !== ''
                              ? new Date(
                                      moment(
                                            record['FECHA VALIDEZ IDENTIDAD TOMADOR'],
                                            'MM/DD/YYYY',
                                            true,
                                      ).toISOString(),
                                )
                              : null,
                  Operador: record['OPERADOR'] ?? null,
                  IndicadorFDPRECON: record['INDICADOR FIRMA DIGITAL PRECON'] === 'SI',
                  TipoEnvioPRECON: record['TIPO DE ENVÍO PRECON'] ?? null,
                  ResultadoFDPRECON: record['RESULTADO FIRMA DIGITAL PRECON'] ?? null,
                  IndicadorFDCON: record['INDICADOR FIRMA DIGITAL CON'] === 'SI',
                  TipoEnvioCON: record['TIPO DE ENVÍO CON'] ?? null,
                  ResultadoFDCON: record['RESULTADO FIRMA DIGITAL CON'] ?? null,
                  Revisar: record['REVISAR'] === 'SI',
                  Conciliar: record['CONCILIAR'] === 'SI',
                  Suplemento: (record['SUPLEMENTO'] && parseInt(record['SUPLEMENTO']) === 1) ?? false,
                  errores: err,
            },
            include: {
                  Producto: {
                        include: {
                              ProductoTipoOperacion: {
                                    include: {
                                          ProductoDocumento: {
                                                include: {
                                                      MaestroDocumento: true,
                                                },
                                          },
                                    },
                              },
                        },
                  },
            },
      });
};

const createDocuments = async (createdContract: any, systemUser: Usuario, status: string, forPrecon: boolean) => {
      for (const productoTipoOperacion of createdContract.Producto.ProductoTipoOperacion) {
            for (const productoDocumento of productoTipoOperacion.ProductoDocumento) {
                  if ((forPrecon && productoDocumento.Fase === 'PRECON') || !forPrecon) {
                        await prismaClient.documentoContrato.create({
                              data: {
                                    Contrato: {
                                          connect: {
                                                ContratoId: createdContract.ContratoId,
                                          },
                                    },
                                    MaestroDocumentos: {
                                          connect: {
                                                DocumentoId: productoDocumento.MaestroDocumento.TipoDocumentoId,
                                          },
                                    },
                                    Usuario: {
                                          connect: {
                                                UsuarioId: systemUser?.UsuarioId,
                                          },
                                    },
                                    EstadoDoc: status,
                              },
                        });
                  }
            }
      }
};

const handlePreLoadConciliation = async (createdContract: any) => {
      const preLoadConciliation = await prismaClient.tipoConciliacion.findFirst({
            where: { nombre: 'Carga previa' },
      });

      if (preLoadConciliation) {
            await prismaClient.contrato.update({
                  where: { ContratoId: createdContract.ContratoId },
                  data: {
                        TipoConciliacion: {
                              connect: {
                                    tipoConciliacioId: preLoadConciliation?.tipoConciliacioId,
                              },
                        },
                  },
            });
      }
};

const handleIncidences = async (createdContract: any, systemUser: Usuario) => {
      for (const ramoTipoOperacion of createdContract.Producto.RamoTipoOperacion) {
            for (const ramoDocumento of ramoTipoOperacion.RamoDocumento) {
                  const documentoContrato = await prismaClient.documentoContrato.create({
                        data: {
                              Contrato: {
                                    connect: {
                                          ContratoId: createdContract.ContratoId,
                                    },
                              },
                              MaestroDocumentos: {
                                    connect: {
                                          DocumentoId: ramoDocumento.MaestroDocumento.TipoDocumentoId,
                                    },
                              },
                              Usuario: {
                                    connect: {
                                          UsuarioId: systemUser?.UsuarioId,
                                    },
                              },
                              EstadoDoc: ContractDocumentStatusesEnum.NOT_PRESENT,
                        },
                  });

                  const notFoundIncidence = await prismaClient.maestroIncidencias.findFirst({
                        where: {
                              DocAsociadoId: ramoDocumento.MaestroDocumento.DocumentoId,
                              Nombre: { contains: 'no se ha recibido' },
                        },
                  });

                  if (notFoundIncidence) {
                        await prismaClient.incidenciaDocumento.create({
                              data: {
                                    Usuario: {
                                          connect: {
                                                UsuarioId: systemUser?.UsuarioId,
                                          },
                                    },
                                    DocumentoContrato: {
                                          connect: {
                                                DocumentoId: documentoContrato.DocumentoId,
                                          },
                                    },
                                    MaestroIncidencias: {
                                          connect: {
                                                IncidenciaId: notFoundIncidence.IncidenciaId,
                                          },
                                    },
                                    Contrato: {},
                              },
                        });
                  }
            }
      }
};
