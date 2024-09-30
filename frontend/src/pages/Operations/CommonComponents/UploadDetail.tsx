import ParentModal from '@/custom-components/Modals/ParentModal';
import { logCarga } from '@/interfaces/logCarga';
import { useTranslation } from 'react-i18next';
import ReactJson from 'react-json-view';

type Props = {
   show: boolean;
   selectedRow: any;
   setShow: (show: boolean) => void;
};

const UploadDetail = ({ show, setShow, selectedRow }: Props) => {
   let insert;
   let incomplete;
   let desechados;
   let actualizados;
   const { t } = useTranslation();

   const row = selectedRow?.Details;
   if (row != undefined) {
      insert = JSON.parse(row).filter((r: any) => r['estado'] == 'INSERTADO');
      incomplete = JSON.parse(row).filter((r: any) => r['estado'] == 'INCOMPLETO');
      desechados = JSON.parse(row).filter((r: any) => r['estado'] == 'DESECHADO');
      actualizados = JSON.parse(row).filter((r: any) => r['estado'] == 'ACTUALIZADO');
   }

   return (
      <ParentModal size="lg" title="Detalles de la carga" show={show} setShow={setShow} hideFooter>
         <div className="flex w-full justify-center items-center">
            {selectedRow?.Details ? <ReactJson src={incomplete} /> : null}
         </div>
      </ParentModal>
   );
};

export default UploadDetail;
