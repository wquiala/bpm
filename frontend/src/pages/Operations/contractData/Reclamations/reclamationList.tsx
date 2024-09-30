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
import { columnsReclamations } from './columnsReclamations';
import Button from '@/components/Base/Button';

type Props = {
   control: any;
   selectedContract: any;
   setSelectedContract: any;
};

const ReclamationList = ({ control, selectedContract, setSelectedContract }: Props) => {
   const { t } = useTranslation();

   const comunicatins = selectedContract.Comunicacion.map((com: any) => {
      return {
         FechaReclamacion: new Date(com.createdAt).toLocaleString(),
         Mediador: selectedContract.Mediador.Nombre,
         CorreosDestinatarios: com.emailDestinatario,
      };
   });

   const incidencesList: any[] = [];

   return (
      <div className="box p-4 m-4 mb-0">
         <div>
            <h1 className="flex font-bold text-xl justify-start text-blue-900">Documentos</h1>
            <DataTable columns={columnsReclamations} data={comunicatins} />
         </div>
         <div className="flex flex-col sm:flex-row justify-end items-end mr-5 my-2 gap-3">
            <Button variant="danger" onClick={() => setSelectedContract(null)}>
               Cerrar
            </Button>
         </div>
      </div>
   );
};

export default ReclamationList;
