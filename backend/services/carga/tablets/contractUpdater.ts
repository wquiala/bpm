import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../server';
import { ContractDocumentStatusesEnum } from '../../../constants/ContractDocumentStatusesEnum';
import { TabletaRecord } from '../../../interfaces/contractsInterfaces';
import { AnyAaaaRecord } from 'dns';
import { tabletsCreator } from './tabletsCreator';

const fetchContract = async (ccc: string) => {
   return prismaClient.contrato.findFirst({
      where: { CCC: ccc },
      include: {
         DocumentoContrato: {
            include: {
               IncidenciaDocumento: true,
               MaestroDocumentos: true,
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

const updateDocumentStatus = async (documentoContrato: any, systemUser: Usuario) => {
   await prismaClient.documentoContrato.update({
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
      },
   });
};

const updateContractStatus = async (
   contractId: number,
   conciliationTypeId: number,
   record: any,
   systemUser: Usuario,
) => {
   await prismaClient.contrato.update({
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
         /*  Usuario: {
                        connect: {
                              UsuarioId: systemUser?.UsuarioId,
                        },
                  }, */
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
      await updateContractStatus(contract.ContratoId, conciliationType.TipoConciliacionId, record, systemUser);
   }
};

export const contractUpdater = async (record: any, systemUser: Usuario, user: { UsuarioId: any }, details: any) => {
   let updated;
   if (
      ((record['CODIGO_INTERNO_FORMULARIO'] === 'SOL' ||
         record['CODIGO_INTERNO_FORMULARIO'] === 'SEPA' ||
         record['CODIGO_INTERNO_FORMULARIO'] === 'CP' ||
         record['CODIGO_INTERNO_FORMULARIO'] === 'CS' ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' && record['DESC_OPERACION'] === 'Alta') ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' && record['DESC_OPERACION'] === 'Solicitud') ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'PDFD' && record['*cuestio*']) ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'PDUR' && record['Alta']) ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'PDUR' && record['Solicitud']) ||
         (record['CODIGO_INTERNO_FORMULARIO'] === 'PDUR' && record['*cuestio*'])) &&
         record['FECHA_FIRMA']) ||
      record['CONCILIAR'] === '1'
   ) {
      const contract = await fetchContract(record['CCC']);
      const conciliationType = await fetchConciliationType('Por Fichero Tableta (CCC)');

      if (contract && conciliationType) {
         await tabletsCreator(record, true);
         details.push({
            ...record,
            estado: 'DOCUMENTO ACTUALIZADO',
         });
         updated = true;

         for (const documentoContrato of contract.DocumentoContrato) {
            if (['SOL', 'SEPA', 'CP', 'CS'].includes(documentoContrato.MaestroDocumentos.Codigo)) {
               await resolveIncidences(documentoContrato, systemUser);
               await updateDocumentStatus(documentoContrato, systemUser);
            }
         }

         await checkAndUpdateContractStatus(contract, conciliationType, record, systemUser);
      } else {
         await tabletsCreator(record, false);
         updated = false;
      }
   }
   return { updated };
};
