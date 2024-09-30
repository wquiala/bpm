import React from 'react';
import Alert from '@/components/Base/Alert';
import { Disclosure } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import clsx from 'clsx';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Props = {
   control: any;
   index: number;
   getValues: any;
};

const IncidenceList = ({ control, index, getValues }: Props) => {
   const { t } = useTranslation();

   const { fields } = useFieldArray<any>({
      control,
      name: 'documents',
   });

   return (
      <div className="box p-2 m-4 ml-8 mt-0 mb-2">
         <Disclosure>
            {({ open }) => (
               <>
                  <Disclosure.Button className="py-0">
                     {open ? t('hideIncidenceList') : t('showIncidenceList')}
                  </Disclosure.Button>
                  <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                     <div className="pt-0 p-2 m-2 mb-2">
                        {(fields[index] as any).incidences && (fields[index] as any).incidences.length > 0 ? (
                           <div className="flex flex-col gap-0">
                              {(fields[index] as any).incidences.map((item: any, i: any) => {
                                 const isChecked = getValues(`documents.${index}.incidences.${i}.checked`);

                                 return (
                                    <>
                                       <div
                                          key={item.id}
                                          className={clsx([
                                             'flex gap-2 items-center my-0 py-0',
                                             /*                                                 item.name.includes('no se ha recibido') ? 'hidden' : 'block',
                                              */
                                          ])}
                                       >
                                          <div className="w-20">
                                             <InputField
                                                label="Código"
                                                control={control}
                                                name={`documents.${index}.incidences.${i}.Codigo`}
                                                disabled
                                             />
                                          </div>
                                          <div className="w-full">
                                             <InputField
                                                label="Nombre"
                                                control={control}
                                                name={`documents.${index}.incidences.${i}.Nombre`}
                                                disabled
                                             />
                                          </div>
                                          <div>
                                             <CheckBoxField
                                                label="Con/Sin"
                                                control={control}
                                                name={`documents.${index}.incidences.${i}.checked`}
                                                /*                                           disabled={!selectedContract?.Revisar}
                                                 */
                                             />
                                          </div>
                                       </div>
                                       {isChecked ? (
                                          <div className="w-full">
                                             <InputField
                                                placeholder="Inserte su comentario aquí"
                                                control={control}
                                                name={`documents.${index}.incidences.${i}.notas.Nota`}
                                             />
                                          </div>
                                       ) : (
                                          ''
                                       )}
                                    </>
                                 );
                              })}
                           </div>
                        ) : (
                           <Alert variant="soft-secondary" className="flex items-center my-4 justify-center">
                              <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" /> {t('noIncidencesFound')}
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

export default IncidenceList;
