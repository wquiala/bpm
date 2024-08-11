import { ContractDocumentStatusesEnum } from './../../../constants/ContractDocumentStatusesEnum';
import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import moment from 'moment';
import { array, record } from 'zod';
import { ContractHistoryData, Contrato } from '../../../interfaces/contractsInterfaces';
import { validateCompany } from './policiyValidator';
import { updateContract } from '../../contract';

const fetchCompany = async (code: string, errors?: string[]) => {
      let companyCode = code;
      let comp;

      if (code == 'UCV') {
            companyCode = 'UNI';
      } else if (code == 'AVP') {
            companyCode = 'SLS';
      }

      const query = prismaClient.compania.findFirst({
            where: { Nombre: companyCode },
      });

      if (query) {
            comp = query;
      } else {
            comp = prismaClient.compania.findFirst({
                  where: { Nombre: 'Sin Compania' },
            });
            errors?.push(
                  'Esta compañia no se encuentra registrada en la tabla maestra de compañias del sistema, se asignará un código de compañia temporal',
            );
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

export const fetchContrato = async (clave: string) => {
      return await prismaClient.contrato.findFirst({
            where: { ClaveOperacion: clave },
      });
};
const fetchBranch = async (code: string, errors?: string[]) => {
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
            errors?.push(
                  'El producto no se encuentra registrado en la tabla maestra de productos del sistema, se asignará un código de producto temporal',
            );
      }
      return producto;
};

const fetchMediator = async (code: string, errors?: string[]) => {
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
            errors?.push(
                  'El mediador no se encuentra registrado en la tabla maestra de mediadores del sistema, se asignará un código de mediador temporal',
            );
      }
      return mediador;
};
export const policyCreator = async (
      clave: string,
      record: any,
      systemUser: Usuario,
      user: { UsuarioId: any },
      errors: string[],
) => {
      const company = await fetchCompany(record['COMPAÑÍA'], errors);

      const branch = await fetchBranch(record['PRODUCTO'], errors);

      const mediator = await fetchMediator(record['MEDIADOR'], errors);

      const createdContract = await createContract(record, company, branch, mediator, user, errors, clave);

      /* if (createdContract?.ResultadoFDCON === 'Transacción aceptada' && createdContract?.IndicadorFDCON) {
        await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, false);
        await handlePreLoadConciliation(createdContract);
    } else if ((createdContract?.ResultadoFDCON !== 'Transacción aceptada' && createdContract?.IndicadorFDCON) ||
        (createdContract?.IndicadorFDPRECON && createdContract?.ResultadoFDPRECON === 'Transacción aceptada')) {
        await createDocuments(createdContract, systemUser, ContractDocumentStatusesEnum.CORRECT, true);
        await handlePreLoadConciliation(createdContract);
    } else {
        await handleIncidences(createdContract, systemUser);
    } */
};

export const NoProcesar = async (data: any) => {
      return prismaClient.noProcesar.create({
            data: {
                  ...data,
            },
      });
};

export const createContractHistory = async (data: ContractHistoryData) => {
      const { ContratoId, ...rest } = data;

      return ContratoId
            ? prismaClient.historialContrato.create({
                    data: {
                          Contrato: { connect: { ContratoId: ContratoId } },
                          ...rest,
                    },
                    include: {
                          Contrato: false,
                    },
              })
            : prismaClient.historialContrato.create({
                    data: {
                          ...rest,
                    },
              });
};

const createContract = async (
      record: any,
      company: any,
      branch: any,
      mediator: any,
      user: { UsuarioId: any },
      errors: string[],
      claveOPeracion: string,
) => {
      return prismaClient.contrato.create({
            data: {
                  Compania: { connect: { CompaniaId: company.CompaniaId } },
                  Producto: { connect: { ProductoId: branch.ProductoId } },
                  Mediador: { connect: { MediadorId: mediator.MediadorId } },
                  ClaveOperacion: claveOPeracion,
                  FechaOperacion:
                        new Date(moment(record['FECHA DE OPERACIÓN'], 'MM/DD/YYYY', true).toISOString()) ?? null,
                  CCC: record['CCC'] ?? null,
                  CodigoSolicitud: record['CODIGO SOLICITUD'] ?? null,
                  CodigoPoliza: record['POLIZA_CONTRATO'] ?? null,
                  FechaEfecto: new Date(moment(record['FECHA EFECTO'], 'MM/DD/YYYY', true).toISOString()),
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
                  IndicadorFDPRECON: record['INDICADOR FIRMA DIGITAL PRECON'] === 'SI',
                  TipoEnvioPRECON: record['TIPO ENVIO FIRMA DIGITAL PRECON'] ?? null,
                  ResultadoFDPRECON: record['RESULTADO FIRMA DIGITAL PRECON'] ?? null,
                  IndicadorFDCON: record['INDICADOR FIRMA DIGITAL CON'] === 'SI',
                  TipoEnvioCON: record['TIPO ENVIO FIRMA DIGITAL CON'] ?? null,
                  ResultadoFDCON: record['RESULTADO FIRMA DIGITAL CON'] ?? null,
                  Revisar: record['REVISAR'] === 'SI',
                  Conciliar: record['CONCILIAR'] === 'SI',
                  Suplemento: record['SUPLEMENTO'] && parseInt(record['SUPLEMENTO']) === 1 ? true : false,
                  Incidencias: errors.toString(),
            },
            include: {
                  Producto: {
                        include: {
                              RamoTipoOperacion: {
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
      for (const ramoTipoOperacion of createdContract.Ramo.RamoTipoOperacion) {
            for (const ramoDocumento of ramoTipoOperacion.RamoDocumento) {
                  if ((forPrecon && ramoDocumento.Fase === 'PRECON') || !forPrecon) {
                        await prismaClient.documentoContrato.create({
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
                                    EstadoDoc: status,
                              },
                        });
                  }
            }
      }
};

/* const handlePreLoadConciliation = async (createdContract: any) => {
      const preLoadConciliation = await prismaClient.tipoConciliacion.findFirst({
            where: { Nombre: 'Carga previa' },
      });

      if (preLoadConciliation) {
            await prismaClient.contrato.update({
                  where: { ContratoId: createdContract.ContratoId },
                  data: {
                        TipoConciliacion: {
                              connect: {
                                    TipoConciliacionId: preLoadConciliation?.TipoConciliacionId,
                              },
                        },
                  },4321§234567890--09654212340--0321
            });
      }
}; */

/* const handleIncidences = async (createdContract: any, systemUser: Usuario) => {
      for (const ramoTipoOperacion of createdContract.Ramo.RamoTipoOperacion) {
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
                              DocAsociadoId: ramoDocumento.MaestroDocumento.FamiliaDocumento.FamiliaId,
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
                                    Contrato:{
                                          connect: {

                                          }
                                    }
                              },
                        });
                  }
            }
      }
};
 */
