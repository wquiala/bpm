import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { policyValidator } from '../../../helpers/policiyValidator';
import { createContractHistory, fetchClave, fetchContrato, NoProcesar, policyCreator } from './policyCreator';
import { ContractHistoryData, RecordDiaria } from '../../../interfaces/contractsInterfaces';
import moment from 'moment';

export const processPolicyData = async (data: any[], user: { UsuarioId: any }) => {
   let details: any[] = [];
   let Insertados: number = 0;
   let Desechados: number = 0;
   let Actualizados: number = 0;
   let TotalRegistros: number = data.length;

   let conError: number = 0;

   const records: RecordDiaria[] = data.map((d) => {
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
         (record.compania == 'UCV' && !record.ccc) ||
         (record.compania != 'UCV' && !record.codigoSolicitud && record.compania != 'UCV' && !record.polizaContrato)
      ) {
         Desechados++;
         const data: any = {
            Operacion: 'DESECHADO',
            FechaEfecto: new Date(moment(record.fechaEfecto, 'MM/DD/YYYY', true).toISOString()),
            FechaOperacion: new Date(moment(record.fechaOperacion, 'MM/DD/YYYY', true).toISOString()),
            AnuladoSEfecto: record.anulaSE === 'S',
            DNIAsegurado: record.dniAsegurado,
            NombreAsegurado: record.nombreAsegurado,
            FechaNacimientoAsegurado: record.fechaNacimiento
               ? new Date(moment(record.fechaNacimiento, 'MM/DD/YYYY', true).toISOString())
               : null,
            CSRespAfirmativas: record.csResAfirm == 'S',
            ProfesionAsegurado: record.profesion,
            DeporteAsegurado: record.deporte,
            DNITomador: record.dniTomador,
            FechaValidezDNITomador:
               record.fechaValidezDniT && record.fechaValidezDniT !== ''
                  ? new Date(moment(record.fechaValidezDniT, 'MM/DD/YYYY', true).toISOString())
                  : null,
            NombreTomador: record.nombreTomador,
            Operador: record.operador,
            IndicadorFDPRECON: record.indicadorPrecon === 'SI',
            TipoEnvioPRECON: record.tipoEnvioPrecon,
            ResultadoFDPRECON: record.resultadoPrecon,
            IndicadorFDCON: record.indicadorCon === 'SI',
            TipoEnvioCON: record.tipoEnvioC,
            ResultadoFDCON: record.resultadoCon,
            Revisar: record.revisar === 'SI',
            Conciliar: record.conciliar === 'SI',
            errores: err,
         };

         await NoProcesar(data);
         details.push({
            ...record,
            estado: 'DESECHADO',
            errores: err,
         });

         await createContractHistory(data);
      } else {
         const { hasError: hasErr, insert } = await policyCreator(record, systemUser as Usuario, user, err, details);

         if (hasErr) {
            conError++;
            details.push({
               ...record,
               estado: 'INCOMPLETO',
               errores: err,
            });
         }
         if (insert) Insertados++;
         if (insert == false) Actualizados++;
      }
   }

   return {
      Insertados,
      conError,
      Actualizados,
      Desechados,
      TotalRegistros,
      details,
   };
};
