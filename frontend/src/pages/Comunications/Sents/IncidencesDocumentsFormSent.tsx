import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import InputField from '@/custom-components/FormElements/InputField';

import { defaultValues, schema } from '../common-components/schemasRevisar';

type Props = {
   incidencesDocuments: any;
   setIncidencesDocuments: any;
};

const IncidencesDocumentsFormSent = ({ incidencesDocuments, setIncidencesDocuments }: Props) => {
   const { t } = useTranslation();

   const {
      control,
      reset,
      //      setValue,

      handleSubmit,
   } = useForm({
      mode: 'onChange',
      resolver: yupResolver(schema(t)),
      defaultValues: defaultValues,
   });

   const { fields } = useFieldArray({
      control,
      name: 'incidences',
   });

   const onSubmit = async (data: any) => {};

   /*    const [revisarTodos, setRevisarTodos] = useState(false);
    */
   useEffect(() => {
      const resetFormFiels = async () => {
         const incidenceList = [];

         for (const incidencesDocument of incidencesDocuments) {
            incidenceList.push({
               DocumentoId: incidencesDocument.DocumentoContrato.DocumentoId,
               IncidenciaDocId: incidencesDocument.IncidenciaDocId,
               nombreDocumento: incidencesDocument.DocumentoContrato.MaestroDocumentos.Codigo,
               claveOperacion: incidencesDocument.DocumentoContrato.Contrato.ClaveOperacion,
               incidenciaNombre: incidencesDocument.MaestroIncidencias.Nombre,
               mediador: incidencesDocument.DocumentoContrato.Contrato.Mediador.Nombre,
               revisada: incidencesDocument.Revisada,
               enviada: incidencesDocument.Enviar,
               emailTo: incidencesDocument.DocumentoContrato.Contrato.Mediador.Email,
            });
         }

         reset({
            incidences: incidenceList,
         });
      };
      if (incidencesDocuments) {
         resetFormFiels();
      }
   }, [incidencesDocuments]);

   /*  const handleTodoRevisado = () => {
      if (revisarTodos) {
         fields.map((field, index) => {
            setValue(`incidences.${index}.revisada`, false);
         });
         setRevisarTodos(false);
      } else if (!revisarTodos) {
         fields.map((field, index) => {
            setValue(`incidences.${index}.revisada`, true);
         });
         setRevisarTodos(true);
      }
   }; */

   return (
      <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
         <div className="pt-0 p-2 m-2 mb-2">
            <div className="flex flex-col gap-3">
               {fields.map((item: any, index: number) => {
                  return (
                     <div key={item.id}>
                        <div className="flex gap-2 items-center">
                           <div className="w-[600px]">
                              <InputField
                                 label="Contrato"
                                 control={control}
                                 name={`incidences.${index}.claveOperacion`}
                                 disabled
                              />
                           </div>
                           <div className="w-[180px]">
                              <InputField
                                 label="Doc."
                                 control={control}
                                 name={`incidences.${index}.nombreDocumento`}
                                 disabled
                              />
                           </div>
                           <div className="w-full">
                              <InputField
                                 label="Incidencia"
                                 control={control}
                                 name={`incidences.${index}.incidenciaNombre`}
                                 disabled
                              />
                           </div>
                           <div className="w-[350px]">
                              <InputField
                                 label="Mediador"
                                 control={control}
                                 name={`incidences.${index}.mediador`}
                                 disabled
                              />
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </form>
   );
};

export default IncidencesDocumentsFormSent;
