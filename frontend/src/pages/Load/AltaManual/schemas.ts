import * as yup from 'yup';

export const defaultValues = {
   EstadoContrato: '',

   CompaniaId: null,

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
   ProfesionAsegurado: '',
   DeporteAsegurado: '',
   Operador: '',

   AnuladoSEfecto: false,
   Conciliar: true,
   Revisar: true,

   /* Suplemento: '',

   CSRespAfirmativas: '',

   FechaValidezDNITomador: '',
   MediadorId: '',
   Revisar: null,
   Conciliar: null, */
};

export const schema = (t: any) =>
   yup.object().shape({
      CompaniaId: yup.number().required().nullable(),
      EstadoContrato: yup.string(),

      ProductoNombre: yup.string().required(t('errors.required') ?? ''),
      MediadorNombre: yup.string().required(t('errors.required') ?? ''),
      CompaniaNombre: yup.string().required(t('errors.required') ?? ''),

      FechaOperacion: yup.string().required('Este campo es obligatorio').nullable(),
      TipoOperacion: yup.string(),

      FechaEfecto: yup.string().nullable(),

      CCC: yup.string(),
      CodigoSolicitud: yup.string().required(t('errors.required') ?? ''),
      CodigoPoliza: yup.string().required(t('errors.required') ?? ''),

      DNITomador: yup.string().required('Este campo es obligatorio'),
      FechaValidezDNITomador: yup.string().nullable(),
      NombreTomador: yup.string(),
      DNIAsegurado: yup.string().required('Este campo es obligatorio'),
      NombreAsegurado: yup.string(),
      FechaNacimientoAsegurado: yup.string().nullable(),
      ProfesionAsegurado: yup.string(),
      DeporteAsegurado: yup.string(),
      Operador: yup.string(),

      AnuladoSEfecto: yup.boolean(),
      Conciliar: yup.boolean(),
      Revisar: yup.boolean(),
   });
