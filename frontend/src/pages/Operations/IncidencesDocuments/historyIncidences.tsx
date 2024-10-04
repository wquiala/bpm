import InputField from '@/custom-components/FormElements/InputField';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import handlePromise from '@/utils/promise';
import * as yup from 'yup';
import LoadService from '@/services/LoadService';
import { DataTable } from '../../../components/ui/dataDocumentsTable';
import { columnsDocumentsHistory, DocumentHistory } from './columnsDocumentsHistory';
import { columnsIncidencesHistory, IncidenceHistory } from './columnsIncidencesHistory';
import ParentModal from '../CommonComponents/ParentModal';

type Props = {
   show: boolean;
   setShow: (show: boolean) => void;
   control: any;
};

export const HistoryIncidences = ({ show, setShow, control }: Props) => {
   const { t } = useTranslation();

   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });

   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   return (
      <ParentModal size="xl" title="Históricos de incidencias" show={show} setShow={setShow}>
         <div className="flex w-full justify-center items-center flex-col">
            {fields.map((doc: any) => {
               const incidences = doc.incidences;
               let hist: any[] = [];
               if (incidences.length > 0) {
                  const history: IncidenceHistory[] = incidences.map((inci: any) => {
                     inci.IncidenciaDocumentoHistory.map((h: any) => {
                        hist.push({
                           Incidencia: inci.TipoDocumentoIncidencia.MaestroIncidencias.Nombre,
                           Comentarios: h.Nota,
                           EstadoIncidencia: h.Resuelta ? 'Resuelta' : 'No resuelta',
                           Fecha_estado: new Date(h.createdAt).toLocaleString(/* 'es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                           } */),
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
