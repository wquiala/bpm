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
import { Disclosure } from '@/components/Base/Headless';
import Alert from '@/components/Base/Alert';
import CajaLoteHistory from '../../common-components/CajaLoteHistory';
import InputField from '@/custom-components/FormElements/InputField';
import { getContracts, updateContract } from '../../../../helpers/FetchData/contracts';
import { useAppSelector } from '@/stores/hooks';

import { getIncidences } from '@/helpers/FetchData/incidencesDocuments';
import { createCajaLote } from '@/helpers/FetchData/cajaLote';
interface toSendtDataContract {
   EstadoContrato?: string;
   AnuladoSEfecto?: boolean;

   FechaGrabacion?: Date;
   NotaInterna?: string;
   TipoConciliacionId?: number;
   NumeroReclamaciones?: number;
   updatedAt?: Date;
   FechaProximaReclamacion?: Date;
}

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

   const {
      control,
      reset,
      formState: { isValid },
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

   const findIncidences = (incidence: any, id: any) => {
      const contracts = selectedContract.DocumentoContrato;

      for (const contract of contracts) {
         const query = contract.IncidenciaDocumento.find(
            (inci: any) => inci.TipoIncidenciaDocumentoId == incidence.IncidenciaId && inci.DocumentoContratoId == id,
         );
         if (query) return query;
      }
      return false;
   };

   const onSubmit = async (data: any) => {
      const observations = data.DetalleObservacion;
      const docList = data.documents;

      let inci = false;
      let newInci = false;
      let moreInci = false;

      setLoading(true);

      if (!caja || !lote) {
         setLoading(false);

         return setAlert({
            type: 'error',
            show: true,
            text: 'La caja y el lote son obligatorios para la grabación',
         });
      }

      //Metemos primero caja y lote

      const toSendCajaLote = {
         caja: Number(caja),
         lote: Number(lote),
         contratoId: Number(selectedContract.ContratoId),
         nota: data.NotaInterna,
      };

      const { data: cajaLote, response, error: err } = await createCajaLote(toSendCajaLote);

      if (!response.ok) {
         setLoading(false);
         return setAlert({
            type: 'error',
            show: true,
            text: err ?? 'Error while adding caja y lote',
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
         if (doc.correct) {
            contDocOk++;
            if (doc.estado != 'PRESENTE CORRECTO') {
               const toSend = {
                  ContratoId: selectedContract.ContratoId,
                  DocId: doc.docTypeId,
                  EstadoDoc: 'PRESENTE CORRECTO',
                  CajaLote: cajaLote.CajaLoteId,
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
               const { data: dataIn } = await getIncidences();
               let incidences: any[] = [];
               docList.map((doc: any) => {
                  dataIn.map((d: any) => {
                     if (d.DocumentoContratoId == doc.id && !d.Resuelta) {
                        incidences.push(d);
                     }
                  });
               });

               if (incidences.length > 0) {
                  moreInci = true;
                  //Ponemos el contador de reclamaciones a cero y ponemos fecha de proxima reclamacion la fecha actual
               }
            }

            //Quitar las incidencias si tiene, esto se hace en el backend
         } else {
            let contIncidences = 0;
            for (const incidence of doc.incidences) {
               const f = findIncidences(incidence, doc.id);

               if (incidence.checked) {
                  inci = true;
                  contIncidences++;
               }

               if (incidence.checked && !f) {
                  newInci = true;
                  contIncidences++;
                  const toSend = {
                     ContratoId: selectedContract.ContratoId,
                     DocumentoContratoId: doc.id,
                     Resuelta: !incidence.checked,
                     Incidencia: incidence.IncidenciaId,
                     Nota: incidence.notas.Nota,
                     CajaLote: cajaLote.CajaLoteId,
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
               } else if (!incidence.checked && f && !f.Resuelta) {
                  const toSend = {
                     ContratoId: selectedContract.ContratoId,
                     DocumentoId: doc.id,
                     Resuelta: true,
                     Incidencia: incidence.IncidenciaId,
                  };

                  await handlePromise(DocumentIncidenceService.updateDocumentIncidence(f.IncidenciaDocId, toSend));
               }
            }

            /*  const toSend = {
               ContratoId: selectedContract.ContratoId,
               DocumentoId: doc.id,
            }; */

            //await findIncidencesDocumentsAndUpdateStatus(doc.id, toSend);

            //Chequeamos el estasdo del documento y lo modificamos si es necesario

            if (doc.notCorrect && !inci && !doc.correct) {
               setLoading(false);

               return setAlert({
                  type: 'error',
                  show: true,
                  text: 'Si el documento no esta correcto debe seleccionar las incidencias',
               });
            }
         }
      }
      //Aqui se actualiza el contrato
      //buscamos el contrato para ver si ya esta en Tramitado

      const { data: da } = await getContracts(selectedContract.ContratoId);
      const toSend: toSendtDataContract = {};
      if (contDocOk == docList.length && da.EstadoContrato != 'TRAMITADA') {
         toSend.EstadoContrato = 'TRAMITADA';
         toSend.TipoConciliacionId = 13;
         toSend.FechaGrabacion = new Date();
      }

      if (newInci || moreInci) {
         toSend.FechaProximaReclamacion = new Date();
         toSend.NumeroReclamaciones = 0;
      }

      if (data.AnuladoSEfecto) {
         toSend.EstadoContrato = 'ANULADA';
         toSend.AnuladoSEfecto = data.AnuladoSEfecto;
      }

      if (data.NotaInterna != '') {
         toSend.NotaInterna = data.NotaInterna;
      }

      await updateContract(selectedContract.ContratoId, toSend);

      if (!response.ok) {
         setLoading(false);
         return setAlert({
            type: 'error',
            show: true,
            text: 'Contract not found',
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
               contractDocument.EstadoDoc === 'PRESENTE CORRECTO' || contractDocument.EstadoDoc === 'CORRECTO';

            const notCorrect = contractDocument.EstadoDoc === 'PRESENTE CON INCIDENCIA';

            const incidences = contractDocument.MaestroDocumentos.TipoDocumentoIncidencia.map((incidence: any) => {
               return {
                  IncidenciaId: incidence.TipoDocumentoIncidenciaId,
                  DocAsociadoId: incidence.MaestroDocumentos.DocumentoId,

                  Codigo: incidence.MaestroIncidencias.Codigo,
                  Nombre: incidence.MaestroIncidencias.Nombre,
                  estado: contractDocument.EstadoDoc,

                  checked: contractDocument.IncidenciaDocumento.find(
                     (inci: any) =>
                        inci.TipoIncidenciaDocumentoId == incidence.TipoDocumentoIncidenciaId && !inci.Resuelta,
                  ),
                  notas: contractDocument.IncidenciaDocumento.find((i: any) => {
                     if (i.TipoIncidenciaDocumentoId == incidence.TipoDocumentoIncidenciaId && !i.Resuelta)
                        return i.Nota;
                  }),
               };
            });
            docList.push({
               id: contractDocument.DocumentoId,
               familia: contractDocument.MaestroDocumentos.FamiliaDocumento.Codigo,
               docTypeId: contractDocument.DocId,
               correct: false,
               notCorrect: notCorrect,
               corr: isCorrect,
               name: contractDocument.MaestroDocumentos.Nombre,
               codigo: contractDocument.MaestroDocumentos.Codigo,

               estado: contractDocument.EstadoDoc,
               incidences: incidences,
               fase: contractDocument.ProductoDocumento.Fase,

               /*                comentario: contractDocument.
                */
            });
         }

         reset({
            AnuladoSEfecto: selectedContract.AnuladoSEfecto,
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
         {selectedContract.EstadoContrato == 'TRAMITADA' && (
            <h2 className="flex font-bold text-2xl justify- text-center text-blue-900">
               Contrato grabado tramitado, cualquier actualización al contrato dirijase a grabación sin incidencias
            </h2>
         )}{' '}
         {!selectedContract.Revisar && (
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
               disabled={selectedContract.EstadoContrato == 'TRAMITADA' || !isValid || !selectedContract.Revisar}
               type="submit"
            >
               Grabar
            </Button>
         </div>
      </form>
   );
};

export default ContractForm;
