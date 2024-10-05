import { useFieldArray } from 'react-hook-form';
import { DataTable } from '../../../../components/ui/dataDocumentsTable';
import { columnsDocuments, Document } from '../../IncidencesDocuments/columnsDocuments';
import { columnsIncidences } from '../../IncidencesDocuments/columnsIncidences';
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
   const [showHistoryDocuments, setShowHistoryDocuments] = useState<boolean>(false);
   const [showHistoryIncidences, setShowHistoryIncidences] = useState<boolean>(false);

   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });

   const dataDocuments: Document[] = fields.map((doc: any) => {
      return {
         Familia_Documento: doc.Familia,
         Fase: doc.Fase,

         Codigo: doc.Codigo,
         Documento: doc.Nombre,
         Estado: doc.Estado,
         Fecha_estado: doc.FechaEstado ? new Date(doc.FechaEstado).toLocaleDateString() : 'Sin fecha',
         FechaUltimaRecepcion: doc.FechaUltimaRecepcion
            ? new Date(doc.FechaUltimaRecepcion).toLocaleDateString()
            : 'Sin fecha',
         FechaUltimaReclamacion: selectedContract.FechaReclamacion
            ? new Date(selectedContract.FechaReclamacion).toLocaleDateString()
            : 'Sin fecha',
         FechaProximaReclamacion: selectedContract.FechaProximaReclamacion
            ? new Date(selectedContract.FechaProximaReclamacion).toLocaleDateString()
            : 'Sin fecha',
      };
   });

   const incidencesList: any[] = [];

   fields.forEach((doc: any) => {
      doc.incidences.forEach((inci: any) => {
         if (!inci.Resuelta) {
            incidencesList.push({
               Familia_Documento: doc.Familia,
               Incidencia: inci.TipoDocumentoIncidencia.MaestroIncidencias.Nombre,
               Comentarios: inci.Nota,
               Estado_Incidencia: inci.Resuelta ? 'Resuelta' : 'No resuelta',
               Fecha_estado: inci.updatedAt ? new Date(inci.updatedAt).toLocaleDateString() : 'Sin fecha',
               FechaAltaIncidencia: new Date(inci.createdAt).toLocaleDateString(),
               FechaUltimaReclamacion: selectedContract.FechaReclamacion
                  ? new Date(selectedContract.FechaReclamacion).toLocaleDateString()
                  : 'Sin fecha',
               FechaProximaReclamacion: selectedContract.FechaProximaReclamacion
                  ? new Date(selectedContract.FechaProximaReclamacion).toLocaleDateString()
                  : 'Sin fecha',
            });
         }
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
         <HistoryIncidences show={showHistoryIncidences} setShow={setShowHistoryIncidences} control={control} />
      </div>
   );
};

export default DocumentList;
