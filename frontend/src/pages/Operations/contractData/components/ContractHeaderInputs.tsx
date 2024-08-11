import CheckBoxField from '@/custom-components/FormElements/CheckBoxField'
import InputField from '@/custom-components/FormElements/InputField'
import React from 'react'

type Props = {
    control: any
}

const ContractHeaderInputs = ({ control }: Props) => {
    return (
        <div className="box p-4 m-4 mb-2">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="CodigoSolicitud"
                            type='text'
                            label="RequestCode"
                            disabled
                        />
                    </div>

                    <div className="w-full">
                        <InputField
                            control={control}
                            name="CodigoPoliza"
                            type='text'
                            label="PolicyCode"
                            disabled
                        />
                    </div>

                    <div className="w-full">
                        <InputField
                            control={control}
                            name="CCC"
                            type='text'
                            label="CCC"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="DNIAsegurado"
                            type='text'
                            label="InsuranceDNI"
                            disabled
                        />
                    </div>
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="NombreAsegurado"
                            type='text'
                            label="InsuranceName"
                            disabled
                        />
                    </div>
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="FechaAltaSolicitud"
                            type='date'
                            label="RegistrationDateRequest"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full sm:w-1/3">
                    <div className="w-full">
                        <InputField
                            control={control}
                            name="CodigoMediador"
                            type='text'
                            label="Código Mediador"
                            disabled
                        />
                    </div>
                    <div className="w-full">

                    </div>
                    <div className="w-full flex gap-2 flex-1 items-end mb-5">
                        <CheckBoxField
                            control={control}
                            name="Revisar"
                            label="Revisar"
                            disabled
                        />
                        <CheckBoxField
                            control={control}
                            name="Conciliar"
                            label="Conciliar"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContractHeaderInputs