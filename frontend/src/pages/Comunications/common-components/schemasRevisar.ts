import * as yup from 'yup';

export const defaultValues = {
   incidences: [],
};

export const schema = (t: any) =>
   yup.object().shape({
      incidences: yup.array(),
   });
