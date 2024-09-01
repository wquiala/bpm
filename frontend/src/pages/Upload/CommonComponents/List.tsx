import Button from '@/components/Base/Button';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TableFilters from './TableFilters';
import Table from '@/custom-components/Table/Table';
import columns from './Columns';
import { ColumnDefinition } from 'tabulator-tables';
import UploadDetail from './UploadDetail';
import UploadFile from './UploadFile';
import UploadDetailData from './UploadDetailData';

type Props = {
   tableName: string;
   endpoint: string;
   uploadType: string;
};

const List = ({ tableName, endpoint, uploadType }: Props) => {
   const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
   const [showDetailModalData, setShowDetailModalData] = useState<boolean>(false);
   const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
   const [selectedField, setSelectedField] = useState<string>('');

   const [selectedRow, setSelectedRow] = useState<any>(null);
   const table = useRef();

   const [filter, setFilter] = useState({
      field: 'Tipo',
      type: 'like',
      value: '',
   });

   const handleCellClick = (rowData: any, fieldName: string) => {
      setSelectedRow(rowData);
      setSelectedField(fieldName);
      setShowDetailModalData(true);
   };

   const onResetFilter = () => {
      setFilter({
         ...filter,
         field: 'Nombre',
         type: 'like',
         value: '',
      });
      //@ts-ignore
      table.current?.onFilter();
      //@ts-ignore
      table.current?.refetchData();
   };

   const onTableAction = (action: string) => {
      //@ts-ignore
      table.current?.[action]();
   };

   const onExportCsv = () => onTableAction('onExportCsv');
   const onExportJson = () => onTableAction('onExportJson');
   const onExportXlsx = () => onTableAction('onExportXlsx');
   const onExportHtml = () => onTableAction('onExportHtml');
   const onPrint = () => onTableAction('onPrint');
   const onFilter = () => onTableAction('onFilter');

   return (
      <>
         <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
            <h2 className="mr-auto text-lg font-medium">
               {uploadType == 'policy'
                  ? 'Fichero de carga diaria'
                  : uploadType == 'digitalSignature'
                  ? 'Fichero de firma digital'
                  : uploadType == 'anuladas'
                  ? 'Fichero de anuladas'
                  : 'Fichero de tabletas'}
            </h2>
            <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
               <Button
                  variant="primary"
                  className="mr-2 shadow-md"
                  onClick={() => {
                     setShowUploadModal(true);
                  }}
               >
                  Añadir
               </Button>
            </div>
         </div>

         <div className="p-5 mt-5 intro-y box">
            <TableFilters
               filter={filter}
               setFilter={setFilter}
               onFilter={onFilter}
               onResetFilter={onResetFilter}
               onPrint={onPrint}
               onExportCsv={onExportCsv}
               onExportJson={onExportJson}
               onExportXlsx={onExportXlsx}
               onExportHtml={onExportHtml}
            />
            <Table
               ref={table}
               tableName={tableName}
               endpoint={endpoint}
               columns={columns(handleCellClick) as ColumnDefinition[]}
               filter={filter}
               setFilter={setFilter}
            />

            <UploadDetailData
               show={showDetailModalData}
               setShow={setShowDetailModalData}
               selectedRow={selectedRow}
               select={selectedField}
            />

            <UploadFile
               uploadType={uploadType}
               show={showUploadModal}
               setShow={setShowUploadModal}
               onRefresh={() => {
                  //@ts-ignore
                  table.current?.refetchData();
               }}
            />
         </div>
      </>
   );
};

export default List;
