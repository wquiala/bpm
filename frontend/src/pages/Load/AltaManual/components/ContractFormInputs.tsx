import { FormSelect } from '@/components/Base/Form';
import TomSelect from '@/components/Base/TomSelect';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import { useAppSelector } from '@/stores/hooks';
import { InputFieldDynamic } from './InputFieldDynamic';
import { useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getMediadorByCode, getMediadores } from '@/helpers/FetchData/mediador';
import { string } from 'yup';
import { getProducts, getProductsByCodigo } from '@/helpers/FetchData/products';

type Props = {
   control: any;
   getValue: any;
   setValue: any;
};

const ContractFormInputs = ({ control, getValue, setValue }: Props) => {
   const [products, setProducts] = useState<{ name: string; codigo: string }[]>([]);
   const [mediadores, setMediadores] = useState<{ name: string; codigo: string }[]>([]);

   const { caja, lote, companyList, company } = useAppSelector((state) => state.settings);
   useEffect(() => {
      const resetFormFields = async () => {
         /*          const docList = ;
          */
         const productList = [];
         const mediadorList = [];

         for (const product of company!.Producto) {
            productList.push({
               name: product.Descripcion,
               codigo: product.Codigo,
            });
         }

         setProducts(productList);

         const { data } = await getMediadores();

         for (const mediador of company!.Mediador) {
            mediadorList.push({
               name: mediador.Nombre,
               codigo: mediador.Codigo,
            });
         }
         setMediadores(mediadorList);
      };

      if (company) {
         resetFormFields();
      }
   }, [company, getValue(`ProductoNombre`), getValue(`MediadorNombre`)]);

   return (
      <div className="box p-4 m-4 mb-2">
         {/* Primera Fila */}
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2 self-center ">
               <CheckBoxField control={control} name="Revisar" label="Revisar" />
            </div>{' '}
            <div className="w-full sm:w-1/2 self-center ">
               <CheckBoxField control={control} name="Conciliar" label="Conciliar" />
            </div>
            {/*  <div className="w-full sm:w-1/2 self-center ">
               <CheckBoxField control={control} name="AnuladoSEfecto" label="Anular" />
            </div> */}
         </div>
         {/* Segunda Fila */}
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CCC" type="text" label="CCC" disabled={company?.Nombre !== 'UNI'} />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CodigoSolicitud" type="text" label="Código de solicitud" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CodigoPoliza" type="text" label="Código de póliza" />
            </div>
         </div>
         {/* Tercera Fila */}
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="FechaOperacion" type="date" label="Fecha de operación" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="FechaEfecto" type="date" label="Fecha de efecto" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="CompaniaNombre" type="text" label="Compañia" disabled />
               {/*  <FormSelect>
                  {companyList.map((element, index) => {
                     return <option value={element.CompaniaId}>{element.Nombre}</option>;
                  })}
               </FormSelect> */}
            </div>
            <div className="w-full sm:w-1/2 z-50">
               <InputField
                  control={control}
                  name="ProductoNombre"
                  type="text"
                  label="Producto"
                  placeholder="Código de producto"
               />
            </div>
            <div className="w-full sm:w-1/2 z-50">
               <InputField
                  control={control}
                  name="MediadorNombre"
                  type="text"
                  label="Mediador"
                  placeholder="Código de mediador"
               />
            </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DNIAsegurado" type="text" label="InsuranceDNI" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="NombreAsegurado" type="text" label="Nombre del asegurado" />
            </div>{' '}
            <div className="w-full sm:w-1/2">
               <InputField
                  control={control}
                  name="FechaNacimientoAsegurado"
                  type="date"
                  label="Fecha nacimiento asegurado"
               />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="ProfesionAsegurado" type="text" label="Profesión" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DeporteAsegurado" type="text" label="Deporte" />
            </div>
         </div>
         <div className="flex flex-col sm:flex-row gap-0  sm:gap-4">
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="DNITomador" type="text" label="DNI del tomador" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="NombreTomador" type="text" label="Nombre del tomador" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField
                  control={control}
                  name="FechaValidezDNITomador"
                  type="date"
                  label="Fecha de validez de DNI del tomador"
               />
            </div>

            <div className="w-full sm:w-1/2">
               <InputField control={control} name="Operador" type="text" label="Operador" />
            </div>
         </div>
      </div>
   );
};

export default ContractFormInputs;
