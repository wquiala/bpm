import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { defaultValues, schema } from '../common-components/schemasRevisar';
import { t } from 'i18next';

interface Props {
   incidences: any;
   control: any;
}

export const Incidences = ({ incidences, control }: Props) => {
   const { fields } = useFieldArray({
      control,
      name: 'incidences',
   });

   const {} = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema(t)),
      defaultValues: defaultValues,
   });
   return (
      <div className="flex flex-col gap-3">
         {fields.map((item: any, index: number) => {
            console.log(item);
            return (
               <div key={item.id}>
                  <div className="flex gap-2 items-center">
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
                        <InputField label="Mediador" control={control} name={`incidences.${index}.mediador`} disabled />
                     </div>
                     <div className="w-1/6">
                        <CheckBoxField label="Revisado" control={control} name={`incidences.${index}.revisada`} />
                     </div>
                  </div>
               </div>
            );
         })}
      </div>
   );
};
