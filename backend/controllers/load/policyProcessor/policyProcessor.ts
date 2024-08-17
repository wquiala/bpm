import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { policyValidator } from './policiyValidator';
import { createContractHistory, fetchClave, fetchContrato, NoProcesar, policyCreator } from './policyCreator';
import { ContractHistoryData } from '../../../interfaces/contractsInterfaces';
import moment from 'moment';

export const processPolicyData = async (records: any[], user: { UsuarioId: any }) => {
      let ErrorLogs: any[] = [];
      let Insertados: number = 0;
      let Desechados: number = 0;
      let Actualizados: number = 0;
      let TotalRegistros: number = records.length;

      let conError: number = 0;

      const systemUser = await prismaClient.usuario.findFirst({
            where: {
                  Codigo: '0001',
                  Nombre: 'Sistema',
            },
      });
      for await (let record of records) {
            let errors: any[] = [];
            let errorMsg;

            const { error: err } = await policyValidator(record);

            if (
                  (record['COMPAÑÍA'] == 'UCV' && !record['CCC']) ||
                  (record['COMPAÑÍA'] != 'UCV' &&
                        !record['CODIGO SOLICITUD'] &&
                        record['COMPAÑÍA'] != 'UCV' &&
                        !record['POLIZA_CONTRATO'])
            ) {
                  Desechados++;
                  const data: any = {
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
                        errores: err,
                  };

                  await NoProcesar(data);

                  if (record['FECHA DE OPERACIÓN'] != '') {
                        data.FechaOperacion = new Date(
                              moment(record['FECHA DE OPERACIÓN'], 'MM/DD/YYYY', true).toISOString(),
                        );
                  }

                  await createContractHistory(data);

                  //
            } else {
                  //const conCriticalError = validateCriticalErrorsToUNI(record);

                  /*   if (hasErr) {
                        hasError = true;
                        errors = [...err, ...errors];
                  }
 */

                  const { hasError: hasErr, insert } = await policyCreator(record, systemUser as Usuario, user, err);

                  if (hasErr) {
                        conError++;
                  }
                  insert ? Insertados++ : Actualizados++;
            }
      }

      return {
            Insertados,
            conError,
            Actualizados,
            Desechados,
            TotalRegistros,
      };
};
