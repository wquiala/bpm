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
import Button from '@/components/Base/Button';
import { useState } from 'react';
import { HistoryDocuments } from '../../IncidencesDocuments/historyDocuments';
import { HistoryIncidences } from '../../IncidencesDocuments/historyIncidences';

type Props = {
   control: any;
   selectedContract: any;
   setSelectedContract: any;
};

const DocumentList = ({ control, selectedContract, setSelectedContract }: Props) => {
   const { t } = useTranslation();
   const [showHistoryDocuments, setShowHistoryDocuments] = useState<boolean>(false);
   const [showHistoryincidences, setShowHistoryIncidences] = useState<boolean>(false);

   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });

   const dataDocuments: Document[] = fields.map((doc: any) => {
      return {
         Familia_Documento: doc.Codigo,
         Fase: doc.Fase,
         Grupo_Documento: doc.Nombre,
         Estado: doc.Estado,
         Fecha_estado: doc.FechaEstado ? new Date(doc.FechaEstado).toLocaleString() : 'Sin fecha',
         FechaUltimaRecepcion: doc.FechaUltimaRecepcion
            ? new Date(doc.FechaUltimaRecepcion).toLocaleString()
            : 'Sin fecha',
         FechaUltimaReclamacion: selectedContract.FechaReclamacion
            ? new Date(selectedContract.FechaReclamacion).toLocaleString()
            : 'Sin fecha',
         FechaProximaReclamacion: selectedContract.FechaProximaReclamacion
            ? new Date(selectedContract.FechaProximaReclamacion).toLocaleString()
            : 'Sin fecha',
      };
   });

   const incidencesList: any[] = [];

   fields.map((doc: any) => {
      doc.incidences.map((inci: any) => {
         if (!inci.Resuelta)
            incidencesList.push({
               Familia_Documento: doc.Codigo,
               Incidencia: inci.MaestroIncidencias.Nombre,
               Comentarios: inci.Nota,
               Estado_Incidencia: inci.Resuelta == true ? 'Resuelta' : 'No resuelta',
               Fecha_estado: new Date(inci.updatedAt).toLocaleString(),
               FechaAltaIncidencia: new Date(inci.createdAt).toLocaleString(),
               FechaUltimaReclamacion: new Date(selectedContract.FechaReclamacion).toLocaleString(),
               FechaProximaReclamacion: new Date(selectedContract.FechaProximaReclamacion).toLocaleString(),
            });
      });
   });

   const handleHistoryDocuments = () => {
      setShowHistoryDocuments(true);
   };

   const handleHistoryIncidences = () => {
      setShowHistoryIncidences(true);
   };

   return (
      <div className="box p-4 m-4 mb-0">
         <div>
            <h1 className="flex font-bold text-xl justify-start text-blue-900">Documentos</h1>
            <DataTable columns={columnsDocuments} data={dataDocuments} />
         </div>
         <div>
            <h1 className="flex font-bold text-xl justify-start text-blue-900">Incidencias</h1>
            <DataTable columns={columnsIncidences} data={incidencesList} />
         </div>
         <div className="flex flex-col sm:flex-row justify-end items-end mr-5 my-2 gap-3">
            <Button variant="primary" onClick={handleHistoryDocuments}>
               Histórico - Documentos
            </Button>
            <Button variant="primary" onClick={handleHistoryIncidences}>
               Histórico - Incidencias
            </Button>
            <Button variant="danger" onClick={() => setSelectedContract(null)}>
               Cerrar
            </Button>
         </div>
         <HistoryDocuments show={showHistoryDocuments} setShow={setShowHistoryDocuments} control={control} />{' '}
         <HistoryIncidences show={showHistoryincidences} setShow={setShowHistoryIncidences} control={control} />
      </div>
   );
};

export default DocumentList;
