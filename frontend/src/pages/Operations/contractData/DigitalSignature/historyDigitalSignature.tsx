import { columnsDigitalSignatureHistory, DigitalSignatureHistory } from './columnsDigitalSignatureHistory';
import { DataTable } from '../../../../components/ui/dataDocumentsTable';
import { getDigitalSignatureByContract } from '@/helpers/FetchData/digitalSignature';
import { useEffect, useState } from 'react';
import ParentModal from '@/custom-components/Modals/ParentModal';

type Props = {
   show: boolean;
   setShow: (show: boolean) => void;
   control: any;
   selectedContract: any;
};

export const HistoryDigitalSignature = ({ show, setShow, control, selectedContract }: Props) => {
   const [digitalSignature, setDigitalSignature] = useState<DigitalSignatureHistory[]>();
   let historyList: DigitalSignatureHistory[] = [];

   digitalSignature?.map((d: any) => historyList.push(d));

   useEffect(() => {
      const getDigitalSignature = async () => {
         const digitalList: DigitalSignatureHistory[] = [];

         if (selectedContract.CodigoSolicitud) {
            const { data: solicitud } = await getDigitalSignatureByContract(selectedContract.CodigoSolicitud);

            solicitud.map((d: any) => {
               console.log(d);
               const obj = {
                  FechaAlta: new Date(d.createdAt).toLocaleDateString(),
                  TipoEnvioCon: d.TIPO_ENVIO != '' ? d.TIPO_ENVIO : 'Sin información en la carga',
                  ResultadoCon: d.Resultado != '' ? d.Resultado : 'Sin información en la carga',
               };

               digitalList.push(obj);
            });
         }

         if (selectedContract.CodigoPoliza) {
            const { data: poliza } = await getDigitalSignatureByContract(selectedContract.CodigoPoliza);
            poliza.map(
               (d: any) => {
                  console.log(d);

                  const obj: DigitalSignatureHistory = {
                     FechaAlta: new Date(d.createdAt).toLocaleDateString(),
                     TipoEnvioCon: d.TIPO_ENVIO != '' ? d.TIPO_ENVIO : 'Sin información en la carga',
                     ResultadoCon: d.Resultado != '' ? d.Resultado : 'Sin información en la carga',
                  };
                  digitalList.push(obj);
               },
               /* digitalList.push({
                  FechaAlta: d.FechaInicio,
                  TipoEnvioCon: d.TIPO_ENVIO,
                  ResultadoCon: d.Resultado,
               }), */
            );
         }

         setDigitalSignature(digitalList);
      };

      if (selectedContract) getDigitalSignature();
   }, [selectedContract]);

   /* TipoEnvioPRECON          String?
  ResultadoFDPRECON        String?
  IndicadorFDCON           Boolean?
  TipoEnvioCON             String?
  ResultadoFDCON           String? */

   return (
      <ParentModal size="xl" title="Histórico de firma digital" show={show} setShow={setShow} hideFooter>
         <div className="flex w-full justify-center items-center flex-col">
            <DataTable columns={columnsDigitalSignatureHistory} data={historyList} />
         </div>
      </ParentModal>
   );
};
