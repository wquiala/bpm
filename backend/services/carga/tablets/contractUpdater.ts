import { ESTADO_CONTRATO, OPERACION_CONTRATO, Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { tabletsCreator } from './tabletsCreator';
import { createContractHistory } from '../../contracts/contractService';
import { createContractDocumentHistory } from '../../contractDocuments/contractDocuments';
import { findTipoConciliacion } from '../../tipoConciliacion/tipoConciliacion';
import { TiposConciliacion } from '../../../constants/TiposConciliacion';
import { parserDate } from '../../../helpers/time';
import moment from 'moment';

const fetchContract = async (ccc: string) => {
   return prismaClient.contrato.findFirst({
      where: { CCC: ccc },
      include: {
         DocumentoContrato: {
            include: {
               IncidenciaDocumento: true,
               MaestroDocumentos: {
                  include: { FamiliaDocumento: true },
               },
            },
         },
      },
   });
};

const fetchConciliationType = async (name: string) => {
   return prismaClient.tipoConciliacion.findFirst({
      where: { nombre: name },
   });
};

const resolveIncidences = async (documentoContrato: any, systemUser: Usuario) => {
   for (const documentIncidence of documentoContrato.IncidenciaDocumento) {
      await prismaClient.incidenciaDocumento.update({
         where: {
            IncidenciaDocId: documentIncidence.IncidenciaDocId,
         },
         data: {
            Resuelta: true,
            Usuario: {
               connect: {
                  UsuarioId: systemUser?.UsuarioId,
               },
            },
         },
      });
   }
};

const updateDocumentStatus = async (documentoContrato: any, systemUser: Usuario, record: any) => {
   const tipoConciliacion = await findTipoConciliacion(TiposConciliacion.tableta);
   return await prismaClient.documentoContrato.update({
      where: {
         DocumentoId: documentoContrato.DocumentoId,
      },
      data: {
         EstadoDoc: ContractDocumentStatusesEnum.CORRECT,

         FechaConciliacion: new Date(),
         Usuario: {
            connect: {
               UsuarioId: systemUser?.UsuarioId,
            },
         },
         TipoConciliacion: {
            connect: { tipoConciliacionId: tipoConciliacion!.tipoConciliacionId },
         },
         FechaEstado: moment(record['FECHA_ACTUALIZACION'], 'DD/MM/YYYY HH:mm:ss').toDate(),
      },
   });
};

const updateContractStatus = async (
   contractId: number,
   conciliationTypeId: number,
   record: any,
   systemUser: Usuario,
) => {
   return await prismaClient.contrato.update({
      where: {
         ContratoId: contractId,
      },
      data: {
         TipoConciliacion: {
            connect: {
               tipoConciliacionId: conciliationTypeId,
            },
         },
         ResultadoFDCON: record['SITUACION_FIRMA'],
         EstadoContrato: 'TRAMITADA',
         Usuario: {
            connect: {
               UsuarioId: systemUser?.UsuarioId,
            },
         },
      },
   });
};

const checkAndUpdateContractStatus = async (contract: any, conciliationType: any, record: any, systemUser: Usuario) => {
   const documentContracts = await prismaClient.documentoContrato.findMany({
      where: {
         ContratoId: contract.ContratoId,
      },
   });

   const hasIncidences = documentContracts.some((documentContract) => documentContract.FechaConciliacion === null);

   if (!hasIncidences) {
      const updated = await updateContractStatus(
         contract.ContratoId,
         conciliationType.tipoConciliacionId,
         record,
         systemUser,
      );

      const {
         Activo,

         TipoOperacion,
         updatedAt,
         TipoConciliacionId,
         UsuarioId,

         ...data
      } = updated;

      await createContractHistory({
         ...data,
         Operacion: OPERACION_CONTRATO.ACTUALIZADO,
         EstadoContrato: ESTADO_CONTRATO.TRAMITADA,
      });
   }
};

export const contractUpdater = async (
   record: any,
   systemUser: Usuario,
   user: { UsuarioId: any },
   details: any,
   err: { [key: string]: string },
) => {
   let updated = false;
   //Revisar hay detalles que tener en cuentas
   if (
      (record['CODIGO_INTERNO_FORMULARIO'] == 'SOL' && record['DESC_OPERACION'] == 'Alta' && record['FECHA_FIRMA']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] == 'SEPA' &&
         record['DESC_OPERACION'] === 'Solicitud' &&
         record['FECHA_FIRMA']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' &&
         record['DESC_OPERACION'] === 'Solicitud' &&
         record['FECHA_FIRMA']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' &&
         record['DESC_OPERACION'] == 'Alta - Cuestionario de salud' &&
         record['FECHA_FIRMA']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'SEPA' &&
         record['DESC_OPERACION'] === 'Alta' &&
         record['FECHA_FIRMA']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] == 'PDFD' && record['DESC_OPERACION'] == 'Alta' && record['FECHA_FIRMA']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'CP' && record['DESC_OPERACION'] == 'Alta' && record['FECHA_FIRMA']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'CS' && record['DESC_OPERACION'] == 'Alta' && record['FECHA_FIRMA']) ||
      (record['CODIGO_INTERNO_FORMULARIO'] === 'SOL' &&
         record['DESC_OPERACION'] === 'Solicitud' &&
         record['FECHA_FIRMA'])
   ) {
      const contract = await fetchContract(record['CCC']);
      let codigoForm = record['CODIGO_INTERNO_FORMULARIO'];
      if (
         (record['CODIGO_INTERNO_FORMULARIO'] === 'CP' &&
            record['DESC_OPERACION'] == 'Alta' &&
            record['FECHA_FIRMA']) ||
         (record['CODIGO_INTERNO_FORMULARIO'] == 'PDFD' &&
            record['DESC_OPERACION'] == 'Alta' &&
            record['FECHA_FIRMA']) ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' &&
            record['DESC_OPERACION'] === 'Solicitud' &&
            record['FECHA_FIRMA']) ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'SOL' &&
            record['DESC_OPERACION'] === 'Solicitud' &&
            record['FECHA_FIRMA'])
      ) {
         codigoForm = 'CP';
      }
      if (
         (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' &&
            record['DESC_OPERACION'] == 'Alta - Cuestionario de salud' &&
            record['FECHA_FIRMA']) ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'CS' && record['DESC_OPERACION'] == 'Alta' && record['FECHA_FIRMA'])
      ) {
         codigoForm = 'CS';
      }

      if (
         (record['CODIGO_INTERNO_FORMULARIO'] === 'SEPA' &&
            record['DESC_OPERACION'] === 'Alta' &&
            record['FECHA_FIRMA']) ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'SEPA' &&
            record['DESC_OPERACION'] === 'Solicitud' &&
            record['FECHA_FIRMA'])
      ) {
         codigoForm = 'SEPA';
      }
      const conciliationType = await fetchConciliationType('Por Fichero Tableta (CCC)');
      await tabletsCreator(record, true, err);
      let a = 0;

      if (contract && conciliationType) {
         for (const documentoContrato of contract.DocumentoContrato) {
            if (['SOL', 'SEPA', 'CP', 'CS'].includes(documentoContrato.MaestroDocumentos.FamiliaDocumento.Codigo)) {
               if (documentoContrato.MaestroDocumentos.FamiliaDocumento.Codigo == codigoForm) {
                  await resolveIncidences(documentoContrato, systemUser);

                  const query = await updateDocumentStatus(documentoContrato, systemUser, record);

                  const { ContratoId, ...dataD } = query;
                  const toSend = {
                     ...dataD,
                     FechaEstado: moment(record['FECHA_ACTUALIZACION'], 'DD/MM/YYYY HH:mm:ss').toDate(),
                     TipoConciliacion: conciliationType.nombre,
                  };

                  await createContractDocumentHistory(toSend);
                  //}
                  updated = true;
                  details.push({
                     ...record,
                     estado: 'ACTUALIZADO',
                     errores: err,
                  });
               }
            }
         }

         const cant = await prismaClient.documentoContrato.findMany({
            where: {
               ContratoId: contract.ContratoId,
               EstadoDoc: 'CORRECTO',
            },
         });
         if (cant.length == contract.DocumentoContrato.length) {
            await checkAndUpdateContractStatus(contract, conciliationType, record, systemUser);
         }
      } else {
         details.push({
            ...record,
            estado: 'DESECHADO',
            errores: err,
         });
      }
   } else {
      details.push({
         ...record,
         estado: 'DESECHADO',
         errores: err,
      });
   }
   return { updated };
};
