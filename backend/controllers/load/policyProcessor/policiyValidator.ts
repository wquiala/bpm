import { prismaClient } from '../../../server';
import moment from 'moment';

const validateField = (record: any, field: string, condition: boolean, message: string, errors: any[]) => {
      if (condition) {
            errors.push(message);
      }
};

export const validateCriticalErrorsToUNI = (record: any) => {
      if ((record['COMPAÑÍA'] == 'UCV' || record['COMPAÑÍA'] == 'UNI') && !record['CCC']) {
            return {
                  msg: 'Tiene que especificar un CCC obligatoriamente para poder proceder con la carga',
            };
      } else if (
            record['COMPAÑÍA'] != 'UCV' &&
            record['COMPAÑÍA'] != 'UNI' &&
            !record['CCC'] &&
            !record['CODIGO SOLICITUD'] &&
            !record['POLIZA_CONTRATO']
      ) {
            return {
                  msg: 'Tiene que especificar un Código de solicitud o Póliza obligatoriamente obligatoriamente para poder proceder con la carga',
            };
      }

      return false;
};
const validateRequiredFields = (record: any, errors: any[]) => {
      const requiredFields = [
            { field: 'COMPAÑÍA', message: 'La compañía no está presente' },
            { field: 'PRODUCTO', message: 'El producto no está presente' },
            { field: 'FECHA DE OPERACIÓN', message: 'La fecha de operación no está presente' },
            { field: 'FECHA EFECTO', message: 'La fecha de efecto no está presente' },
            { field: 'ANULADO SIN EFECTO', message: 'Anulado sin efecto no está presente' },
            { field: 'ID_ASEGURADO', message: 'El DNI del asegurado no está presente' },
            { field: 'NOMBRE ASEGURADO', message: 'El nombre del asegurado no esta presente' },
            { field: 'FECHA DE NACIMIENTO', message: 'La fecha de nacimiento del asegurado no está presente' },
            { field: 'ID_TOMADOR_PARTICIPE', message: 'El id del tomador no está presente' },
            { field: 'NOMBRE TOMADOR_PARTICIPE', message: 'El nombre del tomador no está presente' },
            { field: 'MEDIADOR', message: 'El mediador no está presente' },
            { field: 'OPERADOR', message: 'El operador no está presente' },
      ];

      requiredFields.forEach(({ field, message }) => {
            validateField(record, field, !record[field], message, errors);
      });
};

const validateOptionalFields = (record: any, errors: any[]) => {
      const optionalFields = [
            {
                  field: 'ANULADO SIN EFECTO',
                  values: ['S', 'N'],
                  message: "Anulado con efecto solo admite los valores 'S' o 'N'",
            },
            {
                  field: 'INDICADOR FIRMA DIGITAL PRECON',
                  values: ['SI', 'NO'],
                  message: "Indicador firma digital PRECON solo admite los valores 'SI' o 'NO'",
            },
            {
                  field: 'INDICADOR FIRMA DIGITAL CON',
                  values: ['SI', 'NO'],
                  message: "Indicador firma digital CON solo admite los valores 'SI' o 'NO'",
            },
            { field: 'REVISAR', values: ['SI', 'NO'], message: "Revizar solo admite los valores 'SI' o 'NO'" },
            { field: 'CONCILIAR', values: ['SI', 'NO'], message: "Conciliar solo admite los valores 'SI' o 'NO'" },
      ];

      optionalFields.forEach(({ field, values, message }) => {
            validateField(record, field, record[field] && !values.includes(record[field]), message, errors);
      });
};

const validateDates = (record: any, errors: any[]) => {
      const dateFields = [
            { field: 'FECHA DE OPERACIÓN', message: 'FECHA DE OPERACIÓN fecha no válida' },
            { field: 'FECHA EFECTO', message: 'FECHA EFECTO fecha no válida' },
            { field: 'FECHA DE ALTA', message: 'FECHA DE ALTA fecha no válida' },
            { field: 'FECHA DE NACIMIENTO', message: 'Fecha de nacimiento del asegurado fecha no válida' },
            { field: 'FECHA VALIDEZ IDENTIDAD TOMADOR', message: 'FECHA VALIDEZ IDENTIDAD TOMADOR fecha no válida' },
      ];

      dateFields.forEach(({ field, message }) => {
            if (record[field] && record[field] !== '') {
                  const dateValue = moment(record[field], 'DD/MM/YYYY', true);
                  if (!dateValue.isValid()) {
                        errors.push(message);
                  }
            }
      });
};

export const validateCompany = async (record: any, errors: any[]) => {
      if (record['COMPAÑÍA']) {
            let companyCode = record['COMPAÑÍA'];

            if (record['COMPAÑÍA'] == 'UCV') {
                  companyCode = 'UNI';
            } else if (record['COMPAÑÍA'] == 'AVP') {
                  companyCode = 'SLS';
            }

            const company = await prismaClient.compania.findFirst({
                  where: { Nombre: `${companyCode}` },
            });

            if (!company) {
                  errors.push('Compañía no encontrada');
            }
      }
};

const validateBranch = async (record: any, errors: any[]) => {
      if (record['PRODUCTO']) {
            const branch = await prismaClient.producto.findFirst({
                  where: { Codigo: `${record['PRODUCTO']}` },
            });
            if (!branch) {
                  errors.push('Ramo no encontrado');
            }
      }
};

const validateMediator = async (record: any, errors: any[]) => {
      if (record['MEDIADOR']) {
            const mediator = await prismaClient.mediador.findFirst({
                  where: { Codigo: `${record['MEDIADOR']}` },
            });
            if (!mediator) {
                  errors.push('Mediador no encontrado');
            }
      }
};

export const policyValidator = async (record: any) => {
      const errors: any[] = [];
      let hasError = false;

      validateRequiredFields(record, errors);
      validateOptionalFields(record, errors);
      validateDates(record, errors); // Note: not awaiting validateDates, as it's synchronous now
      /*  await validateCompany(record, errors);
      await validateBranch(record, errors);
      await validateMediator(record, errors); */

      if (errors.length > 0) {
            hasError = true;
      }

      return {
            hasError,
            errors,
      };
};
