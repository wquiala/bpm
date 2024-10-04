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
import cajaLoteService from '@/services/cajaLoteService';
import { Disclosure } from '@/components/Base/Headless';
import Alert from '@/components/Base/Alert';
import CajaLoteHistory from '../../common-components/CajaLoteHistory';

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
      watch,
      getValues,
      formState: { errors, isValid },
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
      const docList = data.documents;
      const observations = data.DetalleObservacion;
      setLoading(true);

      //Buscar si todos los doc estan correctos
      const pre = docList.filter((doc: any) => doc.estado == 'PRESENTE CORRECTO' || doc.estado == 'POR EMAIL');
      if (!caja || !lote) {
         setLoading(false);

         return setAlert({
            type: 'error',
            show: true,
            text: 'La caja y el lote son obligatorios para la grabación',
         });
      }

      //Preguntar si esta tramitado para solo aceptar caja lotes y observaciones y notas internas
      //Create observations

      let cont = 0;
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
         if (doc.present || doc.porEmail) {
            if (doc.present) {
               //Update document contracts
               /*  if (doc.estado != 'PRESENTE CORRECTO' || doc.estado != 'POR EMAIL') { */
               const toSend = {
                  ContratoId: selectedContract.ContratoId,
                  EstadoDoc: 'PRESENTE CORRECTO',
               };

               const [error, response] = await handlePromise(
                  DocumentContractService.updateDocumentContract(doc.id, toSend),
               );

               if (!response.ok) {
                  setLoading(false);
                  return setAlert({
                     type: 'error',
                     show: true,
                     text: error ?? 'Error while updating document contract',
                  });
               }
               //}
            }

            if (doc.porEmail) {
               if (doc.estado != 'PRESENTE CORRECTO' || doc.estado != 'CORRECTO') {
                  const toSend = {
                     ContratoId: selectedContract.ContratoId,
                     EstadoDoc: 'POR EMAIL',
                  };
                  const [error, response] = await handlePromise(
                     DocumentContractService.updateDocumentContract(doc.id, toSend),
                  );
                  if (!response.ok) {
                     setLoading(false);
                     return setAlert({
                        type: 'error',
                        show: true,
                        text: error ?? 'Error while updating document contract',
                     });
                  }
               }
            }

            //Mark incidences as resolved

            /*  for (const incidence of doc.incidences) {
               const toSend = {
                  ContratoId: selectedContract.ContratoId,
                  DocumentoId: incidence.DocumentoContratoId,
                  TipoDocumentoincidenciaId: incidence.TipoDocumentoIncidencia.TipoDocumentoIncidenciaId,

                  Resuelta: true,
                  Incidencia: incidence.IncidenciaDocId,
               };

               const currentDoc = selectedContract.DocumentoContrato.find(
                  (doc: any) => doc.DocumentoId === toSend.DocumentoId,
               );

               const existingIncidence = currentDoc?.IncidenciaDocumento.find(
                  (incidence: any) => incidence.IncidenciaDocId === toSend.Incidencia,
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
            } */
            cont++;
         }
      }

      //Aqui actualizamos el contrato
      const ContractData: any = {
         NotaInterna: data.NotaInterna != '' ? data.NotaInterna : selectedContract.NotaInterna,

         FechaGrabacion: new Date(),

         AnuladoSEfecto: data.AnuladoSEfecto ? true : false,
         TipoConciliacionId: cont == docList.length ? Number(13) : selectedContract.TipoConciliacionId,
         updatedAt: new Date(),
      };

      if (data.AnuladoSEfecto == true) {
         ContractData.EstadoContrato = 'ANULADA';
      }

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

      if (response.ok) {
         const toSendCajaLote = {
            caja: Number(caja),
            lote: Number(lote),
            contratoId: Number(selectedContract.ContratoId),
            nota: data.NotaInterna,
         };

         const [error, response] = await handlePromise(cajaLoteService.createCajaLote(toSendCajaLote));
         if (!response.ok) {
            setLoading(false);
            return setAlert({
               type: 'error',
               show: true,
               text: error ?? 'Error while adding caja y lote',
            });
         }
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
               present: false,
               name: contractDocument.MaestroDocumentos.Nombre,
               estado: contractDocument.EstadoDoc,
               fase: contractDocument.ProductoDocumento.Fase,

               incidences: contractDocument.IncidenciaDocumento.filter((incidence: any) => incidence.Resuelta == false),
               porEmail: contractDocument.EstadoDoc == 'POR EMAIL',
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
            CajasLotes: [],
            Usuario: selectedContract.Usuario.Nombre,
            UsuarioId: selectedContract.UsuarioId,
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

         <DocumentList control={control} setValue={setValue} getValues={getValues} watch={watch} />
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

               <Button variant="soft-primary" size="sm" type="button" onClick={() => append({ observation: '' })}>
                  <Lucide icon="PlusCircle" className="w-6 h-6 text-primary mr-1" />
                  Añadir observación
               </Button>
            </div>
         </div>
         <ObservationHistory selectedContract={selectedContract} />
         <div className="box p-4 m-4 mb-2">
            <div className="w-full">
               <InputField control={control} name="NotaInterna" type="text" label="Nota interna" />
            </div>
         </div>
         <div className="box p-4 m-4 mb-2">
            <Disclosure>
               {({ open }) => (
                  <>
                     <Disclosure.Button>{open ? 'Ocultar nota interna' : 'Mostrar nota interna'}</Disclosure.Button>
                     <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                        {selectedContract?.NotaInterna ? (
                           <div>
                              <div className="w-full">
                                 <div className="flex flex-col sm:flex-row justify-between mb-1">
                                    <div className="text-sm font-medium text-gray-900">
                                       {selectedContract.Usuario?.Nombre} - {selectedContract.Usuario?.Codigo}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                       {new Date(selectedContract.updatedAt).toLocaleDateString()}-
                                       {new Date(selectedContract.updatedAt).toLocaleTimeString()}
                                    </div>
                                 </div>
                                 <hr />
                                 <div className="text-gray-700">{selectedContract.NotaInterna}</div>
                              </div>
                           </div>
                        ) : (
                           <Alert variant="soft-secondary" className="flex items-center my-4 justify-center">
                              <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" /> {t('noCommentsFound')}
                           </Alert>
                        )}
                     </Disclosure.Panel>
                  </>
               )}
            </Disclosure>
         </div>
         <CajaLoteHistory control={control} selectedContract={selectedContract} />
         <div className="flex flex-col sm:flex-row justify-center items-center my-2 gap-3">
            <Button variant="secondary" onClick={() => navigate('/')}>
               {t('goBack')}
            </Button>
            <Button variant="danger" onClick={() => setSelectedContract(null)}>
               {t('clearForm')}
            </Button>
            <Button variant="primary" disabled={!isValid} type="submit">
               Grabar
            </Button>
         </div>
      </form>
   );
};

export default ContractForm;
