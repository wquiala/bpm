/* import Alert from '@/components/Base/Alert';
import { Disclosure } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Table from '@/custom-components/Table/Table';
import { ColumnDefinition } from 'tabulator-tables';
import { DataTable } from '../../IncidencesDocuments/dataDocumentsTable';
import { columnsDocuments, Document } from '../../IncidencesDocuments/columnsDocuments';
import { Documents } from '../main';
import { columnsIncidences } from '../../IncidencesDocuments/columnsIncidences';

type Props = {
   control: any;
   selectedContract: any;
};

const IncidenceList = ({ control, selectedContract }: Props) => {
   const { t } = useTranslation();

   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });
   console.log(fields);

   const data: Document[] = fields.map((doc: any) => {
      return {
         Familia_Documento: doc.Codigo,
         Fase: doc.Fase,
         Grupo_Documento: doc.Nombre,
         Estado: doc.Estado,
         Fecha_estado: doc.FechaEstado,
         FechaUltimaRecepcion: doc.FechaUltimaRecepcion,
         FechaUltimaReclamacion: doc.FechaUltimaReclamacion,
         FechaProximaReclamacion: doc.FechaProximaReclamacion,
      };
   });

   return (
      <div className="box p-4 m-4 mb-0">
         <div>
            <h1>Incidencias</h1>
            <DataTable columns={columnsIncidences} data={data} />
         </div>
         <div>
            <h1>Incidencias</h1>
            <table></table>
         </div>
      </div>
   );
};

export default IncidenceList;
 */
