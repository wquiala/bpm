import React from 'react';
import { useController, Control } from 'react-hook-form';

type CheckBoxFieldProps = {
   label: string;
   name: string;
   control: Control<any>;
   disabled?: boolean;
};

export const CheckBoxField = ({ label, name, control, disabled }: CheckBoxFieldProps) => {
   const {
      field: { value, onChange, onBlur },
      fieldState: { error },
   } = useController({
      name,
      control,
      defaultValue: false, // Default value for the checkbox
   });

   return (
      <div className="flex items-center gap-2">
         <input
            type="checkbox"
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
         />
         <label className="text-sm text-gray-700 dark:text-gray-300">{label}</label>
         {error && <span className="text-red-600 text-xs ml-2">{error.message}</span>}
      </div>
   );
};

export default CheckBoxField;
