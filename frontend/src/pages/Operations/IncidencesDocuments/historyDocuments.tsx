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
import ParentModal from '../CommonComponents/ParentModal';

type Props = {
   show: boolean;
   setShow: (show: boolean) => void;
   control: any;
};

export const HistoryDocuments = ({ show, setShow, control }: Props) => {
   const { t } = useTranslation();

   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });

   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   return (
      <ParentModal size="xl" title="Históricos de documentos" show={show} setShow={setShow}>
         <div className="flex w-full justify-center items-center flex-col">
            {fields.map((doc: any) => {
               const history: DocumentHistory[] = doc.documentHistory.map((f: any) => ({
                  Familia_Documento: doc.Codigo,
                  Grupo_Documento: doc.Nombre,
                  Estado: f.EstadoDoc,
                  Fase: doc.Fase,
                  createdAt: new Date(f.createdAt).toLocaleString('es-ES', {
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric',
                     hour: '2-digit',
                     minute: '2-digit',
                     second: '2-digit',
                  }),
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
