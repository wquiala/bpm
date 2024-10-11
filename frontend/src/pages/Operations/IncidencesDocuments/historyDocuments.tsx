import { useFieldArray } from 'react-hook-form';
import { DataTable } from '../../../components/ui/dataDocumentsTable';
import { columnsDocumentsHistory, DocumentHistory } from './columnsDocumentsHistory';
import ParentModal from '@/custom-components/Modals/ParentModal';

type Props = {
   show: boolean;
   setShow: (show: boolean) => void;
   control: any;
};

export const HistoryDocuments = ({ show, setShow, control }: Props) => {
   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });

   return (
      <ParentModal size="xl" title="Históricos de documentos" show={show} setShow={setShow} hideFooter>
         <div className="flex w-full justify-center items-center flex-col">
            {fields.map((doc: any) => {
               console.log(doc);
               const history: DocumentHistory[] = doc.documentHistory.map((f: any) => ({
                  Familia_Documento: doc.Familia,
                  Documento: doc.Nombre,
                  Fecha_estado: f.FechaEstado ? new Date(f.FechaEstado).toLocaleString() : 'Sin fecha',

                  Codigo: doc.Codigo,
                  Estado: f.EstadoDoc,
                  Fase: doc.Fase,
                  TipoConciliacion: f.TipoConciliacionId ? f.TipoConciliacion : 'Sin conciliar',
                  Caja: f.CajaLoteId ? f.Caja : 'Sin caja asignada',
                  Lote: f.CajaLoteId ? f.Lote : 'Sin lote asignado',
               }));
               return (
                  <div key={doc.id}>
                     <div>{doc.Nombre}</div>
                     <DataTable data={history} columns={columnsDocumentsHistory} />
                  </div>
               );
            })}
         </div>
      </ParentModal>
   );
};
