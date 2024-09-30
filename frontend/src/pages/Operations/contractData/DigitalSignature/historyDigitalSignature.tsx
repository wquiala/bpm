import InputField from '@/custom-components/FormElements/InputField';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import handlePromise from '@/utils/promise';
import * as yup from 'yup';
import ParentModal from '../../CommonComponents/ParentModal';
import { columnsDigitalSignatureHistory, DigitalSignatureHistory } from './columnsDigitalSignatureHistory';
import { DataTable } from '../../../../components/ui/dataDocumentsTable';
import { getDigitalSignatureByContract } from '@/helpers/FetchData/digitalSignature';

type Props = {
   show: boolean;
   setShow: (show: boolean) => void;
   control: any;
   selectedContract: any;
};

export const HistoryDigitalSignature = ({ show, setShow, control, selectedContract }: Props) => {
   const { t } = useTranslation();

   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);
   const [digitalSignature, setDigitalSignature] = useState<DigitalSignatureHistory[]>();
   let historyList: DigitalSignatureHistory[] = [];
   selectedContract.HistorialContrato.map((hist: any) => {
      const obj = {
         FechaAlta: new Date(hist.createdAt).toLocaleDateString(),
         IndicadorFirmaPrecon: hist.IndicadorFDPRECON ? 'SI' : 'NO',
         TipoEnvioPrecon: hist.TipoEnvioPRECON,
         ResultadoPrecon: hist.ResultadoFDPRECON,
         IndicadorFirmaCon: hist.IndicadorFDCON ? 'SI' : 'NO',
         TipoEnvioCon: hist.TipoEnvioCON,
         ResultadoCon: hist.ResultadoFDCON,

         /*  Revisar: hist.Revisar ? 'SI' : 'NO',
         Conciliar: hist.Conciliar ? 'SI' : 'NO', */
      };

      if (!historyList.some((d: DigitalSignatureHistory) => (d = obj))) {
         historyList.push(obj);
      }
   });

   digitalSignature?.map((d: any) => historyList.push(d));

   useEffect(() => {
      const getDigitalSignature = async () => {
         const digitalList: DigitalSignatureHistory[] = [];

         if (selectedContract.CodigoSolicitud) {
            const { data: solicitud } = await getDigitalSignatureByContract(selectedContract.CodigoSolicitud);

            solicitud.map((d: any) => {
               const obj = {
                  IndicadorFirmaPrecon: '',
                  TipoEnvioPrecon: '',
                  ResultadoPrecon: '',
                  FechaAlta: d.FechaInicio,
                  IndicadorFirmaCon: '',
                  TipoEnvioCon: d.TIPO_ENVIO,
                  ResultadoCon: d.Resultado,
               };

               if (!digitalList.some((d: DigitalSignatureHistory) => (d = obj))) {
                  digitalList.push(obj);
               }
            });
         }

         if (selectedContract.CodigoPoliza) {
            const { data: poliza } = await getDigitalSignatureByContract(selectedContract.CodigoPoliza);
            poliza.map(
               (d: any) => {
                  const obj = {
                     IndicadorFirmaPrecon: '',
                     TipoEnvioPrecon: '',
                     ResultadoPrecon: '',
                     FechaAlta: d.FechaInicio,
                     IndicadorFirmaCon: '',
                     TipoEnvioCon: d.TIPO_ENVIO,
                     ResultadoCon: d.Resultado,
                  };
                  if (!digitalList.some((d: DigitalSignatureHistory) => (d = obj))) {
                     digitalList.push(obj);
                  }
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
      <ParentModal size="xl" title="Histórico de firma digital" show={show} setShow={setShow}>
         <div className="flex w-full justify-center items-center flex-col">
            <DataTable columns={columnsDigitalSignatureHistory} data={historyList} />
         </div>
      </ParentModal>
   );
};
