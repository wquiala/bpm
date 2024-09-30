import * as React from 'react';

import cn from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputShadCn = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
   return (
      <input
         type={type}
         className={cn(
            'disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent',
            '[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent',
            'transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80',
            className,
         )}
         ref={ref}
         {...props}
      />
   );
});
InputShadCn.displayName = 'InputShadCn';
