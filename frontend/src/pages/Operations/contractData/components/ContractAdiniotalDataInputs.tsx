import CheckBoxField from '@/custom-components/FormElements/CheckBoxField'
import InputField from '@/custom-components/FormElements/InputField'

type Props = {
    control: any
}

const ContractAdiniotalDataInputs = ({ control }: Props) => {
    return (
        <div className="box p-4 m-4 mb-2">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="RamoDesc"
                            type='text'
                            label="Producto"
                            disabled
                        />
                    </div>

                    <div className="w-full">
                        <InputField
                            control={control}
                            name="FechaEfecto"
                            type='text'
                            label="Fecha efecto"
                            disabled
                        />
                    </div>

                    <div className="w-full flex gap-2 flex-1 items-end mb-5">
                        <CheckBoxField
                            control={control}
                            name="IndicadorFDCON"
                            label="IndicadorFDCON"
                            disabled
                        />
                        <CheckBoxField
                            control={control}
                            name="IndicadorFDPRECON"
                            label="IndicadorFDPRECON"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="TipoOperacion"
                            type='text'
                            label="Tipo de Operación"
                            disabled
                        />
                    </div>
                    <div className="w-full flex gap-2 flex-1 items-start mt-8">
                        <CheckBoxField
                            control={control}
                            name="Suplemento"
                            label="Suplemento"
                            disabled
                        />
                        <CheckBoxField
                            control={control}
                            name="AnuladoSE"
                            label="Anulado sin efecto"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="CanalMediador"
                            type='text'
                            label="Operador"
                            disabled
                        />
                    </div>
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="TipoConciliacion"
                            type='text'
                            label="Tipo de Concialiación"
                            disabled
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="EdadAsegurado"
                            type='text'
                            label="Edad Asegurado"
                            disabled
                        />
                    </div>

                    <div className="w-full">
                        <InputField
                            control={control}
                            name="DeporteAsegurado"
                            type='text'
                            label="Depote Asegurado"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="FechaNacimientoAsegurado"
                            type='text'
                            label="Fecha Nacimiento Asegurado"
                            disabled
                        />
                    </div>
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="ProfesionAsegurado"
                            type='text'
                            label="Profesión Asegurado"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full flex gap-2 flex-1 items-start mt-8">
                        <CheckBoxField
                            control={control}
                            name="CSRespAfirm"
                            label="CS Resp Afirm"
                            disabled
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="NombreTomador"
                            type='text'
                            label="Nombre Tomador"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="DNITomador"
                            type='text'
                            label="DNI Tomador"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="FechaDNITomador"
                            type='text'
                            label="Fecha Validez DNI Tomador"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContractAdiniotalDataInputs