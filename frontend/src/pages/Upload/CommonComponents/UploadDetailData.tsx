import Button from '@/components/Base/Button';
import ParentModal from '@/custom-components/Modals/ParentModal';
import { toDownload } from '@/helpers/download';
import { Details, logCarga } from '@/interfaces/logCarga';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactJson from 'react-json-view';
import { CSVLink, CSVDownload } from 'react-csv';

type Props = {
   show: boolean;
   selectedRow: any;
   setShow: (show: boolean) => void;
   select: string;
};

/* const parse = (details: any[]) => {
   const data: DetailsCarga[] = details.map(d => {
      compania: d.COMPAÑÍA,

         producto: d.PRODUCTO,
      
   'fecha de operacion': d.'FECHA DE OPERACIÓN',
   'tipo de operacion'?: string;
   ccc?: string;
   'codigo de solicitud'?: string;
   'codigo de poliza'?: string;
   'fecha de efecto'?: string;
   'anulado sin efecto'?: boolean;
   suplemento?: number;
   'dni asegurado'?: string;
   'nombre asegurado'?: string;
   'fecha nacimiento asegurado'?: string;
   'cs resp afirmativas'?: boolean;
   profesion?: string;
   deporte?: string;
   'dni tomador'?: string;
   'fecha validez dni tomador'?: string;
   'nombre tomador participe'?: string;
   mediador?: number;
   operador?: string;
   indicadofdprecon?: string;
   'tipo envio precon'?: string;
   'resultado firma digital precon'?: string;
   'indicador firma digital con'?: string;
   'tipo envio con'?: string;
   'resultado firma digital com'?: string;
   revisar?: boolean;
   conciliar?: boolean;
   estado?: string;
   })
   return 
   
} */

const UploadDetailData = ({ show, setShow, selectedRow, select }: Props) => {
   let mostrar: any[] = [];
   let actualizados;
   const { t } = useTranslation();

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

   const header = [
      { label: 'Compañia', key: 'compania' },
      { label: 'Producto', key: 'producto' },

      { label: 'CCC', key: 'ccc' },
      { label: 'Código de solicitud', key: 'codigoSolicitud' },
      { label: 'Código de póliza', key: 'polizaContrato' },
      { label: 'DNI del tomador', key: 'dniTomador' },
      { label: 'Resultado firma digital CON', key: 'resultadoCon' },
      { label: 'Resultado firma digital Pre CON', key: 'resultadoPrecon' },
      { label: 'Conciliar', key: 'conciliar' },
      { label: 'Revisar', key: 'revisar' },
      { label: 'Estado', key: 'estado' },
   ];
   console.log(mostrar);
   /* compania?: string;
   producto?: string;
   fechaOperacion?: string;
   tipoOperacion?: string;
   ccc: string;
   codigoSolicitud: string;
   polizaContrato: string | undefined;
   fechaEfecto?: Date;
   anulaSE?: string | boolean;
   suplemento?: string;
   dniAsegurado?: string;
   nombreAsegurado?: string;
   fechaNacimiento?: string;
   csResAfirm?: string;
   profesion?: string;
   deporte?: string;
   dniTomador?: string;
   fechaValidezDniT?: string;
   nombreTomador?: string;
   mediador?: string;
   operador?: string;
   indicadorPrecon?: string;
   tipoEnvioPrecon?: string;
   resultadoPrecon?: string;
   indicadorCon?: string;
   tipoEnvioC?: string;
   resultadoCon?: string;
   revisar?: string;
   conciliar?: string;
   estado: string; */
   const data: any = mostrar.map((m) => ({
      compania: m.compania,
      producto: m.producto,
      fechaOperacion: m.fechaOperacion,
      tipoOperacion: m.tipoOperacion,
      ccc: m.ccc,
      codigoSolicitud: m.codigoSolicitud,
      polizaContrato: m.polizaContrato,
      fechaEfecto: m.fechaEfecto,
      anulaSE: m.anulaSE,
      suplemento: m.suplemento,
      dniAsegurado: m.dniAsegurado,
      nombreAsegurado: m.nombreAsegurado,
      fechaNacimiento: m.fechaNacimiento,
      csResAfirm: m.csResAfirm,
      profesion: m.profesion,
      deporte: m.deporte,
      dniTomador: m.dniTomador,
      fechaValidezDniT: m.fechaValidezDniT,
      nombreTomador: m.nombreTomador,
      mediador: m.mediador,
      operador: m.operador,
      indicadorPrecon: m.indicadorPrecon,
      tipoEnvioPrecon: m.tipoEnvioPrecon,
      resultadoPrecon: m.resultadoPrecon,
      indicadorCon: m.indicadorCon,
      tipoEnvioC: m.tipoEnvioC,
      resultadoCon: m.tipoEnvioC,
      revisar: m.revisar,
      conciliar: m.conciliar,
      estado: m.estado,
   }));
   /*  [
      { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
      { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
      { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
   ]; */

   const download = () => {};

   return (
      <ParentModal size="xl" title={`Detalles de la carga: `} show={show} setShow={setShow} hideFooter>
         <div className="flex flex-col gap-2">
            <div className="w-full flex justify-end sticky z-10 top-0 left-0">
               <Button variant="primary" className="mr-2 h-5 w-32  " onClick={download}>
                  <CSVLink data={data} headers={header} filename="data.csv">
                     Descargar CSV
                  </CSVLink>
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
