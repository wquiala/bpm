import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';
import Alert from '@/components/Base/Alert';
import Lucide from '@/components/Base/Lucide';
import handlePromise from '@/utils/promise';
import ContractService from '@/services/ContractService';
import ContractForm from './IncidencesDocumentsFormToSend';
import { useAppSelector } from '@/stores/hooks';
import PolicyFilters from '../common-components/PolicyFilters';
import SelectContractModal from '../common-components/SelectContractModal';
import IncidencesDocumentsFormToCheck from './IncidencesDocumentsFormToSend';
import DocumentIncidenceService from '@/services/DocumentIncidenceService';
import IncidencesDocumentsFormToSend from './IncidencesDocumentsFormToSend';

function Main() {
   const { t } = useTranslation();
   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   const { company, caja, lote } = useAppSelector((state) => state.settings);

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
         const [error, response, data] = await handlePromise(DocumentIncidenceService.getIncidenceDocuments());
         const incidencesToCheck = data.filter(
            (inci: any) => inci.Resuelta == false && inci.Revisada == true && inci.Reclamada == null,
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
