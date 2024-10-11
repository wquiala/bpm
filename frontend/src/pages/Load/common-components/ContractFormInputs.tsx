import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';

type Props = {
   control: any;
};

const ContractFormInputs = ({ control }: Props) => {
   return (
      <div className="box p-4 m-4 mb-2">
         {/* Primera Fila */}
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="ClaveOperacion" type="text" label="Clave de operación" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="EstadoContrato" type="text" label="Estado" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CompanniaNombre" type="text" label="Compañía" disabled />
            </div>
            <div className="w-full sm:w-1/2 self-center ">
               <CheckBoxField
                  control={control}
                  name="AnuladoSEfecto"
                  label={control._defaultValues.AnuladoSEfecto ? 'Contrato anulado' : 'Anular contrato'}
                  disabled={control._defaultValues.EstadoContrato == 'ANULADA'}
               />
            </div>
         </div>
         {/* Segunda Fila */}
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CCC" type="text" label="CCC" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CodigoSolicitud" type="text" label="RequestCode" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CodigoPoliza" type="text" label="PolicyCode" disabled />
            </div>
         </div>
         {/* Tercera Fila */}
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField
                  control={control}
                  name="FechaOperacion"
                  type="date"
                  label="RegistrationDateRequest"
                  disabled
               />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="ProductoNombre" type="text" label="Producto" disabled />
            </div>
            {/* <div className="w-full sm:w-1/2">
               <InputField control={control} name="DNITomador" type="text" label="DNI del tomador" disabled />
            </div> */}
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DNIAsegurado" type="text" label="InsuranceDNI" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DNITomador" type="text" label="DNI Tomador" disabled />
            </div>
         </div>
      </div>
   );
};

export default ContractFormInputs;
