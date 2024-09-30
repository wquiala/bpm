import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import Alert from '@/components/Base/Alert';
import { Disclosure } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import IncidenceList from './IncidenceList';
import { useTranslation } from 'react-i18next';

type Props = {
   control: any;
   watch: any;
   setValue: any;
   getValues: any;
};

const DocumentList = ({ control, watch, setValue, getValues }: Props) => {
   const { t } = useTranslation();

   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });

   const watchFields = watch('documents'); // Monitorea los cambios en los documentos

   useEffect(() => {
      fields.forEach((_, index: number) => {
         const isCorrect = getValues(`documents.${index}.correct`);
         const isNotCorrect = getValues(`documents.${index}.notCorrect`);

         // Si ambos están seleccionados, se fuerza uno a falso
         if (isCorrect && isNotCorrect) {
            setValue(`documents.${index}.notCorrect`, false);
         }
      });
   }, [watchFields, setValue, getValues, fields]);

   return (
      <div className="box p-4 m-4 mb-0">
         <Disclosure>
            {({ open }) => (
               <>
                  <Disclosure.Button className="py-0">
                     {open ? t('hideDocumentList') : t('showDocumentList')}
                  </Disclosure.Button>
                  <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                     <div className="pt-0 p-2 m-2 mb-2">
                        {fields && fields.length > 0 ? (
                           <div className="flex flex-col gap-3">
                              {fields.map((item: any, index: number) => {
                                 const isCorrect = getValues(`documents.${index}.correct`);
                                 const isNotCorrect = getValues(`documents.${index}.notCorrect`);

                                 const isCorrectState =
                                    item.estado === 'CORRECTO' || item.estado === 'PRESENTE CORRECTO';
                                 const isIncidenceState = item.estado === 'PRESENTE CON INCIDENCIA';

                                 return (
                                    <div key={item.id}>
                                       <div className="flex gap-2 items-center">
                                          <div>
                                             <CheckBoxField
                                                label="Correcto"
                                                control={control}
                                                name={`documents.${index}.correct`}
                                                disabled={isCorrectState}
                                                onChange={() => {
                                                   if (!isCorrect) {
                                                      setValue(`documents.${index}.notCorrect`, false);
                                                      setValue(`documents.${index}.correct`, true);
                                                   }
                                                }}
                                             />
                                          </div>
                                          <div className="w-full">
                                             <InputField
                                                label="Nombre del documento"
                                                control={control}
                                                name={`documents.${index}.name`}
                                                disabled
                                             />
                                          </div>
                                          <div className="w-full">
                                             <InputField
                                                label="Fase"
                                                control={control}
                                                name={`documents.${index}.fase`}
                                                disabled
                                             />
                                          </div>
                                          <div className="w-full">
                                             <InputField
                                                label="Estado"
                                                control={control}
                                                name={`documents.${index}.estado`}
                                                disabled
                                             />
                                          </div>
                                          <div>
                                             <CheckBoxField
                                                label="Incorrecto"
                                                control={control}
                                                name={`documents.${index}.notCorrect`}
                                                disabled={isCorrect || isCorrectState}
                                                onChange={() => {
                                                   if (!isNotCorrect) {
                                                      setValue(`documents.${index}.correct`, false);
                                                      setValue(`documents.${index}.notCorrect`, true);
                                                   }
                                                }}
                                             />
                                          </div>
                                       </div>
                                       <div className="w-full ml-2">
                                          {isCorrect || isCorrectState ? (
                                             <div className="w-full ml-2">Este documento no tiene incidencias</div>
                                          ) : isNotCorrect || isIncidenceState ? (
                                             <IncidenceList control={control} getValues={getValues} index={index} />
                                          ) : (
                                             <div className="w-full ml-2">Documento aún sin recibir</div>
                                          )}
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>
                        ) : (
                           <Alert variant="soft-secondary" className="flex items-center my-4 justify-center">
                              <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" /> {t('noDocumentsFound')}
                           </Alert>
                        )}
                     </div>
                  </Disclosure.Panel>
               </>
            )}
         </Disclosure>
      </div>
   );
};

export default DocumentList;
