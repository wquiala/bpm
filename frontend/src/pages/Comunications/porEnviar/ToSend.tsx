import handlePromise from '@/utils/promise';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';
import IncidencesDocumentsFormToSend from './IncidencesDocumentsFormToSend';
import { useEffect, useState } from 'react';

function Main() {
   const [incidencesDocuments, setIncidencesDocuments] = useState<any[]>([]);

   /*  const onFilter = async (data: any) => {
      if (!company) {
         return setAlert({
            type: 'error',
            show: true,
            text: 'companyNotSelected',
         });
      }
   }; */

   useEffect(() => {
      const get = async () => {
         const [, , data] = await handlePromise(DocumentIncidenceService.getIncidenceDocuments());
         const incidencesToCheck = data.filter(
            (inci: any) => !inci.Resuelta && inci.Revisada && inci.Reclamada == null,
         );
         setIncidencesDocuments(incidencesToCheck);
      };

      get();
   }, []);

   return (
      <>
         <div className="flex flex-col items-center mt-4 intro-y sm:flex-row">
            <h2 className="mr-auto text-lg font-medium">
               Lista de incidencias revisadas listas para enviar comunicación
            </h2>
         </div>
         <div className="p-3 mt-4 intro-y box">
            {/*             <PolicyFilters onFilter={onFilter} />
             */}{' '}
            <hr />
            {/* {incidencesDocuments ? ( */}
            <IncidencesDocumentsFormToSend
               incidencesDocuments={incidencesDocuments}
               setIncidencesDocuments={setIncidencesDocuments}
            />
         </div>
      </>
   );
}

export default Main;
