import Button from '@/components/Base/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useNavigate, Navigate } from 'react-router-dom';
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
import { Disclosure } from '@/components/Base/Headless';
import Alert from '@/components/Base/Alert';
import CajaLoteHistory from '../../common-components/CajaLoteHistory';
import InputField from '@/custom-components/FormElements/InputField';
import { getContracts, updateContract } from '../../../../helpers/FetchData/contracts';
import { useAppSelector } from '@/stores/hooks';
import ContractService from '@/services/ContractService';
import cajaLoteService from '@/services/cajaLoteService';
import { getContractDocumentsbyContract } from '@/helpers/FetchData/contractsDocuments';
import { getIncidences } from '@/helpers/FetchData/incidencesDocuments';

type Props = {
   selectedContract: any;
   setSelectedContract: (contract: any) => void;
};

const ContractForm = ({ selectedContract, setSelectedContract }: Props) => {
   const { t } = useTranslation();
   const { caja, lote } = useAppSelector((state) => state.settings);

   const navigate = useNavigate();

   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   const { company } = useAppSelector((state) => state.settings);

   const {
      control,
      reset,
      formState: { errors, isValid },
      handleSubmit,
      setValue,
      getValues,
      watch,
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema(t)),
      defaultValues: defaultValues,
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'DetalleObservacion',
   });

   const findIncidences = (incidence: any, contDocOk: any) => {
      const contracts = selectedContract.DocumentoContrato;

      for (const contract of contracts) {
         const query = contract.IncidenciaDocumento.find(
            (inci: any) => inci.Incidencia == incidence.IncidenciaId && inci.DocumentoContratoId == contDocOk,
         );
         if (query) return query;
      }
      return false;
   };

   const onSubmit = async (data: any) => {
      const observations = data.DetalleObservacion;
      const docList = data.documents;

      let inci;

      setLoading(true);

      if (!caja || !lote) {
         setLoading(false);

         return setAlert({
            type: 'error',
            show: true,
            text: 'La caja y el lote son obligatorios para la grabación',
         });
      }

      if (observations.length > 0) {
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
      }

      let contDocOk = 0;
      for (const doc of docList) {
         inci = false;

         if (doc.correct) {
            contDocOk++;
            if (doc.estado != 'PRESENTE CORRECTO') {
               const toSend = {
                  ContratoId: selectedContract.ContratoId,
                  DocId: doc.docTypeId,
                  EstadoDoc: 'PRESENTE CORRECTO',
               };

               const [error, response, data] = await handlePromise(
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
               const { data: dataIn } = await getIncidences();
               let incidences: any[] = [];
               docList.map((doc: any) => {
                  dataIn.map((d: any) => {
                     if (d.DocumentoContratoId == doc.id && d.Resuelta == false) {
                        incidences.push(d);
                     }
                  });
               });

               if (incidences.length > 0) {
                  //Ponemos el contador de reclamaciones a cero y ponemos fecha de proxima reclamacion la fecha actual
                  const toSend = {
                     FechaProximaReclamacion: new Date(),
                     NumeroReclamaciones: 0,
                     updatedAt: new Date(),
                  };

                  const { data, error, response } = await updateContract(selectedContract.ContratoId, toSend);
               }
            }

            //Quitar las incidencias si tiene, esto se hace en el backend
         } else if (!doc.correct && !doc.notCorrect) {
            if (data.AnuladoSEfecto && !selectedContract.AnuladoSEfecto) {
               const ContractData = {
                  NotaInterna: data.NotaInterna != '' ? data.NotaInterna : selectedContract.NotaInterna,

                  FechaGrabacion: new Date(),
                  EstadoContrato: 'ANULADA',
                  AnuladoSEfecto: data.AnuladoSEfecto,
                  Conciliar: false,
                  updatedAt: new Date(),
               };

               const { error, response } = await updateContract(selectedContract.ContratoId, ContractData);

               if (!response.ok) {
                  setLoading(false);
                  return setAlert({
                     type: 'error',
                     show: true,
                     text: error ?? 'Error while updating contract',
                  });
               }
            } else {
               continue;
            }
         } else {
            let contIncidences = 0;
            for (const incidence of doc.incidences) {
               const f = findIncidences(incidence, doc.id);

               if (incidence.checked) {
                  inci = true;
                  contIncidences++;
               }

               if (incidence.checked && !f) {
                  contIncidences++;
                  const toSend = {
                     ContratoId: selectedContract.ContratoId,
                     DocumentoContratoId: doc.id,
                     Resuelta: !incidence.checked,
                     Incidencia: incidence.IncidenciaId,
                     Nota: incidence.notas.Nota,
                  };

                  const [error, response] = await handlePromise(
                     DocumentIncidenceService.createDocumentIncidence(toSend),
                  );
                  if (!response.ok) {
                     setLoading(false);
                     return setAlert({
                        type: 'error',
                        show: true,
                        text: error ?? 'Error while adding incidence document',
                     });
                  }

                  const contractUpdate = {
                     EstadoContrato: !data.AnuladoSEfecto ? 'PENDIENTE' : 'ANULADA',
                     FechaProximaReclamacion: new Date() /* moment().add(30, 'days').format('YYYY-MM-DD') */,
                     updatedAt: new Date(),
                     NumeroReclamaciones: 0,
                     AnuladoSEfecto: data.AnuladoSEfecto ? true : false,
                  };

                  const {
                     data: user,
                     response: res,
                     error: err,
                  } = await updateContract(selectedContract.ContratoId, contractUpdate);

                  if (!res.ok) {
                     setLoading(false);
                     return setAlert({
                        type: 'error',
                        show: true,
                        text: error ?? 'Error while udating contract',
                     });
                  }
               } else {
                  if (!incidence.checked && f && f.Resuelta == false) {
                     const toSend = {
                        ContratoId: selectedContract.ContratoId,
                        DocumentoId: doc.id,
                        Resuelta: true,
                        Incidencia: incidence.IncidenciaId,
                     };

                     const [error, response] = await handlePromise(
                        DocumentIncidenceService.updateDocumentIncidence(f.IncidenciaDocId, toSend),
                     );
                  }
               }
            }

            if (doc.notCorrect && inci == false && doc.correct != true) {
               setLoading(false);

               return setAlert({
                  type: 'success',
                  show: true,
                  text: 'Si el documento no esta correcto debe seleccionar las incidencias',
               });
            }
         }

         if (contDocOk == docList.length) {
            //buscamos el contrato para ver si ya esta en Tramitado

            const { data: da, response, error } = await getContracts(selectedContract.ContratoId);

            if (!response.ok) {
               setLoading(false);
               return setAlert({
                  type: 'error',
                  show: true,
                  text: 'Contract not found',
               });
            }

            if (da.EstadoContrato != 'TRAMITADA') {
               const toSend = {
                  EstadoContrato:
                     contDocOk == docList.length && !data.AnuladoSEfecto
                        ? 'TRAMITADA'
                        : data.AnuladoSEfecto == true
                        ? 'ANULADA'
                        : selectedContract.EstadoContrato,
                  AnuladoSEfecto: data.AnuladoSEfecto ? true : false,

                  FechaGrabacion: new Date(),
                  Conciliar: false,
                  NotaInterna: data.NotaInterna != '' ? data.NotaInterna : da.NotaInterna,
                  TipoConciliacionId: 13,
               };

               const {
                  data: user,
                  response: res,
                  error: err,
               } = await updateContract(selectedContract.ContratoId, toSend);

               if (!res.ok) {
                  setLoading(false);
                  return setAlert({
                     type: 'error',
                     show: true,
                     text: error ?? 'Error while udating contract',
                  });
               }
            }
         } else {
            const toSend = {
               NotaInterna: data.NotaInterna ?? selectedContract.NotaInterna,
            };

            const { data: da, response: res, error } = await updateContract(selectedContract.ContratoId, toSend);

            if (!res.ok) {
               setLoading(false);
               return setAlert({
                  type: 'error',
                  show: true,
                  text: error ?? 'Error while udating contract',
               });
            }
         }
      }

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

      setLoading(false);

      setAlert({
         type: 'success',
         show: true,
         text: 'Contrato grabado correctamente',
      });

      setSelectedContract(null);
   };

   useEffect(() => {
      const resetFormFields = async () => {
         const docList = [];
         const contractDocuments = selectedContract?.DocumentoContrato;

         for (const contractDocument of contractDocuments) {
            const isCorrect =
               contractDocument.EstadoDoc === 'CORRECTO' || contractDocument.EstadoDoc === 'PRESENTE CORRECTO';

            const notCorrect = contractDocument.EstadoDoc === 'PRESENTE CON INCIDENCIA';

            const isConciliar = selectedContract.Conciliar === true;

            /*             const present = isPresent || isConciliar;
             */ const incidences = contractDocument.MaestroDocumentos.MaestroIncidencias.map((incidence: any) => {
               /*                createIncidence(incidence.IncidenciaId, contractDocument.DocId);
                */ return {
                  IncidenciaId: incidence.IncidenciaId,
                  DocAsociadoId: incidence.DocAsociadoId,

                  Codigo: incidence.Codigo,
                  Nombre: incidence.Nombre,
                  estado: contractDocument.EstadoDoc,

                  checked: contractDocument.IncidenciaDocumento.find(
                     (inci: any) => inci.Incidencia == incidence.IncidenciaId && inci.Resuelta == false,
                  ),
                  notas: contractDocument.IncidenciaDocumento.find((i: any) => {
                     if (i.Incidencia == incidence.IncidenciaId && i.Resuelta == false) return i.Nota;
                  }),
                  /* Comentario: contractDocument.IncidenciaDocumento.map((inci: any) => {
                     return inci.Nota;
                  }), */
               };
               /*                return createIncidence(incidence, contractDocument.DocId);
                */
            });
            docList.push({
               id: contractDocument.DocumentoId,
               docTypeId: contractDocument.DocId,
               correct: isCorrect,
               notCorrect: notCorrect,
               name: contractDocument.MaestroDocumentos.Nombre,
               estado: contractDocument.EstadoDoc,
               incidences: incidences,
               fase: contractDocument.ProductoDocumento.Fase,

               /*                comentario: contractDocument.
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
            Usuario: selectedContract.Usuario.Nombre,
            UsuarioId: selectedContract.UsuarioId,
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
         {selectedContract.FechaGrabacion && (
            <h1 className="flex font-bold text-2xl justify-center text-blue-900">Contrato grabado</h1>
         )}{' '}
         {selectedContract.Revisar == false && (
            <h1 className="flex font-bold text-2xl justify-center text-blue-900">
               Este contrato tiene el parámetro revisar en NO por lo que no se pueden grabar incidencias en el
            </h1>
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
               Volver
            </Button>
            <Button variant="danger" onClick={() => setSelectedContract(null)}>
               Limpiar formulario{' '}
            </Button>
            <Button
               variant="primary"
               disabled={
                  selectedContract.EstadoContrato == 'TRAMITADA' || !isValid || selectedContract.Revisar == false
               }
               type="submit"
            >
               Grabar
            </Button>
         </div>
      </form>
   );
};

export default ContractForm;
