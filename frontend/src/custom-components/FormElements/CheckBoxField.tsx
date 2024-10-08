import { Controller } from 'react-hook-form';
import { FormCheck } from '@/components/Base/Form';
import { useTranslation } from 'react-i18next';

type Props = {
   control: any;
   name: string;
   labelEnabled?: boolean;
   label?: string;
   disabled?: boolean;
   onChange?: (value: boolean) => void;
};

const CheckBoxField = ({
   control,
   name,
   labelEnabled = true,
   label,
   disabled = false,
   onChange: customOnChange,
}: Props) => {
   const { t } = useTranslation();

   return (
      <div className="flex items-center justify-center mr-auto">
         <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
               <>
                  <FormCheck.Input
                     disabled={disabled}
                     type="checkbox"
                     name={name}
                     value={value}
                     checked={value}
                     onChange={(e) => {
                        onChange(e.target.checked); // Llamamos a la función onChange de react-hook-form
                        if (customOnChange) customOnChange(e.target.checked); // Llamamos al onChange personalizado si está definido
                     }}
                     onBlur={onBlur}
                     className="mr-2 border"
                  />
                  <div className="">
                     {labelEnabled && (
                        <label className="mt-2 mb-5 cursor-pointer select-none font-medium">
                           {label ? t(label) : ''}
                        </label>
                     )}
                     {error && <div className="text-danger">{error.message}</div>}
                  </div>
               </>
            )}
         />
      </div>
   );
};

export default CheckBoxField;
