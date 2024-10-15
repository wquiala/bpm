import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '@/utils/Contexts/AlertContext';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';

import handlePromise from '@/utils/promise';
import ContractService from '@/services/ContractService';
import { useAppSelector } from '@/stores/hooks';
import SelectContractModal from '../common-components/SelectContractModal';
import AltaManualForm from './components/AltaManualForm';

function Main() {
   const [, setAlert] = useContext(AlertContext);
   const [, setLoading] = useContext(LoadingContext);

   const { company } = useAppSelector((state) => state.settings);

   const [filteredContracts, setFilteredContracts] = useState<any[]>([]);
   const [selectedContract, setSelectedContract] = useState<any>(null);

   const [selectContractModal, setSelectContractModal] = useState<boolean>(false);

   useEffect(() => {
      if (filteredContracts.length > 1) {
         setSelectContractModal(true);
      }
   }, [filteredContracts]);

   return (
      <>
         <div className="flex flex-col items-center mt-4 intro-y sm:flex-row">
            <h2 className="mr-auto text-lg font-medium">Alta manual de pólizas</h2>
         </div>
         <div className="p-3 mt-4 intro-y box">
            <hr />
            <AltaManualForm />
         </div>
         <SelectContractModal
            show={selectContractModal}
            setShow={setSelectContractModal}
            filteredContracts={filteredContracts}
            selectedContract={selectedContract}
            setSelectedContract={setSelectedContract}
         />
      </>
   );
}

export default Main;
