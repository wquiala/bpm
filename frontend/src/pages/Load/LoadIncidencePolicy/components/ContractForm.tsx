import Button from '@/components/Base/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import ObservationHistory from '../../common-components/ObservationHistory';
import TextAreaField from '@/custom-components/FormElements/TextArea';
import Lucide from '@/components/Base/Lucide';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import handlePromise from '@/utils/promise';
import ObservationContractService from '@/services/ObservationContractService';
import DocumentList from './DocumentList';
import DocumentContractService from '@/services/DocumentContractService';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';
import { defaultValues, schema } from '../../common-components/schemas';
import ContractFormInputs from '../../common-components/ContractFormInputs';

type Props = {
   selectedContract: any;
   setSelectedContract: (contract: any) => void;
};

const ContractForm = ({ selectedContract, setSelectedContract }: Props) => {
   const { t } = useTranslation();
   const navigate = useNavigate();

   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

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

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'DetalleObservacion',
   });

   const onSubmit = async (data: any) => {
      const observations = data.observations;
      const docList = data.documents;
      setLoading(true);

      if (selectedContract.Conciliar === true && docList.find((doc: any) => doc.present === false)) {
         setLoading(false);
         return setAlert({
            type: 'error',
            show: true,
            text: t('All documents must be present'),
         });
      }

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
            DocId: doc.docTypeId,
            Estado: doc.present ? 'PRESENT' : 'NOT_PRESENT',
         };

         for (const incidence of doc.incidences) {
            const toSend = {
               ContratoId: selectedContract.ContratoId,
               DocumentoId: doc.id,
               Resuelta: !incidence.checked,
               TipoIncidenciaId: incidence.id,
            };

            if (!doc.present && incidence.name.includes('no se ha recibido')) {
               toSend.Resuelta = false;
            } else if (doc.present && incidence.name.includes('no se ha recibido')) {
               toSend.Resuelta = true;
            }

            const currentDoc = selectedContract.DocumentoContrato.find(
               (doc: any) => doc.DocumentoId === toSend.DocumentoId,
            );
            const existingIncidence = currentDoc?.IncidenciaDocumento.find(
               (incidence: any) => incidence.TipoIncidenciaId === toSend.TipoIncidenciaId,
            );
            const [error, response] = await handlePromise(
               existingIncidence
                  ? DocumentIncidenceService.updateDocumentIncidence(existingIncidence.IncidenciaId, toSend)
                  : DocumentIncidenceService.createDocumentIncidence(toSend),
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

      setLoading(false);

      setAlert({
         type: 'success',
         show: true,
         text: t('Observations added successfully'),
      });

      setSelectedContract(null);
   };

   useEffect(() => {
      const resetFormFields = async () => {
         const docList = [];
         const contractDocuments = selectedContract?.DocumentoContrato;

         function createIncidence(incidence: any, document: any) {
            console.log('Incidencia y documento' + incidence, document);
            const isIncidenceUnresolved =
               document.IncidenciaDocumento.find((inci: any) => inci.IncidenciaId === incidence.IncidenciaId)
                  ?.Resuelta === false;
            return {
               id: incidence.IncidenciaId,
               name: incidence.Nombre,
               checked: isIncidenceUnresolved,
            };
         }

         for (const contractDocument of contractDocuments) {
            const isPresent = contractDocument.EstadoDoc === 'PRESENT' || contractDocument.EstadoDoc === 'CORRECTO';
            const isConciliar = selectedContract.Conciliar === true;

            const present = isPresent || isConciliar;

            /*   const incidences = contractDocument.IncidenciaDocumento.map((incidence: any) => {
               return createIncidence(incidence, contractDocument.DocId);
            }); */
            console.log(contractDocument.MaestroDocumentos.MaestroIncidencias);
            docList.push({
               id: contractDocument.DocumentoId,
               docTypeId: contractDocument.TipoDocId,
               present: present,
               name: contractDocument.MaestroDocumentos.Nombre,
               /*                incidences: incidences,
                */
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
         resetFormFields();
      }
   }, [selectedContract]);

   return (
      <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
         <ContractFormInputs control={control} />

         <DocumentList selectedContract={selectedContract} control={control} />

         <div className="box p-4 m-4 mb-2">
            <div className="flex flex-col gap-3">
               {fields.map((item, index) => (
                  <div key={item.id} className="flex gap-2">
                     <div className="w-full">
                        <TextAreaField
                           control={control}
                           name={`observations.${index}.observation`}
                           label="observation"
                        />
                     </div>
                     <Lucide
                        icon="XCircle"
                        className="w-6 h-6 text-red-500 cursor-pointer"
                        onClick={() => remove(index)}
                     />
                  </div>
               ))}

               <Button variant="soft-primary" size="sm" type="button" onClick={() => append({ observation: '' })}>
                  <Lucide icon="PlusCircle" className="w-6 h-6 text-primary mr-1" />
                  {t('addObservation')}
               </Button>
            </div>
         </div>

         <ObservationHistory selectedContract={selectedContract} />

         <div className="flex flex-col sm:flex-row justify-center items-center my-2 gap-3">
            <Button variant="secondary" onClick={() => navigate('/')}>
               Volver
            </Button>
            <Button variant="danger" onClick={() => setSelectedContract(null)}>
               Limpiar formulario{' '}
            </Button>
            <Button variant="primary" disabled={!isValid} type="submit">
               Guardar
            </Button>
         </div>
      </form>
   );
};

export default ContractForm;
