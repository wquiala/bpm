import Button from '@/components/Base/Button';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import InputField from '@/custom-components/FormElements/InputField';
import { HistoryContract } from '../../contract/historyDocuments';
import { useEffect, useState } from 'react';

type Props = {
   control: any;
   setSelectedContract: any;
   selectedContract: any;
};

const ContractAdiniotalDataInputs = ({ control, setSelectedContract, selectedContract }: Props) => {
   const [showHistoryContract, setShowHistoryContract] = useState<boolean>(false);

   const handleOperationHistory = () => {
      setShowHistoryContract(true);
   };

   return (
      <div className="box p-4 m-4 mb-2">
         <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField control={control} name="Producto" type="text" label="Producto" disabled />
               </div>

               <div className="w-full">
                  <InputField control={control} name="FechaEfecto" type="text" label="Fecha efecto" disabled />
               </div>

               <div className="w-full flex gap-2 flex-1 items-end mb-5">
                  <CheckBoxField control={control} name="IndicadorFDCON" label="Indicador FDCON" disabled />
                  <CheckBoxField control={control} name="IndicadorFDPRECON" label="Indicador FDPRECON" disabled />
               </div>
            </div>
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField control={control} name="TipoOperacion" type="text" label="Tipo de Operación" disabled />
               </div>
               <div className="w-full flex gap-2 flex-1 items-start mt-8">
                  <CheckBoxField control={control} name="Suplemento" label="Suplemento" disabled />
                  <CheckBoxField control={control} name="AnuladoSE" label="Anulado sin efecto" disabled />
               </div>
            </div>
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField control={control} name="Operador" type="text" label="Operador" disabled />
               </div>
               <div className="w-full">
                  <InputField
                     control={control}
                     name="TipoConciliacion"
                     type="text"
                     label="Tipo de Concialiación"
                     disabled
                  />
               </div>
            </div>
         </div>

         <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField control={control} name="EdadAsegurado" type="text" label="Edad Asegurado" disabled />
               </div>

               <div className="w-full">
                  <InputField
                     control={control}
                     name="DeporteAsegurado"
                     type="text"
                     label="Deporte Asegurado"
                     disabled
                  />
               </div>
            </div>
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField
                     control={control}
                     name="FechaNacimientoAsegurado"
                     type="text"
                     label="Fecha Nacimiento Asegurado"
                     disabled
                  />
               </div>
               <div className="w-full">
                  <InputField
                     control={control}
                     name="ProfesionAsegurado"
                     type="text"
                     label="Profesión Asegurado"
                     disabled
                  />
               </div>
            </div>
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full flex gap-2 flex-1 items-start mt-8">
                  <CheckBoxField control={control} name="CSRespAfirm" label="CS Resp Afirm" disabled />
               </div>
            </div>
         </div>

         <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  {' '}
                  <InputField control={control} name="DNITomador" type="text" label="DNI Tomador" disabled />
               </div>
            </div>
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField control={control} name="NombreTomador" type="text" label="Nombre Tomador" disabled />
               </div>
            </div>
            <div className="flex flex-col gap-0 w-full sm:w-1/3">
               <div className="w-full">
                  <InputField
                     control={control}
                     name="FechaDNITomador"
                     type="text"
                     label="Fecha Validez DNI Tomador"
                     disabled
                  />
               </div>
            </div>
         </div>

         <div className="flex flex-col sm:flex-row justify-end items-end mr-5 my-2 gap-3">
            <Button variant="primary" onClick={handleOperationHistory}>
               Histórico de operaciones
            </Button>
            <Button variant="danger" onClick={() => setSelectedContract(null)}>
               Cerrar
            </Button>
         </div>
         <HistoryContract
            show={showHistoryContract}
            setShow={setShowHistoryContract}
            selectedContract={selectedContract}
         />
      </div>
   );
};

export default ContractAdiniotalDataInputs;
