import Button from '@/components/Base/Button';
import ParentModal from '@/custom-components/Modals/ParentModal';
import { useTranslation } from 'react-i18next';
import ReactJson from 'react-json-view';
import Papa from 'papaparse';
import { incompletos, reprocesarPolizas } from '@/helpers/FetchData/contracts';
import { useContext, useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/dataDocumentsTable';
import { columnsIncompletos, Incompletos } from './columnsIncompletos';
import { LoadingContext } from '@/utils/Contexts/LoadingContext';

type Props = {
   show: boolean;
   selectedRow: any;
   setShow: (show: boolean) => void;
   select: string;
   onRefresh: () => void;
};

const IncompletosComponent = ({ show, setShow, selectedRow, select, onRefresh }: Props) => {
   const [incompletosData, setIncompletosData] = useState<any[]>([]);
   const [loading, setLoading] = useContext(LoadingContext);

   //const [toShow, setToShow] = useState([]);
   /*  let mostrar: any[] = [];
   let actualizados;

   const data: any[] = mostrar.map((m) => ({
      erroes: JSON.stringify(m.err),
      ...m,
   })); */
   /* const handleDownload = () => {
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
   }; */

   const ButtonRecargar = () => {
      return (
         <div className="flex justify-end mb-2 fixed">
            <Button variant="primary" className="mr-2 h-5 w-32" onClick={handleRecargar}>
               Re-Cargar
            </Button>
         </div>
      );
   };

   const mostrar: Incompletos[] = incompletosData.map((i: any) => ({
      compania: i.Compania,
      mediador: i.Mediador,
      fechaOperacion: i.FechaOperacion,
      producto: i.Producto,
      dniAsegurado: i.DNIAsegurado,
      dniTomador: i.DNITomador,
      errores: JSON.stringify(i.errores),
   }));
   const handleRecargar = async () => {
      setLoading(true);
      const dataP = incompletosData.map((d: any) => {
         const { incompletaId, errores, createdAt, Insertada, ...rest } = d;
         return rest;
      });

      await reprocesarPolizas(dataP);
      setLoading(false);
      setShow(false);
      onRefresh();
   };

   useEffect(() => {
      if (show) {
         const inC = async () => {
            const { data, response, error } = await incompletos();
            setIncompletosData(data);
         };
         inC();
      }
   }, [show]);

   return (
      <ParentModal size="xl" title={`Contratos incompletos`} show={show} setShow={setShow} hideFooter>
         <div className="flex flex-col gap-2">
            <div className="w-full flex justify-end sticky z-10 top-0 left-0">
               <Button variant="primary" className="mr-2 h-5 w-32" onClick={handleRecargar}>
                  Re-Cargar
               </Button>
            </div>
            <DataTable columns={columnsIncompletos} data={mostrar} />
         </div>
      </ParentModal>
   );
};

export default IncompletosComponent;
{
   /* <div className="flex flex-col gap-2">
   <div className="w-full flex justify-end sticky z-10 top-0 left-0">
      <Button variant="primary" className="mr-2 h-5 w-32  " onClick={handleDownload}>
         Descargar CSV
      </Button>
      {select == 'INCOMPLETO REVISAR' && (
         <Button variant="primary" className="mr-2 h-5 w-32  " onClick={handleRecargar}>
            Re-Cargar
         </Button>
      )}
   </div>
   <div className="flex w-full justify-center items-center">{mostrar ? <ReactJson src={mostrar} /> : null}</div>
</div>; */
}
