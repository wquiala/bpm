import Alert from '@/components/Base/Alert';
import { Disclosure } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type Props = {
   control: any;
   setValue: any;
};

const DocumentList = ({ control, setValue }: Props) => {
   const { t } = useTranslation();
   const [cor, setC] = useState(false);
   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });
   const handleClickD = () => {
      fields.forEach((field, index) => {
         setValue(`documents.${index}.present`, true); // Update value directly in form state
      });
   };

   return (
      <div className="box p-4 m-4 mb-0">
         <Disclosure defaultOpen>
            {({ open }) => (
               <>
                  <Disclosure.Button>
                     {open ? 'Ocultar lista de documentos' : 'Mostrar lista de documentos'}
                  </Disclosure.Button>
                  <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                     <div className="pt-0 p-2 m-2 mb-2">
                        {fields && fields.length > 0 ? (
                           <table className="w-full">
                              <thead>
                                 <tr className="">
                                    <th>Nombre del documento</th>
                                    <th>Fase</th>
                                    <th>Estado</th>
                                    <th>
                                       <button
                                          type="button"
                                          onClick={handleClickD}
                                          disabled={control._defaultValues.FechaGrabacion}
                                       >
                                          Marcar todos como recibido y correcto
                                       </button>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {fields.map((item, index) => (
                                    <tr key={item.id}>
                                       <td className="w-96">
                                          <InputField control={control} name={`documents.${index}.name`} disabled />
                                       </td>
                                       <td className="w-48">
                                          <InputField control={control} name={`documents.${index}.fase`} disabled />
                                       </td>
                                       <td className="w-48">
                                          <InputField control={control} name={`documents.${index}.estado`} disabled />
                                       </td>
                                       <td>
                                          <CheckBoxField
                                             control={control}
                                             name={`documents.${index}.present`}
                                             disabled={control._defaultValues.FechaGrabacion}
                                          />
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
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
