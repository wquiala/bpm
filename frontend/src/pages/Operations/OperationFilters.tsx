import Button from '@/components/Base/Button';
import Lucide from '@/components/Base/Lucide';
import InputField from '@/custom-components/FormElements/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import handlePromise from '@/utils/promise';
import * as yup from 'yup';
import TypeConciliationService from '@/services/TypeConciliationService';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import Select from '@/custom-components/FormElements/Select';
import conciliateOptions from '@/utils/constants/conciliateOptions';

type Props = {
   onFilter: (filter: any) => void;
};

const OperationFilters = ({ onFilter }: Props) => {
   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   const [conciliationTypes, setConciliationTypes] = useState<any[]>([]);
   const [operationType, setOperationType] = useState<any[]>([{ value: 'Alta', label: 'Alta' }]);

   const defaultValue = {
      nif: '',
      code: '',
      requestCode: '',
      ccc: '',
      operationType: '',
      reconcile: '',
   };

   const searchSchema = () =>
      yup.object().shape({
         nif: yup.string(),
         code: yup.string(),
         requestCode: yup.string(),
         ccc: yup.string(),
         operationType: yup.string(),
         reconcile: yup.string(),
      });

   const { handleSubmit, control, reset } = useForm({
      mode: 'onChange',
      resolver: yupResolver(searchSchema()),
      defaultValues: defaultValue,
   });

   const onResetFilter = () => {
      reset(defaultValue);
   };

   const onSearch = (data: any) => {
      onFilter(data);
   };

   const getConciliationTypes = async () => {
      setLoading(true);
      const [error, response, data] = await handlePromise(TypeConciliationService.getTypeConciliation());
      setLoading(false);

      if (!response.ok) {
         return setAlert({
            type: 'error',
            show: true,
            text: error ?? 'Error while retrieving conciliation data',
         });
      }
      setConciliationTypes(data.map((item: any) => ({ value: item.TipoConciliacionId, label: item.Nombre })) || []);
   };

   useEffect(() => {
      getConciliationTypes();
   }, []);

   return (
      <form className="flex flex-col sm:flex-row gap-0 mb-2 flex-wrap" onSubmit={handleSubmit(onSearch)}>
         <div className="min-w-[250px] px-2">
            <InputField control={control} name="dni" label="NIF/NIE" placeholder="NIF/NIE ..." />
         </div>

         <div className="min-w-[250px] px-2">
            <InputField
               control={control}
               name="code"
               label="Código de Póliza/Pensiones"
               placeholder="Código de Póliza/Pensiones ..."
            />
         </div>

         <div className="min-w-[250px] px-2">
            <InputField
               control={control}
               name="requestCode"
               label="Código Solicitud - Seguros"
               placeholder="Código Solicitud - Seguros ..."
            />
         </div>

         <div className="min-w-[250px] px-2">
            <InputField control={control} name="ccc" label="CCC - UCV" placeholder="CCC - UCV ..." />
         </div>

         {/* <div className="min-w-[250px] px-2">
            <Select
               control={control}
               name="operationType"
               label="Tipo de Operación"
               placeholder="Tipo de Operación ..."
               options={operationType as any[]}
               addNull
            />
         </div> */}

         <div className="min-w-[250px] px-2">
            <Select
               control={control}
               name="reconcile"
               label="Conciliar"
               placeholder="Conciliar ..."
               options={conciliateOptions as any[]}
               addNull
            />
         </div>

         <div className="flex-1 flex justify-center sm:justify-end items-center pt-2 gap-2">
            <Button variant="secondary" type="reset" onClick={onResetFilter}>
               <Lucide icon="Eraser" className="w-6 h-6" />
            </Button>

            <Button variant="primary" type="submit" onClick={handleSubmit(onSearch)}>
               <Lucide icon="Search" className="w-6 h-6" />
            </Button>
         </div>
      </form>
   );
};

export default OperationFilters;
