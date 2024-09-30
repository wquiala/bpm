import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { defaultValues, schema } from './components/schemas';
import moment from 'moment';
import ContractHeaderInputs from './components/ContractHeaderInputs';
import { Tab } from '@/components/Base/Headless';
import ContractAdiniotalDataInputs from './components/ContractAdiniotalDataInputs';
import DocumentList from './components/DocumentList';
import Button from '@/components/Base/Button';
import ReclamationList from './Reclamations/reclamationList';
import DigitalSignatureList from './DigitalSignature/digitalSignatureList';

type Props = {
   selectedContract: any;
   setSelectedContract: (contract: any) => void;
};

export interface Documents {
   Codigo: string;
   Nombre: string;
   Estado: string;
   FechaEstado: string;
   Fase: string;
   FechaUltimaRecepcion: string;
   FechaUltimaReclamacion: string;
   FechaProximaReclamacion: string;
   incidences: any[];
}
const ContractData = ({ selectedContract, setSelectedContract }: Props) => {
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

   useEffect(() => {
      const resetFormFiels = async () => {
         const docList: any[] = [];
         const contractDocuments = selectedContract?.DocumentoContrato;

         function createIncidence(incidence: any, document: any) {
            const isIncidenceUnresolved =
               document.IncidenciaDocumento.find((inci: any) => inci.TipoIncidenciaId === incidence.TipoIncidenciaId)
                  ?.Resuelta === false;
            return {
               id: incidence.TipoIncidenciaId,
               name: incidence.Nombre,
               checked: isIncidenceUnresolved,
            };
         }

         selectedContract.DocumentoContrato.map((doc: any) => {
            docList.push({
               Codigo: doc.MaestroDocumentos.Codigo,
               Nombre: doc.MaestroDocumentos.Nombre,
               Estado: doc.EstadoDoc,
               FechaEstado: doc.updatedAt,
               Fase: doc.ProductoDocumento.Fase,
               FechaUltimaRecepcion: new Date(doc.updatedAt).toLocaleDateString(),
               FechaUltimaReclamacion: new Date(selectedContract.FechaReclamacion).toLocaleDateString(),
               FechaProximaReclamacion: new Date(selectedContract.FechaProximaReclamacion).toLocaleDateString(),
               incidences: doc.IncidenciaDocumento,
               documentHistory: doc.DocumentoContratoHistory.map((his: any) => his),
            });
         });

         /* 
         for (const contractDocument of contractDocuments) {
            const isPresent = contractDocument.EstadoDoc === 'PRESENT' || contractDocument.EstadoDoc === 'CORRECT';
            const isConciliar = selectedContract.Conciliar === true;
            const present = isPresent || isConciliar;

            const incidences = contractDocument.MaestroDocumentos.FamiliaDocumento.MaestroIncidencias.map(
               (incidence: any) => createIncidence(incidence, contractDocument),
            );

            docList.push({
               id: contractDocument.DocumentoId,
               docTypeId: contractDocument.TipoDocId,
               present: present,
               name: contractDocument.MaestroDocumentos.Nombre,
               incidences: incidences,
            });
         } */

         reset({
            ClaveOperacion: selectedContract.ClaveOperacion,
            EstadoContrato: selectedContract.EstadoContrato,
            CCC: selectedContract?.CCC,
            CodigoSolicitud: selectedContract?.CodigoSolicitud,
            CodigoPoliza: selectedContract?.CodigoPoliza,
            DNIAsegurado: selectedContract?.DNIAsegurado,
            NombreAsegurado: selectedContract?.NombreAsegurado,
            FechaOperacion: new Date(selectedContract.FechaOperacion).toLocaleDateString(),
            Mediador: `${selectedContract?.Mediador?.Codigo} - ${selectedContract?.Mediador?.Nombre}` ?? null,
            Revisar: selectedContract?.Revisar,
            Conciliar: selectedContract.Conciliar,

            ProductoId: selectedContract?.ProductoId,
            Producto: `${selectedContract?.Producto.Codigo} - ${selectedContract?.Producto.Descripcion}`,
            ProductoDesc: selectedContract?.Producto.Descripcion,
            FechaEfecto: selectedContract.FechaEfecto
               ? new Date(selectedContract.FechaEfecto).toLocaleDateString()
               : 'Sin fecha informada',
            IndicadorFDCON: selectedContract?.IndicadorFDCON,
            IndicadorFDPRECON: selectedContract?.IndicadorFDPRECON,
            TipoEnvioPRECON: selectedContract.TipoEnvioPRECON,
            TipoEnvioCON: selectedContract.TipoEnvioCON,
            ResultadoPRECON: selectedContract.ResultadoFDPRECON,
            ResultadoCON: selectedContract.ResultadoFDCON,

            TipoOperacion: selectedContract?.TipoOperacion ?? null,

            Suplemento: selectedContract?.Suplemento,
            AnuladoSE: selectedContract?.AnuladoSEfecto,
            CanalMediador: selectedContract?.Mediador?.Nombre ?? null,
            TipoConciliacion: selectedContract?.TipoConciliacion?.nombre ?? null,

            Operador: selectedContract?.Operador,

            EdadAsegurado: moment().diff(
               moment(selectedContract?.FechaNacimientoAsegurado).format('YYYY-MM-DD'),
               'years',
            ),
            DeporteAsegurado: selectedContract?.DeporteAsegurado,
            FechaNacimientoAsegurado: selectedContract?.FechaNacimientoAsegurado
               ? new Date(selectedContract?.FechaNacimientoAsegurado).toLocaleDateString()
               : '',

            ProfesionAsegurado: selectedContract?.ProfesionAsegurado,
            CSRespAfirm: selectedContract?.CSRespAfirmativas,

            NombreTomador: selectedContract?.NombreTomador,
            DNITomador: selectedContract?.DNITomador,
            FechaDNITomador: selectedContract?.FechaValidezDNITomador
               ? new Date(selectedContract?.FechaValidezDNITomador).toLocaleDateString()
               : 'Sin fecha informada',

            NoDigitalizar: false,
            observations: [],
            documents: docList,
         });
      };
      if (selectedContract) {
         resetFormFiels();
      }
   }, [selectedContract]);
   return (
      <div>
         <ContractHeaderInputs control={control} />

         <div className="box mt-3 mx-3">
            <Tab.Group>
               <Tab.List variant="boxed-tabs">
                  <Tab>
                     <Tab.Button className="w-full py-2" as="button">
                        Datos Adicionales
                     </Tab.Button>
                  </Tab>
                  <Tab>
                     <Tab.Button className="w-full py-2" as="button">
                        Documentos-Incidencias
                     </Tab.Button>
                  </Tab>
                  <Tab>
                     <Tab.Button className="w-full py-2" as="button">
                        Reclamaciones
                     </Tab.Button>
                  </Tab>
                  <Tab>
                     <Tab.Button className="w-full py-2" as="button">
                        Firma Digital
                     </Tab.Button>
                  </Tab>
                  {/* <Tab>
                            <Tab.Button className="w-full py-2" as="button">
                                Reclamaciones
                            </Tab.Button>
                        </Tab>
                        <Tab>
                            <Tab.Button className="w-full py-2" as="button">
                                Firma Digital
                            </Tab.Button>
                        </Tab> */}
               </Tab.List>
               <Tab.Panels className="mt-5">
                  <Tab.Panel className="leading-relaxed">
                     <ContractAdiniotalDataInputs control={control} setSelectedContract={setSelectedContract} />
                  </Tab.Panel>
                  <Tab.Panel className="leading-relaxed">
                     <DocumentList
                        selectedContract={selectedContract}
                        setSelectedContract={setSelectedContract}
                        control={control}
                     />
                  </Tab.Panel>
                  <Tab.Panel className="leading-relaxed">
                     <ReclamationList
                        control={control}
                        setSelectedContract={setSelectedContract}
                        selectedContract={selectedContract}
                     />
                  </Tab.Panel>
                  <Tab.Panel className="leading-relaxed">
                     <DigitalSignatureList
                        selectedContract={selectedContract}
                        setSelectedContract={setSelectedContract}
                        control={control}
                     />
                  </Tab.Panel>
               </Tab.Panels>
            </Tab.Group>
         </div>
      </div>
   );
};

export default ContractData;
