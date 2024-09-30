import * as yup from 'yup';

export const defaultValues = {
   MediadorId: 26314,
   ProductoId: 191,
   CompaniaId: 5,
   EstadoContrato: '',

   CompaniaNombre: '',
   ProductoNombre: '',
   MediadorNombre: '',

   FechaOperacion: '',
   TipoOperacion: '',

   FechaEfecto: '',

   CCC: '',
   CodigoSolicitud: '',
   CodigoPoliza: '',

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
   AnuladoSEfecto: false,
   Conciliar: true,
   Revisar: true,

   NotaInterna: '',

   /* Suplemento: '',

   CSRespAfirmativas: '',

   FechaValidezDNITomador: '',
   MediadorId: '',
   Revisar: null,
   Conciliar: null, */
};

export const schema = (t: any) =>
   yup.object().shape({
      MediadorId: yup.number(),
      ProductoId: yup.number(),
      CompaniaId: yup.number(),
      EstadoContrato: yup.string(),

      ProductoNombre: yup.string().required(t('errors.required') ?? ''),
      MediadorNombre: yup.string().required(t('errors.required') ?? ''),
      CompaniaNombre: yup.string().required(t('errors.required') ?? ''),

      FechaOperacion: yup.string().required('Este campo es obligatorio').nullable(),
      TipoOperacion: yup.string(),

      FechaEfecto: yup.string().required('Este campo es obligatorio').nullable(),

      CCC: yup.string(),
      CodigoSolicitud: yup.string().required(t('errors.required') ?? ''),
      CodigoPoliza: yup.string().required(t('errors.required') ?? ''),

      DNITomador: yup.string().required('Este campo es obligatorio'),
      FechaValidezDNITomador: yup.string().nullable(),
      NombreTomador: yup.string(),
      DNIAsegurado: yup.string().required('Este campo es obligatorio'),
      NombreAsegurado: yup.string(),
      FechaNacimientoAsegurado: yup.string().nullable(),
      Profesion: yup.string(),
      Deporte: yup.string(),
      Operador: yup.string(),

      DetalleObservacion: yup
         .array()
         .of(yup.object().shape({ observation: yup.string().required(t('errors.required') ?? '') })),
      documents: yup.array(),
      AnuladoSEfecto: yup.boolean(),
      Conciliar: yup.boolean(),
      Revisar: yup.boolean(),

      NotaInterna: yup.string().optional(),
   });
