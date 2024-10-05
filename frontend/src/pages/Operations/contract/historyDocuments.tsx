import { useFieldArray } from 'react-hook-form';
import { DataTable } from '../../../components/ui/dataDocumentsTable';
import { columnsContractsHistory, ContractHistory } from './columnsContractHistory';
import ParentModal from '../CommonComponents/ParentModal';
import { useEffect } from 'react';

type Props = {
   show: boolean;
   setShow: (show: boolean) => void;
   selectedContract: any;
};

export const HistoryContract = ({ show, setShow, selectedContract }: Props) => {
   const history: ContractHistory[] = selectedContract.HistorialContrato.map((contract: any) => {
      return {
         CCC: contract.CCC,
         Solicitud: contract.CodigoSolicitud,
         Poliza: contract.CodigoPoliza,
         Estado: contract.EstadoContrato,
         Operacion: contract.Operacion,
         FechaOperacion: new Date(contract.FechaOperacion).toLocaleDateString(),
         ResutadoFDCON: contract.ResutadoFDCON,
         Conciliar: contract.Conciliar ? 'SI' : 'NO',
         Revisar: contract.Revisar ? 'SI' : 'NO',
      };
   });
   return (
      <ParentModal size="xl" title="Históricos de documentos" show={show} setShow={setShow}>
         <div className="flex w-full justify-center items-center flex-col">
            <DataTable data={history} columns={columnsContractsHistory} />
         </div>
      </ParentModal>
   );
};
