import Button from '@/components/Base/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import TextAreaField from '@/custom-components/FormElements/TextArea';
import Lucide from '@/components/Base/Lucide';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import handlePromise from '@/utils/promise';
import ObservationContractService from '@/services/ObservationContractService';
import DocumentList from './DocumentList';
import DocumentContractService from '@/services/DocumentContractService';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';
import ObservationHistory from '../../common-components/ObservationHistory';
import { defaultValues, schema } from '../../common-components/schemas';
import ContractFormInputs from '../../common-components/ContractFormInputs';
import ContractService from '@/services/ContractService';
import { useSelector } from 'react-redux';
import { store } from '@/stores/store';
import { AppDispatch } from '../../../../stores/store';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import InputField from '@/custom-components/FormElements/InputField';

type Props = {
   selectedContract: any;
   setSelectedContract: (contract: any) => void;
};

const ContractForm = ({ selectedContract, setSelectedContract }: Props) => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const { caja, lote } = useAppSelector((state) => state.settings);

   /*    const { caja, lote } = useAppSelector((state) => state.settings);
    */ /* console.log('La caja y lote son ' + caja, lote); */

   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   const {
      control,
      reset,
      setValue,
      formState: { errors, isValid },
      handleSubmit,
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema(t)),
      defaultValues: defaultValues,
   });

   console.log(errors);
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'DetalleObservacion',
   });

   const onSubmit = async (data: any) => {
      const docList = data.documents;
      const observations = data.DetalleObservacion;
      setLoading(true);

      if (!caja || !lote) {
         setLoading(false);

         return setAlert({
            type: 'error',
            show: true,
            text: 'La caja y el lote son obligatorios para la carga',
         });
      }
      //Create observations
      for (const observation of observations) {
         const toSend = {
            ContratoId: selectedContract.ContratoId,
            Contenido: observation.observation,
         };

         const [error, response] = await handlePromise(ObservationContractService.createObservationContract(toSend));
         if (!response.ok) {
            setLoading(false);
            return setAlert({
               type: 'error',
               show: true,
               text: error ?? 'Error while adding observation',
            });
         }
      }

      for (const doc of docList) {
         const toSend = {
            ContratoId: selectedContract.ContratoId,
            Estado: doc.present ? 'PRESENTE CORRECTO' : doc.estado,
         };

         //Mark incidences as resolved
         for (const incidence of doc.incidences) {
            const toSend = {
               ContratoId: selectedContract.ContratoId,
               DocumentoContratoId: incidence.DocumentoContratoId,
               Resuelta: true,
               IncidenciaDocId: incidence.IncidenciaDocId,
            };

            const currentDoc = selectedContract.DocumentoContrato.find(
               (doc: any) => doc.DocumentoId === toSend.DocumentoContratoId,
            );

            const existingIncidence = currentDoc?.IncidenciaDocumento.find(
               (incidence: any) => incidence.IncidenciaDocId === toSend.IncidenciaDocId,
            );
            if (existingIncidence) {
               const [error, response] = await handlePromise(
                  DocumentIncidenceService.updateDocumentIncidence(existingIncidence.IncidenciaDocId, toSend),
               );
               if (!response.ok) {
                  setLoading(false);
                  return setAlert({
                     type: 'error',
                     show: true,
                     text: error ?? 'Error while adding incidence document',
                  });
               }
            }
         }

         //Update document contracts
         const [error, response] = await handlePromise(DocumentContractService.updateDocumentContract(doc.id, toSend));
         if (!response.ok) {
            setLoading(false);
            return setAlert({
               type: 'error',
               show: true,
               text: error ?? 'Error while updating document contract',
            });
         }
      }

      //Aqui actualizamos el contrato

      const ContractData = {
         NotaInterna: data.NotaInterna,
         Caja: Number(caja),
         Lote: Number(lote),
         FechaGrabacion: new Date(),
         EstadoContrato: data.AnuladoSEfecto ? 'ANULADA' : 'TRAMITADA',
         AnuladoSEfecto: data.AnuladoSEfecto ? true : false,
         TipoConciliacionId: selectedContract.TipoConciliacionId ?? Number(13),
         Conciliar: false,
      };

      const [error, response] = await handlePromise(
         ContractService.updateContract(selectedContract.ContratoId, ContractData),
      );
      if (!response.ok) {
         setLoading(false);
         return setAlert({
            type: 'error',
            show: true,
            text: error ?? 'Error while updating contract',
         });
      }

      setLoading(false);

      setAlert({
         type: 'success',
         show: true,
         text: 'Grabación realizada correctamente',
      });

      setSelectedContract(null);
   };

   useEffect(() => {
      const resetFormFiels = async () => {
         const docList = [];
         const contractDocuments = selectedContract?.DocumentoContrato;

         for (const contractDocument of contractDocuments) {
            docList.push({
               id: contractDocument.DocumentoId,
               docTypeId: contractDocument.DocId,
               present: contractDocument.EstadoDoc == 'PRESENTE CORRECTO',
               name: contractDocument.MaestroDocumentos.Nombre,
               estado: contractDocument.EstadoDoc,
               fase: contractDocument.ProductoDocumento.Fase,

               incidences: contractDocument.IncidenciaDocumento.filter((incidence: any) => incidence.Resuelta == false),
            });
         }

         reset({
            AnuladoSEfecto: selectedContract.AnuladoSEfecto ? true : false,
            Conciliar: selectedContract.Conciliar,
            ResultadoFDCON: selectedContract.ResultadoFDCON,
            EstadoContrato: selectedContract.EstadoContrato,
            ClaveOperacion: selectedContract.ClaveOperacion,
            CCC: selectedContract?.CCC,
            CodigoSolicitud: selectedContract?.CodigoSolicitud,
            CodigoPoliza: selectedContract?.CodigoPoliza,
            FechaOperacion: moment(selectedContract?.FechaOperacion).format('YYYY-MM-DD'),
            ProductoId: selectedContract?.ProductoId,
            ProductoNombre: `${selectedContract?.Producto.Codigo} - ${selectedContract?.Producto.Descripcion}`,
            CompaniaId: selectedContract.CompaniaId,
            CompanniaNombre: selectedContract.Compania.Nombre,
            MediadorId: selectedContract.MediadorId,
            MediadorNombre: selectedContract.Mediador.Nombre,
            DNITomador: selectedContract?.DNITomador,
            NombreTomador: selectedContract?.NombreTomador,
            DNIAsegurado: selectedContract?.DNIAsegurado,
            NombreAsegurado: selectedContract?.NombreAsegurado,
            ResultadoFDPRECON: selectedContract.ResultadoFDPRECON,
            FechaValidezDNITomador: selectedContract.Compañía,
            FechaGrabacion: selectedContract.FechaGrabacion,

            DetalleObservacion: [],
            documents: docList,
            NotaInterna: selectedContract.NotaIntena,
         });
      };
      if (selectedContract) {
         resetFormFiels();
      }
   }, [selectedContract]);

   return (
      <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
         {selectedContract.FechaGrabacion && (
            <h1 className="flex font-bold text-2xl justify-center text-blue-900">Contrato grabado</h1>
         )}
         <ContractFormInputs control={control} />

         <DocumentList control={control} setValue={setValue} />
         <div className="box p-4 m-4 mb-2">
            <div className="flex flex-col gap-3">
               {fields.map((item, index) => (
                  <div key={item.id} className="flex gap-2">
                     <div className="w-full">
                        <TextAreaField
                           control={control}
                           name={`DetalleObservacion.${index}.observation`}
                           label="observation"
                        />
                     </div>
                     <Lucide
                        key={item.id}
                        icon="XCircle"
                        className="w-6 h-6 text-red-500 cursor-pointer"
                        onClick={() => remove(index)}
                     />
                  </div>
               ))}

               <Button
                  variant="soft-primary"
                  size="sm"
                  type="button"
                  onClick={() => append({ observation: '' })}
                  disabled={selectedContract.FechaGrabacion}
               >
                  <Lucide icon="PlusCircle" className="w-6 h-6 text-primary mr-1" />
                  Añadir observación
               </Button>
            </div>
         </div>
         <ObservationHistory selectedContract={selectedContract} />
         <div className="box p-4 m-4 mb-2">
            <div className="w-full">
               <InputField
                  control={control}
                  name="NotaInterna"
                  type="text"
                  label="Nota interna"
                  disabled={selectedContract.FechaGrabacion}
               />
            </div>
         </div>
         <div className="flex flex-col sm:flex-row justify-center items-center my-2 gap-3">
            <Button variant="secondary" onClick={() => navigate('/')}>
               {t('goBack')}
            </Button>
            <Button variant="danger" onClick={() => setSelectedContract(null)}>
               {t('clearForm')}
            </Button>
            <Button variant="primary" disabled={!isValid || selectedContract.FechaGrabacion} type="submit">
               Grabar
            </Button>
         </div>
      </form>
   );
};

export default ContractForm;
