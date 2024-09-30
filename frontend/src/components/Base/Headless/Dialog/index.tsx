import { twMerge } from 'tailwind-merge';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { Fragment, createContext, useContext, useMemo, useRef, useState } from 'react';
import { enterAnimation, enterFromAnimation, enterToAnimation, leaveAnimation } from '@/utils/transitions';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

const dialogContext = createContext<{
   open: boolean;
   zoom: boolean;
   size: Size;
}>({
   open: false,
   zoom: false,
   size: 'md',
});

function Dialog({
   children,
   className,
   as = 'div',
   open = false,
   onClose,
   staticBackdrop,
   size = 'md',
   ...props
}: ExtractProps<typeof HeadlessDialog> & {
   size?: Size;
   staticBackdrop?: boolean;
}) {
   const focusElement = useRef<HTMLElement | null>(null);
   const [zoom, setZoom] = useState(false);

   const value = useMemo(
      () => ({
         open: open,
         zoom: zoom,
         size: size,
      }),
      [open, zoom, size],
   );

   return (
      <dialogContext.Provider value={value}>
         <Transition appear as={Fragment} show={open}>
            <HeadlessDialog
               as={as}
               onClose={(value) => {
                  if (!staticBackdrop) {
                     return onClose(value);
                  } else {
                     setZoom(true);
                     setTimeout(() => {
                        setZoom(false);
                     }, 300);
                  }
               }}
               initialFocus={focusElement}
               className={twMerge(['relative z-[60]', className])}
               {...props}
            >
               {children}
            </HeadlessDialog>
         </Transition>
      </dialogContext.Provider>
   );
}

function DialogPanel({
   children,
   className,
   as = 'div',
   ...props
}: ExtractProps<typeof HeadlessDialog.Panel> & {
   size?: Size;
}) {
   const dialog = useContext(dialogContext);
   return (
      <>
         <Transition.Child
            as="div"
            enter={enterAnimation}
            enterFrom={enterFromAnimation}
            enterTo={enterToAnimation}
            leave={leaveAnimation}
            leaveFrom={enterToAnimation}
            leaveTo={enterFromAnimation}
            className="fixed inset-0 bg-black/60"
            aria-hidden="true"
         />
         <Transition.Child
            as="div"
            enter={enterAnimation}
            enterFrom={enterFromAnimation}
            enterTo={enterToAnimation}
            leave={leaveAnimation}
            leaveFrom={enterToAnimation}
            leaveTo={enterFromAnimation}
            className="fixed inset-0 mt-16 overflow-y-auto"
         >
            <HeadlessDialog.Panel
               as={as}
               className={twMerge([
                  'w-[90%] mx-auto bg-white relative rounded-md shadow-md transition-transform dark:bg-darkmode-600',
                  dialog.size == 'md' && 'sm:w-[460px]',
                  dialog.size == 'sm' && 'sm:w-[300px]',
                  dialog.size == 'lg' && 'sm:w-[600px]',
                  dialog.size == 'xl' && 'sm:w-[600px] lg:w-[900px]',
                  dialog.zoom && 'scale-105',
                  className,
               ])}
               {...props}
            >
               {children}
            </HeadlessDialog.Panel>
         </Transition.Child>
      </>
   );
}
Dialog.Panel = DialogPanel;

function DialogTitle({ children, className, as = 'div', ...props }: ExtractProps<typeof HeadlessDialog.Title>) {
   return (
      <HeadlessDialog.Title
         as={as}
         className={twMerge([
            'flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400',
            className,
         ])}
         {...props}
      >
         {children}
      </HeadlessDialog.Title>
   );
}
Dialog.Title = DialogTitle;

function DialogDescription({
   children,
   className,
   as = 'div',
   ...props
}: ExtractProps<typeof HeadlessDialog.Description>) {
   return (
      <HeadlessDialog.Description as={as} className={twMerge(['p-5', className])} {...props}>
         {children}
      </HeadlessDialog.Description>
   );
}
Dialog.Description = DialogDescription;

function DialogFooter<C extends React.ElementType = 'div'>({
   children,
   className,
   as,
   ...props
}: {
   as?: C;
} & React.PropsWithChildren &
   React.ComponentPropsWithoutRef<C>) {
   const Component = as || 'div';

   return (
      <Component
         className={twMerge(['px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400', className])}
         {...props}
      >
         {children}
      </Component>
   );
}
Dialog.Footer = DialogFooter;

export default Dialog;
