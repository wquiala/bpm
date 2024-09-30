import Button from '@/components/Base/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import TextAreaField from '@/custom-components/FormElements/TextArea';
import Lucide from '@/components/Base/Lucide';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';

import { useAppSelector } from '@/stores/hooks';
import InputField from '@/custom-components/FormElements/InputField';

import { defaultValues, schema } from '../common-components/schemasRevisar';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import handlePromise from '@/utils/promise';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';
import { sendEmail } from '@/helpers/FetchData/comunications';

type Props = {
   incidencesDocuments: any;
   setIncidencesDocuments: any;
};

const IncidencesDocumentsFormToSend = ({ incidencesDocuments, setIncidencesDocuments }: Props) => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const { caja, lote } = useAppSelector((state) => state.settings);

   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   const {
      control,
      reset,
      setValue,
      watch,
      getValues,
      formState: { errors, isValid },
      handleSubmit,
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema(t)),
      defaultValues: defaultValues,
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'incidences',
   });

   const onSubmit = async (data: any) => {
      setLoading(true);

      const { data: da, error, response } = await sendEmail(data);
      setLoading(false);
      navigate('/');
   };

   const [revisarTodos, setRevisarTodos] = useState(false);
   const [enviarTodos, setEnviarTodos] = useState(false);

   useEffect(() => {
      const resetFormFiels = async () => {
         const incidenceList = [];

         const incidences = incidencesDocuments.reduce((acc: any, incidenceDoc: any) => {
            const claveOperacion = incidenceDoc.claveOperacion;

            if (!acc[claveOperacion]) {
               acc[claveOperacion] = [];
            }
            acc[claveOperacion].push(incidenceDoc);
            return acc;
         }, {} as Record<string, any[]>);

         console.log(incidences);

         for (const incidencesDocument of incidencesDocuments) {
            incidenceList.push({
               DocumentoId: incidencesDocument.DocumentoContrato.DocumentoId,
               IncidenciaDocId: incidencesDocument.IncidenciaDocId,
               codigoDocumento: incidencesDocument.DocumentoContrato.MaestroDocumentos.Codigo,
               nombreDocumento: incidencesDocument.DocumentoContrato.MaestroDocumentos.Nombre,

               claveOperacion: incidencesDocument.DocumentoContrato.Contrato.ClaveOperacion,
               incidenciaNombre: incidencesDocument.MaestroIncidencias.Nombre,
               mediador: incidencesDocument.DocumentoContrato.Contrato.Mediador.Nombre,
               anular: false,
               emailTo: incidencesDocument.DocumentoContrato.Contrato.Mediador.Email,
               numeroReclamaciones: 0,
               nota: incidencesDocument.Nota,
            });
         }

         reset({
            incidences: incidenceList,
         });
      };
      if (incidencesDocuments) {
         resetFormFiels();
      }
   }, [incidencesDocuments]);

   const handleTodoRevisado = () => {
      if (revisarTodos) {
         fields.map((field, index) => {
            setValue(`incidences.${index}.revisada`, false);
         });
         setRevisarTodos(false);
      } else if (!revisarTodos) {
         fields.map((field, index) => {
            setValue(`incidences.${index}.revisada`, true);
         });
         setRevisarTodos(true);
      }
   };

   /* const handleTodoEnviar = () => {
      if (enviarTodos) {
         fields.map((field, index) => {
            setValue(`incidences.${index}.enviada`, false);
         });
         setEnviarTodos(false);
      } else if (!enviarTodos) {
         fields.map((field, index) => {
            setValue(`incidences.${index}.enviada`, true);
         });
         setEnviarTodos(true);
      }
   }; */
   return (
      <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
         <div className="pt-0 p-2 m-2 mb-2">
            <div className="flex flex-col gap-3">
               {fields.length > 0
                  ? fields.map((item: any, index: number) => {
                       return (
                          <div key={item.id}>
                             <div>{item.claveOperacion}</div>
                             <div className="flex gap-2 items-center">
                                <div className="w-1/3">
                                   <InputField
                                      label="Contrato"
                                      control={control}
                                      name={`incidences.${index}.claveOperacion`}
                                      disabled
                                   />
                                </div>
                                <div className="w-32">
                                   <InputField
                                      label="Doc."
                                      control={control}
                                      name={`incidences.${index}.nombreDocumento`}
                                      disabled
                                   />
                                </div>
                                <div className="w-full">
                                   <InputField
                                      label="Incidencia"
                                      control={control}
                                      name={`incidences.${index}.incidenciaNombre`}
                                      disabled
                                   />
                                </div>
                                <div className="w-1/6">
                                   <InputField
                                      label="Mediador"
                                      control={control}
                                      name={`incidences.${index}.mediador`}
                                      disabled
                                   />
                                </div>
                                {/* `<div className="w-[350px]">
                              <CheckBoxField
                                 label="Anular envío"
                                 control={control}
                                 name={`incidences.${index}.anular`}
                              />
                           </div>` */}
                             </div>
                          </div>
                       );
                    })
                  : 'No hay incidencias que enviar'}
            </div>
         </div>
         <div className="flex flex-col sm:flex-row justify-center items-center my-2 gap-3">
            <Button variant="secondary" onClick={() => navigate('/')}>
               {t('goBack')}
            </Button>

            {incidencesDocuments.length > 0 && (
               <Button variant="primary" disabled={!isValid} type="submit">
                  Enviar
               </Button>
            )}
         </div>
      </form>
   );
};

export default IncidencesDocumentsFormToSend;
