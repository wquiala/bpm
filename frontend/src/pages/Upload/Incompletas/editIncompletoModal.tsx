import ParentModal from '@/custom-components/Modals/ParentModal';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues, schema } from './schemasIncompleto';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import ContractFormInputsIncompletas from './ContractFormInputs';
import Button from '@/components/Base/Button';

interface Props {
   showEdit: boolean;
   setShowEdit: any;
   incompletaData: any;
}
export const EditIncompletoModal = ({ showEdit, setShowEdit, incompletaData }: Props) => {
   const {
      control,
      reset,

      formState: { isValid },
      handleSubmit,
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema(t)),
      defaultValues: defaultValues,
   });

   const onSubmit = (data: any) => {
      console.log(data);
   };
   useEffect(() => {
      const resetFields = async () => {
         reset({
            Compania: incompletaData.Compania,
            Producto: incompletaData.Producto,
            FechaOperacion: incompletaData.FechaOperacion,
            TipoOperacion: 'ALTA',
            CCC: incompletaData.CCC,
            CodigoSolicitud: incompletaData.CodigoSolicitud,
            CodigoPoliza: incompletaData.CodigoPoliza,
            FechaEfecto: incompletaData.FechaEfecto,
            Suplemento: incompletaData.Suplemento,
            DNIAsegurado: incompletaData.DNIAsegurado,
            NombreAsegurado: incompletaData.NombreAsegurado,
            FechaNacimientoAsegurado: incompletaData.FechaNacimientoAsegurado,
            CSRespAfirmativas: incompletaData.CSRespAfirmativas,
            ProfesionAsegurado: incompletaData.ProfesionAsegurado,
            DeporteAsegurado: incompletaData.DeporteAsegurado,
            DNITomador: incompletaData.DNITomador,
            FechaValidezDNITomador: incompletaData.FechaValidezDNITomador,
            NombreTomador: incompletaData.NombreTomador,
            Mediador: incompletaData.Mediador,
            Operador: incompletaData.Operador,
            IndicadorFDPRECON: incompletaData.IndicadorFDPRECON,
            TipoEnvioPRECON: incompletaData.TipoEnvioPRECON,
            ResultadoFDPRECON: incompletaData.ResultadoFDPRECON,
            IndicadorFDCON: incompletaData.IndicadorFDCON,
            TipoEnvioCON: incompletaData.TipoEnvioCON,
            ResultadoFDCON: incompletaData.ResultadoFDCON,

            Revisar: incompletaData.Revisar,
            Conciliar: incompletaData.Conciliar,
         });
      };

      if (incompletaData) {
         resetFields();
      }
   }, [showEdit]);
   return (
      <ParentModal show={showEdit} setShow={setShowEdit} size="xl" hideFooter>
         <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
            <ContractFormInputsIncompletas control={control} />
            <Button variant="primary" disabled={!isValid} type="submit">
               Editar
            </Button>
         </form>
      </ParentModal>
   );
};
