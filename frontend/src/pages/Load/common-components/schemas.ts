import * as yup from 'yup';

/* export const defaultValues = {
    CCC: '',
    CodigoSolicitud: '',
    CodigoPoliza: '',
    FechaAltaSolicitud: '',
    RamoId: 0,
    RamoCodigo: '',
    Baja: false,
    DNITomador: '',
    NombreTomador: '',
    DNIAsegurado: '',
    NombreAsegurado: '',
    ProfesionAsegurado: '',
    DeporteAsegurado: '',
    FechaNacimientoAsegurado: '',
    NoDigitalizar: false,
    observations: [],
    documents: []
}
 */

export const defaultValues = {
   EstadoContrato: '',
   ClaveOperacion: '',
   /*    CompaniaId: '',
    */
   ProductoId: 191,
   CompaniaId: 5,
   MediadorId: 26314,
   UsuarioId: 15,

   FechaOperacion: '',
   TipoOperacion: '',
   FechaEfecto: '',
   CCC: '',
   CodigoSolicitud: '',
   CodigoPoliza: '',

   ProductoNombre: '',
   CompanniaNombre: '',
   MediadorNombre: '',

   DNITomador: '',
   NombreTomador: '',
   FechaValidezDNITomador: '',

   DNIAsegurado: '',
   NombreAsegurado: '',
   DetalleObservacion: [],
   CajasLotes: [],
   documents: [],
   AnuladoSEfecto: false,
   Conciliar: true,
   Revisar: true,
   ResultadoFDCON: '',
   ResultadoFDPRECON: '',
   NotaInterna: '',
   FechaGrabacion: null,
   Usuario: '',

   /* Suplemento: '',

   CSRespAfirmativas: '',

   FechaValidezDNITomador: '',
   MediadorId: '',
   Operador: '',
   Revisar: null,
   Conciliar: null, */
};

export const schema = (t: any) =>
   yup.object().shape({
      EstadoContrato: yup.string(),
      ClaveOperacion: yup.string().required(t('errors.required')),
      CompaniaId: yup.number(),
      ProductoId: yup.number(),
      MediadorId: yup.number(),
      UsuarioId: yup.number(),
      FechaOperacion: yup.string(),
      FechaEfecto: yup.string(),

      TipoOperacion: yup.string(),
      CCC: yup.string(),
      CodigoSolicitud: yup.string(),
      CodigoPoliza: yup.string(),
      ProductoNombre: yup.string(),
      MediadorNombre: yup.string(),
      CompanniaNombre: yup.string().required(t('errors.required') ?? ''),
      Usuario: yup.string(),
      DNITomador: yup.string(),
      FechaValidezDNITomador: yup.string(),
      NombreTomador: yup.string(),
      DNIAsegurado: yup.string(),
      NombreAsegurado: yup.string(),
      DetalleObservacion: yup.array().of(yup.object().shape({ observation: yup.string() })),
      CajasLotes: yup.array().of(yup.object().shape({ cajalote: yup.string().required(t('errors.required') ?? '') })),

      documents: yup.array(),
      AnuladoSEfecto: yup.boolean(),
      Conciliar: yup.boolean(),
      Revisar: yup.boolean(),
      ResultadoFDCON: yup.string(),
      ResultadoFDPRECON: yup.string(),
      NotaInterna: yup.string().optional(),
      FechaGrabacion: yup.string().nullable(),
   });
