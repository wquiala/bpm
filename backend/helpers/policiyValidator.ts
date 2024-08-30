import { RecordDiaria } from '../interfaces/contractsInterfaces';
import { prismaClient } from '../server';
import moment from 'moment';

const validateField = (record: RecordDiaria, field: string, condition: boolean, message: string, errors: any) => {
   if (condition) {
      errors[field] = message;
   }
};

const validateRequiredFields = (record: RecordDiaria, error: { [key: string]: string }) => {
   const requiredFields = [
      { field: 'compania', message: 'La compañía no está presente' },
      { field: 'producto', message: 'El producto no está presente' },
      { field: 'fechaOperacion', message: 'La fecha de operación no está presente' },
      { field: 'fechaEfecto', message: 'La fecha de efecto no está presente' },
      { field: 'dniAsegurado', message: 'El DNI del asegurado no está presente' },
      { field: 'nombreAsegurado', message: 'El nombre del asegurado no esta presente' },
      { field: 'fechaNacimiento', message: 'La fecha de nacimiento del asegurado no está presente' },
      { field: 'dniTomador', message: 'El id del tomador no está presente' },
      { field: 'nombreTomador', message: 'El nombre del tomador no está presente' },
      { field: 'mediador', message: 'El mediador no está presente' },
      { field: 'operador', message: 'El operador no está presente' },
   ];

   requiredFields.forEach(({ field, message }) => {
      validateField(record, field, !record[field as keyof RecordDiaria], message, error);
   });
};

const validateOptionalFields = (record: RecordDiaria, error: any) => {
   const optionalFields = [
      {
         field: 'anulaSE',
         values: ['S', 'N'],
         message: "Anulado con efecto solo admite los valores 'S' o 'N'",
      },
      {
         field: 'indicadorPrecon',
         values: ['SI', 'NO'],
         message: "Indicador firma digital PRECON solo admite los valores 'SI' o 'NO'",
      },
      {
         field: 'indicadorCon',
         values: ['SI', 'NO'],
         message: "Indicador firma digital CON solo admite los valores 'SI' o 'NO'",
      },
      { field: 'revisar', values: ['SI', 'NO'], message: "Revizar solo admite los valores 'SI' o 'NO'" },
      { field: 'conciliar', values: ['SI', 'NO'], message: "Conciliar solo admite los valores 'SI' o 'NO'" },
   ];

   optionalFields.forEach(({ field, values, message }) => {
      const value: any = record[field as keyof RecordDiaria];
      if (value && !values.includes(value)) {
         validateField(record, field, true, message, error);
      }
   });
};

const validateDates = (record: RecordDiaria, error: any) => {
   const dateFields = [
      { field: 'fechaOperacion', message: 'FECHA DE OPERACIÓN fecha no válida' },
      { field: 'fechaEfecto', message: 'FECHA EFECTO fecha no válida' },
      { field: 'fechaNacimiento', message: 'Fecha de nacimiento del asegurado fecha no válida' },
      { field: 'fechaValidezDniT', message: 'FECHA VALIDEZ IDENTIDAD TOMADOR fecha no válida' },
   ];

   dateFields.forEach(({ field, message }) => {
      const value: any = record[field as keyof RecordDiaria];
      if (value && record[field as keyof RecordDiaria] !== '') {
         const dateValue = moment(value, 'DD/MM/YYYY', true);
         if (!dateValue.isValid()) {
            error[field] = message;
         }
      }
   });
};

export const validateCompany = async (record: RecordDiaria, errors: any[]) => {
   if (record.compania) {
      let companyCode = record.compania;

      if (record.compania == 'UCV') {
         companyCode = 'UNI';
      } else if (record.compania == 'AVP') {
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

const validateMediator = async (record: RecordDiaria, errors: any[]) => {
   if (record.mediador) {
      const mediator = await prismaClient.mediador.findFirst({
         where: { Codigo: `${record.mediador}` },
      });
      if (!mediator) {
         errors.push('Mediador no encontrado');
      }
   }
};

export const policyValidator = async (record: RecordDiaria) => {
   let hasError = false;
   const error: { [key: string]: string } = {};
   validateRequiredFields(record, error);

   validateOptionalFields(record, error);

   validateDates(record, error);

   return {
      error,
   };
};
