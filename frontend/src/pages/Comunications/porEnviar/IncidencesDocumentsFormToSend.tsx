import Button from '@/components/Base/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Lucide from '@/components/Base/Lucide';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';

import InputField from '@/custom-components/FormElements/InputField';

import { defaultValues, schema } from '../common-components/schemasRevisar';
import { downloadEmail, sendEmail } from '@/helpers/FetchData/comunications';

type Props = {
   incidencesDocuments: any;
   setIncidencesDocuments: any;
};

const IncidencesDocumentsFormToSend = ({ incidencesDocuments, setIncidencesDocuments }: Props) => {
   const { t } = useTranslation();
   const navigate = useNavigate();

   const [, setLoading] = useContext(LoadingContext);
   const [claves, setClaves] = useState<any>([]);
   //const [dataEmail, setDataEmil] = useState();

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

   //const handleImprimir = () => {};

   const habndleDownloadEmail = async (clave: string) => {
      const incidencesByClave = claves.find((claver: any) => claver[0].claveOperacion == clave);

      const { data } = await downloadEmail(clave, incidencesByClave);

      const fileUrl = data.fileUrl;

      // Abre el archivo en una nueva ventana o pestaña del navegador
      window.open(fileUrl, '_blank');
   };

   const onSubmit = async (data: any) => {
      //setLoading(true);
      const incidences: any[] = [];
      for (const inci of data.incidences) {
         for (const incidence of inci) {
            incidences.push(incidence);
         }
      }

      /* const { data: d } =  */ await sendEmail(incidences);
      /*  const test = d.arrayList[0].pathDoc;
      const printWindow = window.open(test);

      // Espera a que el documento cargue completamente y luego llama a `print`
      if (printWindow) {
         printWindow.addEventListener('load', () => {
            printWindow.print();
         });
      } */
      setLoading(false);
      // navigate('/');
   };

   useEffect(() => {
      if (incidencesDocuments && incidencesDocuments.length > 0) {
         const array: any[] = [];
         const incidenceList: any[] = [];

         for (const incidencesDocument of incidencesDocuments) {
            incidenceList.push({
               DocumentoId: incidencesDocument.DocumentoContrato.DocumentoId,
               IncidenciaDocId: incidencesDocument.IncidenciaDocId,
               nombreDocumento: incidencesDocument.DocumentoContrato.MaestroDocumentos.Nombre,
               claveOperacion: incidencesDocument.DocumentoContrato.Contrato.ClaveOperacion,
               incidenciaNombre: incidencesDocument.TipoDocumentoIncidencia.MaestroIncidencias.Nombre,
               mediador: incidencesDocument.DocumentoContrato.Contrato.Mediador.Nombre,
               emailTo: incidencesDocument.DocumentoContrato.Contrato.Mediador.Email,
               nota: incidencesDocument.Nota,
            });
         }

         const incidencestoObject = incidenceList.reduce((acc: any, incidence: any) => {
            const clave = incidence.claveOperacion;

            if (!acc[clave]) {
               acc[clave] = [];
            }
            acc[clave].push(incidence);
            return acc;
         }, {} as Record<string, any[]>);

         Object.keys(incidencestoObject).forEach((claveOperacion) => {
            const incidences = incidencestoObject[claveOperacion];
            array.push(incidences);
         });

         if (JSON.stringify(claves) !== JSON.stringify(array)) {
            // Evita actualización innecesaria
            setClaves(array);
         }
      }
   }, [incidencesDocuments, claves]); // Dependencia de incidencesDocuments y claves

   useEffect(() => {
      if (claves.length > 0) {
         reset({
            incidences: claves,
         });
      }
   }, [claves]); // Dependencia solo de claves

   return (
      <form className="flex flex-col mt-4 box" onSubmit={handleSubmit(onSubmit)}>
         <div className="pt-0 p-2 m-2 mb-2">
            <div className="flex flex-col gap-3">
               {Array.isArray(claves) && claves.length > 0
                  ? claves.map((group: any, groupIndex: number) => {
                       const clave = group[0].claveOperacion;
                       return (
                          <div key={clave}>
                             <div className="flex justify-between">
                                <h1>Contrato {clave}</h1>
                                <Button
                                   variant="outline-primary"
                                   type="button"
                                   className="flex gap-2"
                                   onClick={() => habndleDownloadEmail(clave)}
                                >
                                   Descargue el email
                                   <Lucide icon="Mail" />
                                </Button>
                             </div>

                             <br />
                             {group.map((item: any, index: number) => {
                                return (
                                   <div key={item.IncidenciaDocId} className="flex gap-2 items-center">
                                      <div className="w-32">
                                         <InputField
                                            label="Doc."
                                            control={control}
                                            name={`incidences.${groupIndex}.${index}.nombreDocumento`}
                                            disabled
                                         />
                                      </div>
                                      <div className="w-full">
                                         <InputField
                                            label="Incidencia"
                                            control={control}
                                            name={`incidences.${groupIndex}.${index}.incidenciaNombre`}
                                            disabled
                                         />
                                      </div>
                                      <div className="w-1/6">
                                         <InputField
                                            label="Mediador"
                                            control={control}
                                            name={`incidences.${groupIndex}.${index}.mediador`}
                                            disabled
                                         />
                                      </div>
                                   </div>
                                );
                             })}
                          </div>
                       );
                    })
                  : 'No hay incidencias para revisar'}
            </div>
         </div>
         <div className="flex flex-col sm:flex-row justify-center items-center my-2 gap-3">
            <Button variant="secondary" onClick={() => navigate('/')}>
               {t('goBack')}
            </Button>
            {Array.isArray(incidencesDocuments) && incidencesDocuments.length > 0 && (
               <div className="flex gap-3">
                  <Button variant="primary" disabled={!isValid} type="submit">
                     Imprimir
                  </Button>
                  <Button variant="primary" disabled={!isValid} type="submit">
                     Enviar
                  </Button>
               </div>
            )}
         </div>
      </form>
   );
};

export default IncidencesDocumentsFormToSend;
