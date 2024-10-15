import Button from '@/components/Base/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';

import InputField from '@/custom-components/FormElements/InputField';

import { defaultValues, schema } from '../common-components/schemasRevisar';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import handlePromise from '@/utils/promise';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';

type Props = {
   incidencesDocuments: any;
   setIncidencesDocuments: any;
};

const IncidencesDocumentsFormToCheck = ({ incidencesDocuments, setIncidencesDocuments }: Props) => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);
   const {
      control,
      reset,
      setValue,

      formState: { isValid },
      handleSubmit,
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema(t)),
      defaultValues: defaultValues,
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
   /*    const [enviarTodos, setEnviarTodos] = useState(false);
    */
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

         console.log(array);

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

   let contenido;

   if (Array.isArray(incidencesDocuments)) {
      if (incidencesDocuments.length > 1) {
         contenido = (
            <div className="flex justify-end gap-11">
               <Button variant="primary" type="button" onClick={handleTodoRevisado}>
                  Marcar todo como revisado
               </Button>
            </div>
         );
      } else if (incidencesDocuments.length === 1) {
         contenido = '';
      } else {
         contenido = <div>No hay incidencias que revisar</div>;
      }
   } else {
      contenido = <div>No hay incidencias que revisar</div>;
   }

   return (
      <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
         <div className="pt-0 p-2 m-2 mb-2">
            {contenido}

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
