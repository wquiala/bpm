import { useFieldArray } from 'react-hook-form';
import { DataTable } from '../../../components/ui/dataDocumentsTable';
import { columnsIncidencesHistory } from './columnsIncidencesHistory';
import ParentModal from '../CommonComponents/ParentModal';

type Props = {
   show: boolean;
   setShow: (show: boolean) => void;
   control: any;
};

export const HistoryIncidences = ({ show, setShow, control }: Props) => {
   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });

   return (
      <ParentModal size="xl" title="Históricos de incidencias" show={show} setShow={setShow}>
         <div className="flex w-full justify-center items-center flex-col">
            {fields.map((doc: any) => {
               const incidences = doc.incidences;
               let hist: any[] = [];
               if (incidences.length > 0) {
                  incidences.map((inci: any) => {
                     inci.IncidenciaDocumentoHistory.map((h: any) => {
                        hist.push({
                           Incidencia: inci.TipoDocumentoIncidencia.MaestroIncidencias.Nombre,
                           Comentarios: h.Nota,
                           EstadoIncidencia: h.Resuelta ? 'Resuelta' : 'No resuelta',
                           Fecha_estado: new Date(h.updatedAt).toLocaleString(),
                        });
                     });
                  });
                  return (
                     <div key={doc.documentHistory}>
                        {doc.Nombre}
                        <DataTable data={hist} columns={columnsIncidencesHistory} />
                     </div>
                  );
               }
            })}
         </div>
      </ParentModal>
   );
};
/* const incidences = doc.incidences.map((f: any) => f);
               let histIn: IncidenceHistory[] = [];
               if (incidences.length > 0) {
                  const history = incidences.map((inci: any) => {
                     histIn = inci.IncidenciaDocumentoHistory.map((hist: any) => {
                        return {
                           Incidencia: inci.MaestroIncidencias.Nombre,
                           Comentarios: hist.Nota,
                           EstadoIncidencia: hist.Resuelta ? 'Resuelta' : 'No resuelta',
                           Fecha_estado: hist.createdAt,
                        };
                     });
                     console.log(histIn);
                  });
               }
               return (
                  <>
                     <div>{doc.Nombre}</div>
                     <DataTable data={histIn} columns={columnsIncidencesHistory} />
                  </>
               ); */
