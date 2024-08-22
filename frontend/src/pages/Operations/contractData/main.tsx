import { AlertContext } from '@/utils/Contexts/AlertContext'
import { LoadingContext } from '@/utils/Contexts/LoadingContext'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { defaultValues, schema } from './components/schemas'
import moment from 'moment'
import ContractHeaderInputs from './components/ContractHeaderInputs'
import { Tab } from '@/components/Base/Headless'
import ContractAdiniotalDataInputs from './components/ContractAdiniotalDataInputs'
import DocumentList from './components/DocumentList'

type Props = {
    selectedContract: any,
    setSelectedContract: (contract: any) => void
}

const ContractData = ({ selectedContract, setSelectedContract }: Props) => {

    const { t } = useTranslation()
    const navigate = useNavigate();

    const [, setAlert] = useContext(AlertContext);
    const [, setLoading] = useContext(LoadingContext);

    const {
        control,
        reset,
        formState: { isValid },
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema(t)),
        defaultValues: defaultValues
    });

    useEffect(() => {
        const resetFormFiels = async () => {
            const docList = []
            const contractDocuments = selectedContract?.DocumentoContrato;

            function createIncidence(incidence: any, document: any) {
                const isIncidenceUnresolved = document.IncidenciaDocumento.find((inci: any) => inci.TipoIncidenciaId === incidence.TipoIncidenciaId)?.Resuelta === false;
                return {
                    id: incidence.TipoIncidenciaId,
                    name: incidence.Nombre,
                    checked: isIncidenceUnresolved
                }
            }

            for (const contractDocument of contractDocuments) {
                const isPresent = contractDocument.EstadoDoc === 'PRESENT' || contractDocument.EstadoDoc === 'CORRECT';
                const isConciliar = selectedContract.Conciliar === true;
                const present = isPresent || isConciliar;

                const incidences = contractDocument.MaestroDocumentos.FamiliaDocumento.MaestroIncidencias.map((incidence: any) => createIncidence(incidence, contractDocument));

                docList.push({
                    id: contractDocument.DocumentoId,
                    docTypeId: contractDocument.TipoDocId,
                    present: present,
                    name: contractDocument.MaestroDocumentos.Nombre,
                    incidences: incidences
                });
            }

            reset({
                CCC: selectedContract?.CCC,
                CodigoSolicitud: selectedContract?.CodigoSolicitud,
                CodigoPoliza: selectedContract?.CodigoPoliza,
                DNIAsegurado: selectedContract?.DNIAsegurado,
                NombreAsegurado: selectedContract?.NombreAsegurado,
                FechaAltaSolicitud: moment(selectedContract?.FechaAltaSolicitud).format('YYYY-MM-DD'),
                CodigoMediador: selectedContract?.CanalMediador?.Codigo ?? null,
                Revisar: selectedContract?.Revisar,
                Conciliar: selectedContract?.Conciliar,

                RamoId: selectedContract?.RamoId,
                RamoCodigo: selectedContract?.Ramo.Codigo,
                RamoDesc: selectedContract?.Ramo.Descripcion,
                FechaEfecto: selectedContract?.FechaEfectoSolicitud ? moment(selectedContract?.FechaEfectoSolicitud).format('YYYY-MM-DD') : '',
                IndicadorFDCON: selectedContract?.IndicadorFDCON,
                IndicadorFDPRECON: selectedContract?.IndicadorFDPRECON,

                TipoOperacion: selectedContract?.Ramo[0]?.RamoTipoOperacion?.TipoOperacion ?? null,
                Suplemento: selectedContract?.Suplemento,
                AnuladoSE: selectedContract?.AnuladoSE,
                CanalMediador: selectedContract?.CanalMediador?.Canal ?? null,
                TipoConciliacion: selectedContract?.TipoConciliacion?.Nombre ?? null,

                EdadAsegurado: moment().diff(moment(selectedContract?.FechaNacimientoAsegurado).format('YYYY-MM-DD'), 'years'),
                DeporteAsegurado: selectedContract?.DeporteAsegurado,
                FechaNacimientoAsegurado: selectedContract?.FechaNacimientoAsegurado ? moment(selectedContract?.FechaNacimientoAsegurado).format('YYYY-MM-DD') : '',

                ProfesionAsegurado: selectedContract?.ProfesionAsegurado,
                CSRespAfirm: selectedContract?.CSRespAfirm,

                NombreTomador: selectedContract?.NombreTomador,
                DNITomador: selectedContract?.DNITomador,
                FechaDNITomador: selectedContract?.FechaDNITomador ? moment(selectedContract?.FechaDNITomador).format('YYYY-MM-DD') : '',

                NoDigitalizar: false,
                observations: [],
                documents: docList
            })
        }
        if (selectedContract) {
            console.log(selectedContract, "SELECTED contracts ")
            resetFormFiels()
        }
    }, [selectedContract])
    return (
        <div>
            <ContractHeaderInputs
                control={control}
            />

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
                            <ContractAdiniotalDataInputs control={control} />
                        </Tab.Panel>
                        <Tab.Panel className="leading-relaxed">
                            <DocumentList selectedContract={selectedContract} control={control} />
                        </Tab.Panel>
                        {/* <Tab.Panel className="leading-relaxed">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of
                            letters, as opposed to using 'Content here, content
                            here', making it look like readable English. Many
                            desktop publishing packages and web page editors now
                            use Lorem Ipsum as their default model text, and a
                            search for 'lorem ipsum' will uncover many web sites
                            still in their infancy. Various versions have evolved
                            over the years, sometimes by accident, sometimes on
                            purpose (injected humour and the like).
                        </Tab.Panel>
                        <Tab.Panel className="leading-relaxed">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of
                            letters, as opposed to using 'Content here, content
                            here', making it look like readable English. Many
                            desktop publishing packages and web page editors now
                            use Lorem Ipsum as their default model text, and a
                            search for 'lorem ipsum' will uncover many web sites
                            still in their infancy. Various versions have evolved
                            over the years, sometimes by accident, sometimes on
                            purpose (injected humour and the like).
                        </Tab.Panel> */}
                    </Tab.Panels>
                </Tab.Group>
            </div>

        </div>
    )
}

export default ContractData