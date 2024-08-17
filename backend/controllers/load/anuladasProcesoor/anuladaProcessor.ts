import moment from 'moment';
import promise from '../../../../frontend/src/utils/promise';
import { prismaClient } from '../../../server';
import { ESTADO_CONTRATO, OPERACION_CONTRATO } from '@prisma/client';
import { createContractHistory } from '../policyProcessor/policyCreator';

export const anuladaProcessor = async (records: any, user: { UsuarioId: any }) => {
      for (let record of records) {
            if (!record['CLAVE_OPERACIÓN']) {
                  prismaClient.log.create({
                        data: {
                              Accion: 'Anulación de póliza',
                              Detalles: 'Póliza no identificada, no podrá ser anulada, falta clave de operación',
                              UsuarioId: user.UsuarioId,
                        },
                  });
            } else {
                  if (!moment(record['FECHA EMISIÓN ANULACIÓN'], 'DD/MM/YYYY', true)) {
                        prismaClient.log.create({
                              data: {
                                    Accion: 'Anulación de póliza',
                                    Detalles: `La póliza con clave de operación ${record['CLAVE_OPERACIÓN']} no puede ser anulada porque la fecha de anulación no es válida`,
                                    UsuarioId: user.UsuarioId,
                              },
                        });
                  }

                  const anulada = await prismaClient.contrato.update({
                        where: {
                              ClaveOperacion: record['CLAVE_OPERACIÓN'],
                        },
                        data: {
                              AnuladoSEfecto: true,
                        },
                  });

                  const { CompaniaId, ProductoId, CodigoPoliza, MediadorId, ClaveOperacion, ...rest } = anulada;
                  await createContractHistory({
                        ...rest,
                        Operacion: OPERACION_CONTRATO.ANULADO,
                        EstadoContrato: ESTADO_CONTRATO.ANULADA,
                  });
            }
      }
};
