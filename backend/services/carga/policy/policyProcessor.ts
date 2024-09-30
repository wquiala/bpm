import { Incompletas, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { policyValidator } from '../../../helpers/policiyValidator';
import { createContractHistory, fetchClave, fetchContrato, policyCreator } from './policyCreator';
import { ContractHistoryData, RecordDiaria } from '../../../interfaces/contractsInterfaces';
import moment from 'moment';
import { createDesechados } from '../../contracts/contractService';
import { incompletas } from './incompletas';

export const processPolicyData = async (data: RecordDiaria[], user: { UsuarioId: any }) => {
   let details: any[] = [];
   let Insertados: number = 0;
   let Desechados: number = 0;
   let Actualizados: number = 0;
   let TotalRegistros: number = data.length;

   let conError: number = 0;
   let revisarCont = 0;

   const systemUser = await prismaClient.usuario.findFirst({
      where: {
         Codigo: '0001',
         Nombre: 'Sistema',
      },
   });
   for await (let record of data) {
      let errors: any[] = [];
      let errorMsg;

      const { error: err } = await policyValidator(record);

      if (!record.CodigoPoliza && !record.CodigoSolicitud && !record.CCC) {
         const incompletos = await prismaClient.incompletas.findMany();
         const withOut = incompletos.map((i: Incompletas) => {
            const { incompletaId, errores, createdAt, ...rest } = i;
            return rest;
         });

         const isIn = withOut.find(
            (w: any) => record.CodigoPoliza == w.CodigoPoliza && record.CodigoSolicitud == w.CodigoSolicitud,
         );
         if (!isIn) {
            await incompletas({ ...record, errores: err });
            revisarCont++;
            details.push({
               ...record,
               estado: 'INCOMPLETO REVISAR',
               errores: err,
            });
            /*  const data: any = {
               MotivoDesechado: 'SIN CLAVE',
   
               FechaEfecto: record.FechaEfecto,
               FechaOperacion: record.FechaOperacion,
               AnuladoSEfecto: record.AnuladoSEfecto,
               DNIAsegurado: record.DNIAsegurado,
               NombreAsegurado: record.NombreAsegurado,
               FechaNacimientoAsegurado: record.FechaNacimientoAsegurado,
   
               CSRespAfirmativas: record.CSRespAfirmativas,
               ProfesionAsegurado: record.ProfesionAsegurado,
               DeporteAsegurado: record.DeporteAsegurado,
               DNITomador: record.DNITomador,
               FechaValidezDNITomador: record.FechaValidezDNITomador,
               NombreTomador: record.NombreTomador,
               Operador: record.Operador,
               IndicadorFDPRECON: record.IndicadorFDPRECON,
               TipoEnvioPRECON: record.TipoEnvioPRECON,
               ResultadoFDPRECON: record.ResultadoFDPRECON,
               IndicadorFDCON: record.IndicadorFDCON,
               TipoEnvioCON: record.TipoEnvioCON,
               ResultadoFDCON: record.ResultadoFDCON,
               Revisar: record.Revisar,
               Conciliar: record.Conciliar,
            };
   
            await createDesechados(data);
            details.push({
               ...record,
               estado: 'DESECHADO SIN CLAVE',
               errores: err,
            }); */

            // await createContractHistory(data);
         }
      } else {
         const {
            hasError: hasErr,
            insert,
            Desechados: des,
            revisar,
         } = await policyCreator(record, systemUser as Usuario, user, err, details);
         Desechados += des;
         if (revisar) revisarCont++;

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
      revisarCont,
   };
};
