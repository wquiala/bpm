import Button from '@/components/Base/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';

import { defaultValues, schema } from '../../AltaManual/schemas';
import ContractFormInputs from '../../AltaManual/components/ContractFormInputs';
import { useAppSelector } from '@/stores/hooks';

import { createContract } from '@/helpers/FetchData/contracts';
import { parserDate } from '@/helpers/parseDate';
import { AlertContext } from '@/utils/Contexts/AlertContext';

type Props = {
   /*  selectedContract: any;
   setSelectedContract: (contract: any) => void; */
};

const AltaManualForm = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();

   const { company } = useAppSelector((state) => state.settings);
   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   const { control, reset, setValue, getValues, handleSubmit } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema(t)),
      defaultValues: defaultValues,
   });

   const onSubmit = async (data: any) => {
      console.log(data);

      setLoading(true);

      //Preparamos los datos del contrato que se van a cargar

      let in30days;
      if (data.fechaOperacion) {
         const givenDateStr = parserDate(data.fechaOperacion);

         // Crear una instancia de Moment.js a partir de la fecha dada
         const givenDate = moment(givenDateStr, 'YYYY-MM-DD');

         // Calcular la fecha dentro de 30 días
         in30days = givenDate.add(30, 'days');
      }

      if (company?.Nombre == 'UNI' && !data.CCC) {
         setLoading(false);
         return setAlert({
            type: 'error',
            show: true,
            text: 'Para la Unicorp es obligatorio introducir CCC',
         });
      }

      const dataContract = {
         EstadoContrato: 'PENDIENTE',
         ClaveOperacion: data.CodigoPoliza ? data.CodigoPoliza : data.CodigoSolicitud,
         CompaniaNombre: data.CompaniaNombre,
         ProductoCodigo: data.ProductoNombre,
         MediadorCodigo: data.MediadorNombre,

         FechaOperacion: new Date(data.FechaOperacion),
         TipoOperacion: 'ALTA',
         CCC: data.CCC ?? '',
         CodigoSolicitud: data.CodigoSolicitud ?? '',
         CodigoPoliza: data.CodigoPoliza ?? '',
         FechaEfecto: new Date(data.FechaEfecto),
         AnuladoSEfecto: data.AnuladoSEfecto,
         DNIAsegurado: data.DNIAsegurado ?? '',
         NombreAsegurado: data.NombreAsegurado ?? '',
         FechaNacimientoAsegurado: new Date(data.FechaNacimientoAsegurado),
         ProfesionAsegurado: data.ProfesionAsegurado ?? '',
         DeporteAsegurado: data.DeporteAsegurado,
         DNITomador: data.DNITomador ?? '',
         FechaValidezDNITomador: new Date(data.FechaValidezDNITomador),
         NombreTomador: data.NombreTomador ?? '',
         Operador: data.Operador ?? '',
         FechaGrabacion: new Date(),
         Revisar: false,
         Conciliar: false,
         FechaProximaReclamacion: in30days,
      };

      const { error: errorC, response: responseC } = await createContract(dataContract);

      if (!responseC.ok) {
         setLoading(false);
         return setAlert({
            type: 'error',
            show: true,
            text: errorC ?? 'Error mientras se creaba el contrato',
         });
      }
      setLoading(false);

      setAlert({
         type: 'success',
         show: true,
         text: 'Contrato grabado correctamente',
      });
      reset();
      /*       setSelectedContract(null);
       */
   };

   useEffect(() => {
      const resetFormFields = async () => {
         reset({
            ...defaultValues,
            CompaniaNombre: company?.Nombre,
         });
      };

      if (company) {
         resetFormFields();
      }
   }, [company]);

   return (
      <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
         <ContractFormInputs control={control} getValue={getValues} setValue={setValue} />

         <div className="flex flex-col sm:flex-row justify-center items-center my-2 gap-3">
            <Button variant="secondary" onClick={() => navigate('/')}>
               {t('goBack')}
            </Button>
            <Button variant="danger" onClick={() => reset()}>
               {t('clearForm')}
            </Button>
            <Button variant="primary" /* disabled={!isValid} */ type="submit">
               Grabar
            </Button>
         </div>
      </form>
   );
};

export default AltaManualForm;
