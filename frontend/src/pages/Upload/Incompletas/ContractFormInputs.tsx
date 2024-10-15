import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';

type Props = {
   control: any;
};

const ContractFormInputsIncompletas = ({ control }: Props) => {
   return (
      <div className="box p-4 m-4 mb-2">
         {/* Primera Fila */}
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField
                  control={control}
                  name="Compania"
                  type="text"
                  label="
                Compañia"
               />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="Producto" type="text" label="Producto" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="Mediador" type="text" label="Mediador" />
            </div>
            <div className="w-full sm:w-1/2 self-center ">
               <CheckBoxField control={control} name="AnuladoSEfecto" label="Anulado sin Efecto" />
            </div>
         </div>
         {/* Segunda Fila */}
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CCC" type="text" label="CCC" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CodigoSolicitud" type="text" label="RequestCode" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CodigoPoliza" type="text" label="PolicyCode" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="FechaOperacion" type="text" label="Fecha Operación" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="TipoOperacion" type="text" label="Tipo Operación" />
            </div>
         </div>
         {/* Tercera Fila */}
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DNIAsegurado" type="text" label="InsuranceDNI" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="FechaEfecto" type="text" label="Fecha de efecto" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="Suplemento" type="text" label="Suplemento" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="NombreAsegurado" type="text" label="Nombre Asegurado" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField
                  control={control}
                  name="FechaNacimientoAsegurado"
                  type="text"
                  label="Fecha de nacimiento asegurado"
               />
            </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CSRespAfirmativas" type="text" label="CS Resp. afirmaticas" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="ProfesionAsegurado" type="text" label="Profesion Asegurado" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DeporteAsegurado" type="text" label="Deporte Asegurado" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DNITomador" type="text" label="DNI Tomador" />
            </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField
                  control={control}
                  name="FechaValidezDNITomador"
                  type="text"
                  label="Fecha Validez DNI Tomador"
               />
            </div>{' '}
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="Operador" type="text" label="Operador" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="IndicadorFDPRECON" type="text" label="Indicador FD PRECON" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="TipoEnvioPRECON" type="text" label="Tipo envío PRECON" />
            </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="ResultadoFDPRECON" type="text" label="Resultado FD PRECON" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="IndicadorFDCON" type="text" label="Indicador FDCON" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="TipoEnvioCON" type="text" label="Tipo envío CON" />
            </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="ResultadoFDCON" type="text" label="Resultado FD CON" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="Revisar" type="text" label="Revisar" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="Conciliar" type="text" label="Conciliar" />
            </div>
         </div>
      </div>
   );
};

export default ContractFormInputsIncompletas;
