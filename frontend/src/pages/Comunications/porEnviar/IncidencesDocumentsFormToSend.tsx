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
   const [claves, setClaves] = useState<any>([]);

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
      console.log(data);
      setLoading(true);
      const incidences: any[] = [];
      for (const inci of data.incidences) {
         for (const incidence of inci) {
            incidences.push(incidence);
         }
      }

      // const { data: da, error, response } = await sendEmail(incidences);
      setLoading(false);
      navigate('/');
   };

   const [revisarTodos, setRevisarTodos] = useState(false);
   const [enviarTodos, setEnviarTodos] = useState(false);

   useEffect(() => {
      if (incidencesDocuments && incidencesDocuments.length > 0) {
         const array: any[] = [];
         const incidenceList: any[] = [];

         for (const incidencesDocument of incidencesDocuments) {
            incidenceList.push({
               DocumentoId: incidencesDocument.DocumentoContrato.DocumentoId,
               IncidenciaDocId: incidencesDocument.IncidenciaDocId,
               nombreDocumento: incidencesDocument.DocumentoContrato.MaestroDocumentos.Codigo,
               claveOperacion: incidencesDocument.DocumentoContrato.Contrato.ClaveOperacion,
               incidenciaNombre: incidencesDocument.TipoDocumentoIncidencia.MaestroIncidencias.Nombre,
               mediador: incidencesDocument.DocumentoContrato.Contrato.Mediador.Nombre,
               enviada: incidencesDocument.Enviar,
               emailTo: incidencesDocument.DocumentoContrato.Contrato.Mediador.Email,
            });
         }

         const incidencestoObject = incidenceList.reduce((acc: any, incidence: any) => {
            const clave = incidence.claveOperacion;

            if (!acc[clave]) {
               acc[clave] = [];
            }
            acc[clave].push(incidence);
            return acc;
         }, {} as Record<string, any[]>);

         Object.keys(incidencestoObject).forEach((claveOperacion) => {
            const incidences = incidencestoObject[claveOperacion];
            array.push(incidences);
         });

         if (JSON.stringify(claves) !== JSON.stringify(array)) {
            // Evita actualización innecesaria
            setClaves(array);
         }
      }
   }, [incidencesDocuments, claves]); // Dependencia de incidencesDocuments y claves

   useEffect(() => {
      if (claves.length > 0) {
         reset({
            incidences: claves,
         });
      }
   }, [claves]); // Dependencia solo de claves

   const handleTodoRevisado = () => {
      const newRevisarEstado = !revisarTodos; // Invertir el estado actual

      // Actualizar el estado para todos los elementos en el array de arrays
      claves.forEach((group: any, groupIndex: any) => {
         group.forEach((item: any, index: any) => {
            setValue(`incidences.${groupIndex}.${index}.revisada`, newRevisarEstado);
         });
      });

      setRevisarTodos(newRevisarEstado); // Actualizar el estado de la variable
   };

   return (
      <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
         <div className="pt-0 p-2 m-2 mb-2">
            <div className="flex flex-col gap-3">
               {Array.isArray(claves) && claves.length > 0
                  ? claves.map((group: any, groupIndex: number) => {
                       const clave = group[0].claveOperacion;
                       return (
                          <div key={groupIndex}>
                             <h1>Contrato {clave}</h1>
                             <br />
                             {group.map((item: any, index: number) => {
                                return (
                                   <div key={item.IncidenciaDocId} className="flex gap-2 items-center">
                                      <div className="w-32">
                                         <InputField
                                            label="Doc."
                                            control={control}
                                            name={`incidences.${groupIndex}.${index}.nombreDocumento`}
                                            disabled
                                         />
                                      </div>
                                      <div className="w-full">
                                         <InputField
                                            label="Incidencia"
                                            control={control}
                                            name={`incidences.${groupIndex}.${index}.incidenciaNombre`}
                                            disabled
                                         />
                                      </div>
                                      <div className="w-1/6">
                                         <InputField
                                            label="Mediador"
                                            control={control}
                                            name={`incidences.${groupIndex}.${index}.mediador`}
                                            disabled
                                         />
                                      </div>
                                   </div>
                                );
                             })}
                          </div>
                       );
                    })
                  : 'No hay incidencias para revisar'}
            </div>
         </div>
         <div className="flex flex-col sm:flex-row justify-center items-center my-2 gap-3">
            <Button variant="secondary" onClick={() => navigate('/')}>
               {t('goBack')}
            </Button>
            {Array.isArray(incidencesDocuments) && incidencesDocuments.length > 0 && (
               <Button variant="primary" disabled={!isValid} type="submit">
                  Enviar
               </Button>
            )}
         </div>
      </form>
   );
};

export default IncidencesDocumentsFormToSend;
