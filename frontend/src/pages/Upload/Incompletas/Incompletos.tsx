('use client');
import { useEffect, useState } from 'react';

import ParentModal from '@/custom-components/Modals/ParentModal';

import { deleteIncompletosByClave, incompletos /* reprocesarPolizas */ } from '@/helpers/FetchData/contracts';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { EditIncompletoModal } from './editIncompletoModal';

type Registro = {
   id: number;
   nombre: string;
   email: string;
};
type Props = {
   show: boolean;
   selectedRow: any;
   setShow: (show: boolean) => void;
   select: string;
   onRefresh: () => void;
};

export type Incompletos = {
   compania: string;
   mediador: string;
   codigoSolicitud?: string;
   codigoPoliza?: string;
   producto: string;
   dniAsegurado: string;
   errores: string;
};

const IncompletosComponent = ({ show, setShow, selectedRow, select, onRefresh }: Props) => {
   const [incompletosData, setIncompletosData] = useState<any[]>([]);
   const [editIncompleto, setEditIncompleto] = useState(false);
   const [selectedIncompleto, setSelectedIncompleto] = useState(null);

   //const [toShow, setToShow] = useState([]);
   /*  let mostrar: any[] = [];
   let actualizados;

   const data: any[] = mostrar.map((m) => ({
      erroes: JSON.stringify(m.err),
      ...m,
   })); */

   /* const ButtonRecargar = () => {
      return (
         <div className="flex justify-end mb-2 fixed">
            <Button variant="primary" className="mr-2 h-5 w-32" onClick={handleRecargar}>
               Re-Cargar
            </Button>
         </div>
      );
   };
 */

   // Función para manejar la edición de un registro
   const handleEditar = async (id: number) => {
      setEditIncompleto(true);
      const incompleto = incompletosData.find((i) => i.incompletaId == id);
      setSelectedIncompleto(incompleto);
      // Aquí iría la lógica para editar el registro
   };

   // Función para manejar la eliminación de un registro
   const handleEliminar = async (id: number) => {
      const { response, data } = await deleteIncompletosByClave(id);
      if (response.ok) {
         const nuevaLista = incompletosData.filter((registro) => registro.incompletaId !== data.incompletaId);
         setIncompletosData(nuevaLista);
      }
   };
   /* const handleRecargar = async () => {
      setLoading(true);
      const dataP = incompletosData.map((d: any) => {
         const { incompletaId, errores, createdAt, Insertada, ...rest } = d;
         return rest;
      });

      await reprocesarPolizas(dataP);
      setLoading(false);
      setShow(false);
      onRefresh();
   }; */

   useEffect(() => {
      if (show) {
         const inC = async () => {
            const { data } = await incompletos();
            const mostrar = data.map((d: any) => d);
            setIncompletosData(mostrar);
         };
         inC();
      }
   }, [show]);

   return (
      <ParentModal size="xl" title={`Contratos incompletos`} show={show} setShow={setShow} hideFooter>
         <div className="container mx-auto p-4">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>#</TableHead>
                     <TableHead>Compañia</TableHead>
                     <TableHead>Mediador</TableHead>
                     <TableHead>Producto</TableHead>
                     <TableHead>DNI asegurado</TableHead>
                     <TableHead>Solicitud</TableHead>
                     <TableHead>Póliza</TableHead>
                     <TableHead>Errores</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {incompletosData.length > 0
                     ? incompletosData.map((registro, index) => (
                          <TableRow key={registro.incompletaId}>
                             <TableCell>{index + 1}</TableCell>
                             <TableCell>{registro.Compania}</TableCell>
                             <TableCell>{registro.Mediador}</TableCell>
                             <TableCell>{registro.Producto}</TableCell>
                             <TableCell>{registro.DNIAsegurado}</TableCell>
                             <TableCell>{registro.CodigoSolicitud}</TableCell>
                             <TableCell>{registro.CodigoPoliza}</TableCell>
                             <TableCell>{JSON.stringify(registro.errores)}</TableCell>
                             <TableCell>
                                <div className="flex space-x-2">
                                   <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => handleEditar(registro.incompletaId)}
                                   >
                                      <Pencil className="h-4 w-4" />
                                      <span className="sr-only">Editar</span>
                                   </Button>
                                   <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => handleEliminar(registro.incompletaId)}
                                   >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Eliminar</span>
                                   </Button>
                                </div>
                             </TableCell>
                          </TableRow>
                       ))
                     : 'No hay registros incompletos'}
               </TableBody>
            </Table>
            <EditIncompletoModal
               showEdit={editIncompleto}
               setShowEdit={setEditIncompleto}
               incompletaData={selectedIncompleto}
            />
         </div>
      </ParentModal>
   );
};

export default IncompletosComponent;
