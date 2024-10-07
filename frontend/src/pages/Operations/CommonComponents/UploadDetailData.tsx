import Button from '@/components/Base/Button';
import ParentModal from '@/custom-components/Modals/ParentModal';
import ReactJson from 'react-json-view';
import Papa from 'papaparse';

type Props = {
   show: boolean;
   selectedRow: any;
   setShow: (show: boolean) => void;
   select: string;
};

const UploadDetailData = ({ show, setShow, selectedRow, select }: Props) => {
   let mostrar: any[] = [];
   let actualizados;

   const row: any = selectedRow?.Details;
   if (row != undefined) {
      if (select == 'INSERTADO') {
         mostrar = JSON.parse(row).filter((r: any) => r['estado'] == 'INSERTADO');
      }
      if (select == 'INCOMPLETO') {
         mostrar = JSON.parse(row).filter((r: any) => r['estado'] == 'INCOMPLETO');
      }
      if (select == 'DESECHADO') {
         mostrar = JSON.parse(row).filter((r: any) => r['estado'] == 'DESECHADO');
      }
      if (select == 'ACTUALIZADO') {
         mostrar = JSON.parse(row).filter((r: any) => r['estado'] == 'ACTUALIZADO');
      }
   }

   const data: any[] = mostrar.map((m) => ({
      erroes: JSON.stringify(m.err),
      ...m,
   }));
   const handleDownload = () => {
      // Convertir los datos JSON a CSV
      const csv = Papa.unparse(data, { delimiter: ';' });

      // Crear un Blob con el contenido CSV
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

      // Crear una URL para el Blob
      const url = URL.createObjectURL(blob);

      // Crear un enlace para descargar el archivo
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'datos.csv');

      // Adjuntar el enlace al DOM, hacer click y removerlo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   return (
      <ParentModal size="xl" title={`Detalles de la carga: `} show={show} setShow={setShow} hideFooter>
         <div className="flex flex-col gap-2">
            <div className="w-full flex justify-end sticky z-10 top-0 left-0">
               <Button variant="primary" className="mr-2 h-5 w-32  " onClick={handleDownload}>
                  {/*  <CSVLink data={data} headers={header} filename="data.csv">
                     Descargar CSV
                  </CSVLink> */}
                  Descargar CSV
               </Button>
            </div>
            <div className="flex w-full justify-center items-center">
               {mostrar ? <ReactJson src={mostrar} /> : null}
            </div>
         </div>
      </ParentModal>
   );
};

export default UploadDetailData;
