import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { digitalSignatureValidator } from './digitalSignatureValidator';
import { contractUpdater } from './contractUpdater';
import { digitalSignature } from './digitalSignatureCreator';
/* import { contractUpdater } from "./contractUpdater";
 */
export const processDigitalSignatureData = async (records: any[], user: { UsuarioId: any }) => {
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

            const { hasError: hasErr, errors: err } = await digitalSignatureValidator(record);

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
                  await contractUpdater(record, systemUser as Usuario, user);

                  RegistrosOk++;
            }

            await digitalSignature(record);
      }

      return {
            ErrorLogs,
            RegistrosOk,
            RegistrosError,
      };
};
