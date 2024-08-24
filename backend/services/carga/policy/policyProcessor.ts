import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { policyValidator } from '../../../helpers/policiyValidator';
import { createContractHistory, fetchClave, fetchContrato, NoProcesar, policyCreator } from './policyCreator';
import { ContractHistoryData, Record } from '../../../interfaces/contractsInterfaces';
import moment from 'moment';

export const processPolicyData = async (records: Record[], user: { UsuarioId: any }) => {
   let details: any[] = [];
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
         (record.compania == 'UCV' && !record.ccc) ||
         (record.compania != 'UCV' && !record.codigoSolicitud && record.compania != 'UCV' && !record.polizaContrato)
      ) {
         Desechados++;
         const data: any = {
            Operacion: 'DESECHADO',
            FechaEfecto: new Date(moment(record.fechaEfecto, 'MM/DD/YYYY', true).toISOString()),
            AnuladoSEfecto: record.anulaSE === 'S',
            DNIAsegurado: record.dniAsegurado,
            NombreAsegurado: record.nombreAsegurado,
            FechaNacimientoAsegurado: record.fechaNacimiento
               ? new Date(moment(record.fechaNacimiento, 'MM/DD/YYYY', true).toISOString())
               : null,
            CSRespAfirmativas: record.csResAfirm && record.csResAfirm == 'S' ? true : false,
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
         });

         if (record.fechaOperacion != '') {
            data.FechaOperacion = new Date(moment(record.fechaOperacion, 'MM/DD/YYYY', true).toISOString());
         }

         await createContractHistory(data);
      } else {
         const { hasError: hasErr, insert } = await policyCreator(record, systemUser as Usuario, user, err, details);

         if (hasErr) {
            conError++;
            details.push({
               ...record,
               estado: 'INCOMPLETO',
            });
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
      details,
   };
};
