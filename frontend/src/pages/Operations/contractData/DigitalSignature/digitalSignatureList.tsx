import Alert from '@/components/Base/Alert';
import { Disclosure } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Table from '@/custom-components/Table/Table';
import { ColumnDefinition } from 'tabulator-tables';
import { DataTable } from '../../../../components/ui/dataDocumentsTable';
import { columnsDocuments, Document } from '../../IncidencesDocuments/columnsDocuments';
import { Documents } from '../main';
import { columnsIncidences, Incidence } from '../../IncidencesDocuments/columnsIncidences';
import moment from 'moment';
import { strict } from 'assert';
import { columnsDigitalSignature, DigitalSignature } from './columnsDigitalSignature';
import Button from '@/components/Base/Button';
import { useState } from 'react';
import { HistoryDigitalSignature } from './historyDigitalSignature';

type Props = {
   control: any;
   selectedContract: any;
   setSelectedContract: any;
};

const DigitalSignatureList = ({ control, selectedContract, setSelectedContract }: Props) => {
   const { t } = useTranslation();

   const [showHistoryDigitalSignature, setShowHistoryDigitalSignature] = useState<boolean>(false);

   /*   FechaAlta: string;
   FirmaDigital: string;
    */

   const data: DigitalSignature[] = [
      {
         FechaAlta: new Date(selectedContract.createdAt).toLocaleString(),
         FirmaDigital: '',
         IndicadorFirmaCon: selectedContract?.IndicadorFDCON ? 'SI' : 'NO',
         IndicadorFirmaPrecon: selectedContract?.IndicadorFDPRECON ? 'SI' : 'NO',
         TipoEnvioPrecon: selectedContract.TipoEnvioPRECON,
         TipoEnvioCon: selectedContract.TipoEnvioCON,
         ResultadoPrecon: selectedContract.ResultadoFDPRECON,
         ResultadoCon: selectedContract.ResultadoFDCON,
         Revisar: selectedContract.Revisar ? 'SI' : 'NO',
         Conciliar: selectedContract.Conciliar ? 'SI' : 'NO',
      },
   ];

   return (
      <div className="box p-4 m-4 mb-0">
         <div>
            <h1 className="flex font-bold text-xl justify-start text-blue-900">Documentos</h1>
            <DataTable columns={columnsDigitalSignature} data={data} />
         </div>
         <div className="flex flex-col sm:flex-row justify-end items-end mr-5 my-2 gap-3">
            <Button variant="primary" onClick={() => setShowHistoryDigitalSignature(true)}>
               Histórico - Firma digital
            </Button>
            <Button variant="danger" onClick={() => setSelectedContract(null)}>
               Cerrar
            </Button>
            <HistoryDigitalSignature
               selectedContract={selectedContract}
               show={showHistoryDigitalSignature}
               setShow={setShowHistoryDigitalSignature}
               control={control}
            />{' '}
         </div>
      </div>
   );
};

export default DigitalSignatureList;
