import { useEffect, useState } from 'react';

import handlePromise from '@/utils/promise';

import IncidencesDocumentsFormToCheck from './IncidencesDocumentsFormToCheck';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';

function Main() {
   /*    const [, setAlert] = useContext(AlertContext);

   const { company } = useAppSelector((state) => state.settings); */

   const [incidencesDocuments, setIncidencesDocuments] = useState<any>(null);

   const incidenceList: any[] = [];

   /* const onFilter = async (data: any) => {
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
         const [data] = await handlePromise(DocumentIncidenceService.getIncidenceDocuments());
         const incidencesToCheck = data.filter((inci: any) => !inci.Resuelta && !inci.Revisada);
         setIncidencesDocuments(incidencesToCheck);
      };

      get();
   }, []);

   return (
      <>
         <div className="flex flex-col items-center mt-4 intro-y sm:flex-row">
            <h2 className="mr-auto text-lg font-medium">Revisar envios de incidencias</h2>
         </div>
         <div>
            <IncidencesDocumentsFormToCheck
               incidencesDocuments={incidencesDocuments}
               setIncidencesDocuments={setIncidencesDocuments}
            />
            {/* {Object.keys(incidencesToOBJ).length > 0
               ? Object.keys(incidencesToOBJ).forEach((claveOperacion) => {
                    const clave = incidencesToOBJ[claveOperacion];
                    console.log(incidencesToOBJ(claveOperacion));

                    clave.map((c: any) => {
                       return (
                         
                       );
                    });
                 })
               : ''} */}
         </div>
      </>
   );
}

export default Main;
