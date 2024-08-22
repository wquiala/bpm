import * as yup from 'yup'

export const defaultValues = {
    CCC: '',
    CodigoSolicitud: '',
    CodigoPoliza: '',
    DNIAsegurado: '',
    NombreAsegurado: '',
    FechaAltaSolicitud: '',
    CodigoMediador: null,
    Revisar: false,
    Conciliar: false,

    RamoId: 0,
    RamoCodigo: '',
    RamoDesc: '',
    TipoOperacion: '',
    CanalMediador: null,
    FechaEfecto: '',
    Suplemento: false,
    AnuladoSE: false,
    TipoConciliacion: null,
    IndicadorFDCON: false,
    IndicadorFDPRECON: false,
    EdadAsegurado: 0,
    ProfesionAsegurado: '',
    DeporteAsegurado: '',
    FechaNacimientoAsegurado: '',
    DNITomador: '',
    NombreTomador: '',
    CSRespAfirm: false,
    FechaDNITomador: '',

    Baja: false,
    NoDigitalizar: false,
    observations: [],
    documents: []
}

export const schema = (t: any) => yup.object().shape(
    {
        CCC: yup.string(),
        CodigoSolicitud: yup.string(),
        CodigoPoliza: yup.string(),
        DNIAsegurado: yup.string(),
        NombreAsegurado: yup.string(),
        FechaAltaSolicitud: yup.string().required(t("errors.required") ?? ''),
        CodigoMediador: yup.string().nullable(),
        Revisar: yup.boolean(),
        Conciliar: yup.boolean(),

        RamoId: yup.number().required(t("errors.required") ?? ''),
        RamoCodigo: yup.string().required(t("errors.required") ?? ''),
        RamoDesc: yup.string().required(t("errors.required") ?? ''),
        TipoOperacion: yup.string().nullable(),
        CanalMediador: yup.string().nullable(),
        FechaEfecto: yup.string().nullable(),
        Suplemento: yup.boolean(),
        AnuladoSE: yup.boolean(),
        TipoConciliacion: yup.string().nullable(),
        IndicadorFDCON: yup.boolean(),
        IndicadorFDPRECON: yup.boolean(),
        EdadAsegurado: yup.number().nullable(),
        ProfesionAsegurado: yup.string().required(t("errors.required") ?? ''),
        DeporteAsegurado: yup.string().required(t("errors.required") ?? ''),
        FechaNacimientoAsegurado: yup.string(),
        DNITomador: yup.string(),
        NombreTomador: yup.string(),
        CSRespAfirm: yup.boolean(),
        FechaDNITomador: yup.string().nullable(),



        Baja: yup.boolean(),
        NoDigitalizar: yup.boolean(),
        observations: yup.array().of(yup.object().shape({ observation: yup.string().required(t("errors.required") ?? '') })),
        documents: yup.array()
    }
)