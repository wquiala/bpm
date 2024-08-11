import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { policyValidator, validateCriticalErrorsToUNI } from './policiyValidator';
import { createContractHistory, fetchClave, fetchContrato, NoProcesar, policyCreator } from './policyCreator';
import { ContractHistoryData } from '../../../interfaces/contractsInterfaces';
import moment from 'moment';

export const processPolicyData = async (records: any[], user: { UsuarioId: any }) => {
      let ErrorLogs: any[] = [];
      let RegistrosOk: number = 0;
      let RegistrosError: number = 0;
      const systemUser = await prismaClient.usuario.findFirst({
            where: {
                  Codigo: '0001',
                  Nombre: 'Sistema',
            },
      });
      for await (let record of records) {
            let hasError = false;
            let errors: any[] = [];
            let errorMsg;
            const claveOPeracion = fetchClave(record);

            if (claveOPeracion === '') {
                  RegistrosError++;
                  const data: ContractHistoryData = {
                        Estado: `Desechada de la compañia ${record['COMPAÑÍA']}`,
                        Operacion: 'DESECHADO',
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
                        ProfesionAsegurado: record['PROFESION'],
                        DeporteAsegurado: record['DEPORTE'],
                        DNITomador: record['ID_TOMADOR_PARTICIPE'],
                        FechaValidezDNITomador:
                              record['FECHA VALIDEZ IDENTIDAD TOMADOR'] &&
                              record['FECHA VALIDEZ IDENTIDAD TOMADOR'] !== ''
                                    ? new Date(
                                            moment(
                                                  record['FECHA VALIDEZ IDENTIDAD TOMADOR'],
                                                  'MM/DD/YYYY',
                                                  true,
                                            ).toISOString(),
                                      )
                                    : null,
                        NombreTomador: record['NOMBRE TOMADOR_PARTICIPE'],
                        Operador: record['OPERADOR'],
                        IndicadorFDPRECON: record['INDICADOR FIRMA DIGITAL PRECON'] === 'SI',
                        TipoEnvioPRECON: record['TIPO DE ENVÍO PRECON'],
                        ResultadoFDPRECON: record['RESULTADO FIRMA DIGITAL PRECON'],
                        IndicadorFDCON: record['INDICADOR FIRMA DIGITAL CON'] === 'SI',
                        TipoEnvioCON: record['TIPO DE ENVÍO CON'],
                        ResultadoFDCON: record['RESULTADO FIRMA DIGITAL CON'],
                        Revisar: record['REVISAR'] === 'SI',
                        Conciliar: record['CONCILIAR'] === 'SI',
                        Incidencias: 'Este contrato no se puede procesar porque no viene identificado',
                  };

                  await NoProcesar(data);
                  data.FechaOperacion =
                        new Date(moment(record['FECHA DE OPERACIÓN'], 'MM/DD/YYYY', true).toISOString()) ?? null;
                  await createContractHistory(data);
                  continue;
                  //
            } else {
                  //const conCriticalError = validateCriticalErrorsToUNI(record);

                  const { hasError: hasErr, errors: err } = await policyValidator(record);

                  if (hasErr) {
                        hasError = true;
                        errors = [...err, ...errors];
                  }

                  if (hasError) {
                        ErrorLogs.push({
                              ...record,
                              errors,
                        });
                        RegistrosError++;
                  } else {
                        RegistrosOk++;
                  }

                  await policyCreator(claveOPeracion, record, systemUser as Usuario, user, errors);
                  const idContrato = await fetchContrato(claveOPeracion);
                  const data: ContractHistoryData = {
                        ContratoId: idContrato!.ContratoId,
                        Estado: idContrato?.EstadoContrato,
                        Operacion: 'INSERTADO',
                        FechaEfecto: idContrato?.FechaEfecto,
                        AnuladoSEfecto: idContrato?.AnuladoSEfecto,
                        DNIAsegurado: idContrato?.DNIAsegurado,
                        NombreAsegurado: idContrato?.NombreAsegurado,
                        FechaNacimientoAsegurado: idContrato?.FechaNacimientoAsegurado,
                        CSRespAfirmativas: idContrato?.CSRespAfirmativas,
                        ProfesionAsegurado: idContrato?.ProfesionAsegurado ?? null,
                        DeporteAsegurado: idContrato?.DeporteAsegurado ?? null,
                        DNITomador: idContrato?.DNITomador,
                        FechaValidezDNITomador: idContrato?.FechaValidezDNITomador,
                        NombreTomador: idContrato?.NombreTomador,
                        Operador: idContrato?.Operador,
                        IndicadorFDPRECON: idContrato?.IndicadorFDPRECON ?? null,
                        TipoEnvioPRECON: idContrato?.TipoEnvioPRECON,
                        ResultadoFDPRECON: idContrato?.ResultadoFDPRECON ?? null,
                        IndicadorFDCON: idContrato?.IndicadorFDCON,
                        TipoEnvioCON: idContrato?.TipoEnvioCON ?? null,
                        ResultadoFDCON: idContrato?.ResultadoFDCON ?? null,
                        Revisar: idContrato?.Revisar,
                        Conciliar: idContrato?.Conciliar,
                        Incidencias: idContrato?.Incidencias,
                  };
                  await createContractHistory(data);
            }
      }

      return {
            ErrorLogs,
            RegistrosOk,
            RegistrosError,
      };
};
