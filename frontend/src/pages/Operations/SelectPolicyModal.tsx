import { useEffect, useState } from 'react';
import ParentModal from '@/custom-components/Modals/ParentModal';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

type Props = {
   filteredContracts: any[];
   selectedContract: any;
   setSelectedContract: (contract: any) => void;
   show: boolean;
   setShow: (show: boolean) => void;
};

const SelectPolicyModal = ({ show, setShow, selectedContract, setSelectedContract, filteredContracts }: Props) => {
   const { t } = useTranslation();
   const [selectedList, setSelectedList] = useState<any>(null);

   const handleSubmit = async () => {
      setSelectedContract(selectedList);
      setShow(false);
   };

   useEffect(() => {
      if (show) {
         setSelectedList(null);
      }
   }, [show]);

   return (
      <ParentModal
         size="md"
         title={t('selectContract')}
         show={show}
         setShow={setShow}
         handleOnSubmit={handleSubmit}
         submitButtonText={t('select')}
      >
         <div className="flex flex-col justify-center gap-2">
            {filteredContracts.map((contract, index) => {
               console.log(contract);
               return (
                  <button key={contract.ClaveOperacion} className="intro-y" onClick={() => setSelectedList(contract)}>
                     <div
                        className={twMerge([
                           'flex items-center px-4 py-4 mb-3 box zoom-in',
                           selectedList === contract && 'bg-secondary',
                        ])}
                     >
                        <div className="ml-4 mr-auto">
                           <div className="font-medium">
                              No.Póliza/Contrato:{' '}
                              {contract.CodigoPoliza && contract.CodigoPoliza !== ''
                                 ? contract.CodigoPoliza
                                 : contract.CodigoSolicitud}
                           </div>
                           <div className="text-slate-500 text-xs mt-0.5 flex gap-1">
                              <p className="font-medium">{t('insuranceDNI')}:</p> {contract.DNIAsegurado}
                           </div>
                           <div className="text-slate-500 text-xs mt-0.5  flex gap-1">
                              <p className="font-medium">Fecha Alta:</p>
                              {contract?.FechaOperacion
                                 ? new Date(contract.FechaOperacion).toLocaleDateString()
                                 : '---'}
                           </div>
                           <div className="text-slate-500 text-xs mt-0.5  flex gap-1">
                              <p className="font-medium">Fecha Estado:</p>
                              {contract?.updatedAt ? new Date(contract.updatedAt).toLocaleDateString() : '---'}
                           </div>
                           <div className="text-slate-500 text-xs mt-0.5  flex gap-1">
                              <p className="font-medium">CCC:</p>
                              {contract?.CCC ?? '---'}
                           </div>
                           <div className="text-slate-500 text-xs mt-0.5  flex gap-1">
                              <p className="font-medium">Anulado sin efecto:</p>
                              {contract?.AnuladoSEfecto ? 'SI' : 'NO'}
                           </div>
                           <div className="text-slate-500 text-xs mt-0.5  flex gap-1">
                              <p className="font-medium">{t('branch')}:</p>
                              {contract.Producto.Codigo}
                           </div>
                           <div className="text-slate-500 text-xs mt-0.5  flex gap-1">
                              <p className="font-medium">Conciliar:</p> {contract?.Conciliar ? 'SI' : 'NO'}
                           </div>
                        </div>
                     </div>
                  </button>
               );
            })}
         </div>
      </ParentModal>
   );
};

export default SelectPolicyModal;
