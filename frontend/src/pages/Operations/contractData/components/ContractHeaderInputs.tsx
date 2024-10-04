import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import { useAppSelector } from '@/stores/hooks';
import React from 'react';

type Props = {
   control: any;
};

const ContractHeaderInputs = ({ control }: Props) => {
   const { caja, lote, companyList, company } = useAppSelector((state) => state.settings);

   return (
      <div className="box p-4 m-4 mb-2">
         <h2 className="flex font-bold text-2xl justify-center text-blue-900">
            {control._defaultValues.EstadoContrato}
         </h2>
         <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField control={control} name="CCC" type="text" label="CCC" disabled />
               </div>
               <div className="w-full">
                  <InputField control={control} name="CodigoSolicitud" type="text" label="RequestCode" disabled />
               </div>

               <div className="w-full">
                  <InputField control={control} name="CodigoPoliza" type="text" label="PolicyCode" disabled />
               </div>
            </div>
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField control={control} name="DNIAsegurado" type="text" label="InsuranceDNI" disabled />
               </div>
               <div className="w-full">
                  <InputField control={control} name="NombreAsegurado" type="text" label="InsuranceName" disabled />
               </div>
               <div className="w-full">
                  <InputField control={control} name="FechaOperacion" type="text" label="Fecha Operación" disabled />
               </div>
            </div>
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField control={control} name="EstadoContrato" type="text" label="Estado" disabled />
               </div>
               <div className="w-full">
                  <InputField control={control} name="Mediador" type="text" label="Mediador" disabled />
               </div>
               <div className="w-full"></div>
               <div className="w-full flex gap-2 flex-1 items-end mb-5">
                  <CheckBoxField control={control} name="Revisar" label="Revisar" disabled />
                  <CheckBoxField control={control} name="Conciliar" label="Conciliar" disabled />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContractHeaderInputs;
