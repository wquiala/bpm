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

      const resetDocuments = async (selectProduct: string, selectMediador: string) => {
         const codigoProduct = selectProduct.split(' ')[0];
         const codigoMediador = selectMediador.split(' ')[0];
         const { data, response, error } = await getProductsByCodigo(codigoProduct);
         console.log(data.ProductoId);
         if (!response.ok) {
            //Mandar un error aqui
         } else {
            setValue(`ProductoId`, data.ProductoId);
         }

         const { data: dataM, response: resM, error: errM } = await getMediadorByCode(codigoMediador);
         console.log(dataM.MediadorId);
         if (!response.ok) {
            //Lanzar un err aqui
         } else {
            setValue(`MediadorId`, dataM.MediadorId);
         }

         const documentList = [];
         const producto = data.data;
         for (const tipoOp of producto.ProductoTipoOperacion) {
            for (const prodDoc of tipoOp.ProductoDocumento) {
               documentList.push({
                  ProductoDocId: prodDoc.ProductoDocId,
                  fase: prodDoc.Fase,
                  CodigoDoc: prodDoc.MaestroDocumento.DocumentoId,
                  name: prodDoc.MaestroDocumento.Nombre,
                  estado: 'PENDIENTE',
                  correct: false,
                  notCorrect: false,
                  incidences: prodDoc.MaestroDocumento.MaestroIncidencias.map((inci: any) => {
                     return {
                        IncidenciaId: inci.IncidenciaId,
                        DocAsociadoId: inci.DocAsociadoId,

                        Codigo: inci.Codigo,
                        Nombre: inci.Nombre,
                        estado: inci.EstadoDoc,

                        checked: false,
                        notas: '',
                        /* Comentario: contractDocument.IncidenciaDocumento.map((inci: any) => {
                     return inci.Nota;
                  }), */
                     };
                  }),
               });
            }
         }

         setValue(`documents`, documentList);
      };

      if (getValue(`ProductoNombre`) != '' && getValue(`MediadorNombre`) != '') {
         resetDocuments(getValue(`ProductoNombre`), getValue(`MediadorNombre`));
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
            <div className="w-full sm:w-1/2 self-center ">
               <CheckBoxField control={control} name="AnuladoSEfecto" label="Anular" />
            </div>
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
               <InputFieldDynamic
                  control={control}
                  name="ProductoNombre"
                  label="Producto"
                  data={products}
                  getValues={getValue}
                  setValue={setValue}
               />
            </div>
            <div className="w-full sm:w-1/2 z-50">
               <InputFieldDynamic
                  control={control}
                  name="MediadorNombre"
                  type="text"
                  label="Mediador"
                  data={mediadores}
                  getValues={getValue}
                  setValue={setValue}
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
               <InputField control={control} name="Profesion" type="text" label="Profesión" />
            </div>
            <div className="w-full sm:w-1/2">
               <InputField control={control} name="Deporte" type="text" label="Deporte" />
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
