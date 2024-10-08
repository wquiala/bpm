import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '@/utils/Contexts/AlertContext';

import handlePromise from '@/utils/promise';

import { useAppSelector } from '@/stores/hooks';
import PolicyFilters from '../common-components/PolicyFilters';
import IncidencesDocumentsFormToCheck from './IncidencesDocumentsFormSent';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';

function Main() {
   const [, setAlert] = useContext(AlertContext);

   const { company } = useAppSelector((state) => state.settings);

   const [incidencesDocuments, setIncidencesDocuments] = useState<any[]>([]);

   const onFilter = async (data: any) => {
      if (!company) {
         return setAlert({
            type: 'error',
            show: true,
            text: 'companyNotSelected',
         });
      }
   };

   useEffect(() => {
      const get = async () => {
         const [, , data] = await handlePromise(DocumentIncidenceService.getIncidenceDocuments());
         const incidencesToCheck = data.filter((inci: any) => !inci.Resuelta && inci.Reclamada != null);
         setIncidencesDocuments(incidencesToCheck);
      };

      get();
   }, []);

   return (
      <>
         <div className="flex flex-col items-center mt-4 intro-y sm:flex-row">
            <h2 className="mr-auto text-lg font-medium">Comunicaciones enviadas</h2>
            <PolicyFilters onFilter={onFilter} />
         </div>
         <div className="p-3 mt-4 intro-y box">
            <hr />
            <IncidencesDocumentsFormToCheck
               incidencesDocuments={incidencesDocuments}
               setIncidencesDocuments={setIncidencesDocuments}
            />
         </div>
      </>
   );
}

export default Main;
