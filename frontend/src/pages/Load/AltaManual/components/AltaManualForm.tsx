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
import DocumentContractService from '@/services/DocumentContractService';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';
import ObservationHistory from '../../common-components/ObservationHistory';
import { defaultValues, schema } from '../../AltaManual/schemas';
import ContractFormInputs from '../../AltaManual/components/ContractFormInputs';
import ContractService from '@/services/ContractService';
import { useSelector } from 'react-redux';
import { store } from '@/stores/store';
import { AppDispatch } from '../../../../stores/store';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import InputField from '@/custom-components/FormElements/InputField';
import cajaLoteService from '@/services/cajaLoteService';
import CheckBoxField from '@/custom-components/FormElements/CheckBoxField';
import DocumentList from './DocumentList';
import { getMediadores } from '@/helpers/FetchData/mediador';
import { createContract, getContracts, updateContract } from '@/helpers/FetchData/contracts';
import { parserDate } from '@/helpers/parseDate';
import { response } from 'express';
import { getContractDocumentsbyContract } from '@/helpers/FetchData/contractsDocuments';

type Props = {
   /*  selectedContract: any;
   setSelectedContract: (contract: any) => void; */
};

const AltaManualForm = (/* { selectedContract, setSelectedContract }: Props */) => {
   const { t } = useTranslation();
   const navigate = useNavigate();

   const { caja, lote, companyList, company } = useAppSelector((state) => state.settings);
   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   const {
      control,
      reset,
      setValue,
      formState: { errors, isValid },
      getValues,
      handleSubmit,
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
   const onSubmit = async (data: any) => {
      console.log(data);
      const observations = data.DetalleObservacion;
      const docList = data.documents;
      let contractCreated;

      let inci;

      setLoading(true);

      /* if (!caja || !lote) {
         setLoading(false);

         return setAlert({
            type: 'error',
            show: true,
            text: 'La caja y el lote son obligatorios para la grabación',
         });
      } */

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
         ClaveOperacion: data.CCC ? data.CCC : data.CodigoPoliza ? data.CodigoPoliza : data.CodigoSolicitud,
         CompaniaId: data.CompaniaId,
         ProductoId: data.ProductoId,
         MediadorId: data.MediadorId,
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
         Revisar: data.Revisar,
         Conciliar: data.Conciliar,
         NotaInterna: data.NotaInterna ?? '',
         FechaProximaReclamacion: in30days,
      };

      const { data: dataC, error: errorC, response: responseC } = await createContract(dataContract);
      contractCreated = dataC;
      console.log(dataC);
      if (!responseC.ok) {
         setLoading(false);
         return setAlert({
            type: 'error',
            show: true,
            text: errorC ?? 'Error mientras se creaba el contrato',
         });
      } else {
         if (observations.length > 0) {
            for (const observation of observations) {
               const toSend = {
                  ContratoId: contractCreated.ContratoId,
                  Contenido: observation.observation,
               };

               const [error, response] = await handlePromise(
                  ObservationContractService.createObservationContract(toSend),
               );
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
            const { DocumentoId: id } = contractCreated.DocumentoContrato.find(
               (c: any) => c.ProdctoDoc == doc.ProductoDocId && c.DocId == doc.CodigoDoc,
            );

            inci = false;

            if (doc.correct) {
               contDocOk++;
               if (doc.estado != 'PRESENTE CORRECTO') {
                  const toSend = {
                     ContratoId: contractCreated.ContratoId,
                     DocId: doc.docTypeId,
                     EstadoDoc: 'PRESENTE CORRECTO',
                  };

                  const [error, response, data] = await handlePromise(
                     DocumentContractService.updateDocumentContract(id, toSend),
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
            } else if (!doc.correct && !doc.notCorrect) {
               if (data.AnuladoSEfecto) {
                  const ContractData = {
                     NotaInterna: data.NotaInterna,

                     FechaGrabacion: new Date(),
                     EstadoContrato: 'ANULADA',
                     AnuladoSEfecto: data.AnuladoSEfecto,
                     Conciliar: false,
                     updatedAt: new Date(),
                  };

                  const { error, response } = await updateContract(contractCreated.ContratoId, ContractData);

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
                  if (incidence.checked) {
                     console.log('Vamos aqui');
                     inci = true;
                     contIncidences++;
                     const toSend = {
                        ContratoId: contractCreated.ContratoId,
                        DocumentoContratoId: id,
                        Resuelta: !incidence.checked,
                        Incidencia: incidence.IncidenciaId,
                        Nota: incidence.notas.Nota,
                     };

                     console.log(toSend);

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
                     } = await updateContract(contractCreated.ContratoId, contractUpdate);

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

               const { data: da, response, error } = await getContracts(contractCreated.ContratoId);

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
                     EstadoContrato: 'TRAMITADA',
                     FechaGrabacion: new Date(),
                     Conciliar: false,
                     NotaInterna: data.NotaInterna,
                     TipoConciliacionId: 13,
                  };

                  const {
                     data: user,
                     response: res,
                     error: err,
                  } = await updateContract(contractCreated.ContratoId, toSend);

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
         }
      }

      /*  */

      /*  let contDocOk = 0;
      
 */

      /*  const toSendCajaLote = {
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
      } */

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
            EstadoContrato: '',
            MediadorId: 26314,
            ProductoId: 191,
            CompaniaId: parseInt(`${company?.CompaniaId}`),

            FechaOperacion: '',
            TipoOperacion: '',
            FechaEfecto: '',
            CCC: '',
            CodigoSolicitud: '',
            CodigoPoliza: '',

            ProductoNombre: '',
            CompaniaNombre: `${company?.Nombre}`,
            MediadorNombre: '',

            DNITomador: '',
            NombreTomador: '',
            FechaValidezDNITomador: '',

            DNIAsegurado: '',
            NombreAsegurado: '',
            FechaNacimientoAsegurado: '',
            Profesion: '',
            Deporte: '',
            Operador: '',

            DetalleObservacion: [],
            documents: [],
            Conciliar: true,
            Revisar: true,
            AnuladoSEfecto: false,

            NotaInterna: '',
         });
      };

      if (company) {
         resetFormFields();
      }
   }, [company]);

   return (
      <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
         <ContractFormInputs control={control} getValue={getValues} setValue={setValue} />

         <div className="box p-4 m-4 mb-2">
            <div className="w-full">
               <InputField control={control} name="NotaInterna" type="text" label="Nota interna" />
            </div>
         </div>

         <div className="flex flex-col sm:flex-row justify-center items-center my-2 gap-3">
            <Button variant="secondary" onClick={() => navigate('/')}>
               {t('goBack')}
            </Button>
            <Button variant="danger" /* onClick={() => setSelectedContract(null)} */>{t('clearForm')}</Button>
            <Button variant="primary" /* disabled={!isValid} */ type="submit">
               Grabar
            </Button>
         </div>
      </form>
   );
};

export default AltaManualForm;
