import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { FormInput, FormLabel } from '@/components/Base/Form';
import { useTranslation } from 'react-i18next';
import Lucide, { Icon } from '@/components/Base/Lucide';
import { useEffect, useRef, useState } from 'react';

type Props = {
   control: any;
   name: string;
   type?: string;
   labelEnabled?: boolean;
   info?: string;
   label?: string;
   placeholder?: string;
   disabled?: boolean;
   showIcon?: boolean;
   icoName?: Icon;
   animationDirection?: string;
   disableM?: boolean;
   accept?: string;
   data: any[];
   getValues: any;
   setValue: any;
};

const words = [
   'React',
   'JavaScript',
   'TypeScript',
   'Node.js',
   'Next.js',
   'Vue',
   'Angular',
   'Svelte',
   'Express',
   'MongoDB',
   'PostgreSQL',
   'GraphQL',
   'REST API',
   'Docker',
   'Kubernetes',
];

export interface Producto {
   ProductId: number;
   CompId: number;
   Codigo: number;
   Descripcion: string;
}

export const InputFieldDynamic = ({
   control,
   name,
   type = 'text',
   labelEnabled = true,
   info,
   label,
   placeholder,
   disabled = false,
   showIcon = false,
   icoName = 'Bone',
   animationDirection = 'intro-x',
   disableM = false,
   accept,
   data,
   getValues,
   setValue,
}: Props) => {
   const { t } = useTranslation();

   const [inputValue, setInputValue] = useState('');
   const [suggestions, setSuggestions] = useState<any[]>([]);
   const [isFocused, setIsFocused] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);
   const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

   useEffect(() => {
      if (isFocused && inputValue.trim() === '') {
         setSuggestions(data);
      } else if (inputValue.trim() !== '') {
         const filteredSuggestions = data.filter((d) =>
            `${d.codigo}-${d.name}`.toLowerCase().includes(inputValue.toLowerCase()),
         );
         setSuggestions(filteredSuggestions);
      } else {
         setSuggestions([]);
      }
   }, [inputValue, isFocused]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
      const value = e.target.value;
      setInputValue(value);
      onChange(value);
      setHighlightedIndex(-1); // Resetear la selección cuando el input cambia
   };

   const handleInputFocus = () => {
      setIsFocused(true);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, onChange: (value: any) => void) => {
      if (e.key === 'ArrowDown') {
         setHighlightedIndex((prevIndex) => (prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1));
      } else if (e.key === 'ArrowUp') {
         setHighlightedIndex((prevIndex) => (prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1));
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
         const selectedSuggestion = suggestions[highlightedIndex];
         if (selectedSuggestion) {
            handleSuggestionClick(`${selectedSuggestion.codigo}-${selectedSuggestion.name}`, onChange);
         }
         e.preventDefault(); // Evitar que se envíe el formulario al presionar Enter
      }
   };

   const handleInputBlur = () => {
      setTimeout(() => setIsFocused(false), 200);
   };

   const handleSuggestionClick = (suggestion: string, onChange: (value: any) => void) => {
      setInputValue(suggestion);
      setIsFocused(false);
      onChange(suggestion);
      if (inputRef.current) {
         inputRef.current.focus();
      }
   };

   return (
      <div className={`${disableM ? '' : 'my-3 '} ${animationDirection}`}>
         {labelEnabled && (
            <FormLabel
               htmlFor="validation-form-1"
               className="flex flex-col w-full sm:flex-row font-medium text-xs mb-0"
            >
               {label ? t(label) : ''}
               <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500 font-normal">{info ? t(info) : ''}</span>
            </FormLabel>
         )}

         <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
               <>
                  <div className="relative flex">
                     {showIcon && (
                        <div className="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                           <Lucide icon={icoName} className="w-4 h-4" />
                        </div>
                     )}

                     <FormInput
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e, onChange)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onKeyDown={(e) => handleKeyDown(e, onChange)}
                        formInputSize="sm"
                        ref={inputRef}
                        id="validation-form-1"
                        accept={accept ?? undefined}
                        name={name}
                        disabled={disabled}
                        autoComplete="off"
                        className={clsx([
                           {
                              'border-danger': error,
                           },
                           `block items-center px-4 py-2 ${showIcon && 'pl-12'}`,
                        ])}
                     />
                     {isFocused && suggestions.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-sm max-h-60 overflow-y-auto mt-10">
                           {suggestions.map((suggestion, index) => (
                              <li key={suggestion.codigo}>
                                 <button
                                    type="button"
                                    onClick={() =>
                                       handleSuggestionClick(`${suggestion.codigo} - ${suggestion.name}`, onChange)
                                    }
                                    className={`px-4 py-2 cursor-pointer ${
                                       highlightedIndex === index ? 'bg-gray-200' : ''
                                    }`}
                                 >
                                    {suggestion.codigo}-{suggestion.name}
                                 </button>
                              </li>
                           ))}
                        </ul>
                     )}
                  </div>

                  {error && <div className="mt-2 text-danger">{error.message}</div>}
               </>
            )}
         />
      </div>
   );
};
