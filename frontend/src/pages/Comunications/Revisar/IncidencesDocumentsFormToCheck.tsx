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
import { todo } from 'node:test';
import handlePromise from '@/utils/promise';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';
import { Incidences } from './Incidences';
import { array } from 'yup';

type Props = {
   incidencesDocuments: any;
   setIncidencesDocuments: any;
};

const IncidencesDocumentsFormToCheck = ({ incidencesDocuments, setIncidencesDocuments }: Props) => {
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

   const [claves, setClaves] = useState<any>([]);

   const onSubmit = async (data: any) => {
      setLoading(true);

      for (const inci of data.incidences) {
         for (const incidence of inci) {
            const toSend = {
               Revisada: incidence.revisada,
               Enviar: incidence.enviada,
               DocumentoId: incidence.DocumentoId,
            };

            const [error, response] = await handlePromise(
               DocumentIncidenceService.updateDocumentIncidence(incidence.IncidenciaDocId, toSend),
            );

            if (!response.ok) {
               setLoading(false);
               return setAlert({
                  type: 'error',
                  show: true,
                  text: error ?? 'Error while updating incidences',
               });
            }
         }
      }

      setLoading(false);
      navigate('/por-enviar');
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
               revisada: incidencesDocument.Revisada,
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
            {Array.isArray(incidencesDocuments) && incidencesDocuments.length > 1 ? (
               <div className="flex justify-end gap-11">
                  <Button variant="primary" type="button" onClick={handleTodoRevisado}>
                     Marcar todo como revisado
                  </Button>
               </div>
            ) : Array.isArray(incidencesDocuments) && incidencesDocuments.length == 1 ? (
               ''
            ) : (
               <div>No hay incidencias que revisar</div>
            )}

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
                                      <div className="w-1/6">
                                         <CheckBoxField
                                            label="Revisado"
                                            control={control}
                                            name={`incidences.${groupIndex}.${index}.revisada`}
                                         />
                                      </div>
                                   </div>
                                );
                             })}
                          </div>
                       );
                    })
                  : ''}
            </div>

            {/*  {fields.map((item: any, index: number) => {
                  return (
                     <div key={item.id}>
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
                           <div className="w-1/6">
                              <CheckBoxField label="Revisado" control={control} name={`incidences.${index}.revisada`} />
                           </div>
                        </div>
                     </div>
                  );
               })} */}
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

export default IncidencesDocumentsFormToCheck;
