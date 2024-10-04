import Alert from '@/components/Base/Alert';
import { Disclosure } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, ChangeEvent } from 'react';
import Button from '@/components/Base/Button';

type Props = {
   control: any;
   setValue: any;
   watch: any;
   getValues: any;
};

const DocumentList = ({ control, setValue, getValues, watch }: Props) => {
   const { t } = useTranslation();
   const [to, setTo] = useState(false);
   const [isPresent, setPresent] = useState(0);
   const [porEmail, setEmail] = useState(false);

   const { fields } = useFieldArray({
      control,
      name: 'documents',
   });

   const handleOnchangePresent = (index: any) => {
      setValue(`documents.${index}.porEmail`, false);
      fields.forEach((field, index) => {
         setValue(`documents.${index}.porEmail`, false);
      });
   };
   const handleOnchangeEmail = (index: any) => {
      fields.forEach((field, index) => {
         setValue(`documents.${index}.present`, false);
      });
   };
   const handleClickD = () => {
      if (to == false) {
         fields.forEach((field, index) => {
            setValue(`documents.${index}.present`, true); // Update value directly in form state
         });
         setTo(true);
      } else if (to == true) {
         fields.forEach((field, index) => {
            setValue(`documents.${index}.present`, false); // Update value directly in form state
         });
         setTo(false);
      }
   };

   useEffect(() => {
      setPresent(fields.filter((doc: any) => doc.estado == 'PRESENTE CORRECTO').length);
   }, [fields]);

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
                                    <th className="">Fase</th>
                                    <th>Estado</th>
                                    <th>
                                       <Button
                                          className="w-full"
                                          type="button"
                                          variant="primary"
                                          onClick={handleClickD}
                                       >
                                          Marcar todos como recibido y correcto
                                       </Button>
                                    </th>
                                    <th>Enviados por email</th>
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
                                             onChange={() => handleOnchangePresent(index)}
                                             disabled={
                                                control._defaultValues.documents[index].present == true ||
                                                getValues(`documents.${index}.porEmail`)
                                             }
                                          />
                                       </td>
                                       <td>
                                          <CheckBoxField
                                             control={control}
                                             name={`documents.${index}.porEmail`}
                                             disabled={
                                                control._defaultValues.documents[index].present == true ||
                                                control._defaultValues.EstadoContrato == 'ANULADA'
                                             }
                                             onChange={() => handleOnchangeEmail(index)}
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
