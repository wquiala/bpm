import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';

type Props = {
   control: any;
};

const ContractFormInputs = ({ control }: Props) => {
   const AD = control._defaultValues.AnuladoSEfecto;
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
               <InputField control={control} name="ResultadoFDCON" type="text" label="Resultado Firma Con" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField
                  control={control}
                  name="ResultadoFDPRECON"
                  type="text"
                  label="Resultado Firma PRE CON"
                  disabled
               />
            </div>
            <div className="w-full sm:w-1/2">
               <CheckBoxField control={control} name="Conciliar" label="Conciliar" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <CheckBoxField control={control} name="AnuladoSEfecto" label="Anulado sin efecto" disabled />
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
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="MediadorNombre" type="text" label="Mediador" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CompanniaNombre" type="text" label="Compañía" disabled />
            </div>
         </div>

         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DNITomador" type="text" label="DNI del tomador" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="NombreTomador" type="text" label="Nombre del tomador" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField
                  control={control}
                  name="FechaValidezDNITomador"
                  type="text"
                  label="Fecha de validez del DNI de tomador"
                  disabled
               />
            </div>
         </div>

         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DNIAsegurado" type="text" label="InsuranceDNI" disabled />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="NombreAsegurado" type="text" label="InsuranceName" disabled />
            </div>
         </div>
      </div>
   );
};

export default ContractFormInputs;
