import { useTranslation } from 'react-i18next';
import UploadDetail from './UploadDetail';
import List from './List';
import { useState } from 'react';

const columns = (handleCellClick: any) => {
   const { t } = useTranslation();

   const cols = [
      {
         title: '',
         formatter: 'responsiveCollapse',
         width: 40,
         minWidth: 30,
         hozAlign: 'center',
         resizable: false,
         headerSort: false,
      },
      {
         title: 'Tipo', //Titulo del campo de la tabla
         with: 100,
         field: 'Tipo', //para mostrar en la tabla puede ser cualquiera pero para la descarga debe ser el campo de la bd
         hozAlign: 'center',
         headerHozAlign: 'center',
         vertAlign: 'middle',
         visible: true,
         print: true,
         download: true,
         formatter(cell: any) {
            const response: any = cell.getData();
            return `<div class="flex items-center lg:justify-center">
                            ${response?.Tipo ?? '---'}
                        </div>`;
         },
      },
      {
         title: 'Total',
         minWidth: 100,
         field: 'TotalRegistros',
         hozAlign: 'center',
         headerHozAlign: 'center',
         vertAlign: 'middle',
         visible: true,
         print: true,
         download: true,

         formatter(cell: any) {
            const response: any = cell.getData();
            const handleClick = () => {
               console.log('prueba');
            };
            return `<div class="flex items-center lg:justify-center" >
                            ${response?.TotalRegistros ?? '---'}
                        </div>`;
         },
      },

      {
         title: 'Insertados',
         minWidth: 100,
         field: 'Insertados',
         hozAlign: 'center',
         headerHozAlign: 'center',
         vertAlign: 'middle',
         visible: true,
         print: true,
         download: true,
         formatter(cell: any) {
            const response: any = cell.getData();
            return `<div class="flex items-center lg:justify-center">
                            ${response?.Insertados ?? '---'}
                        </div>`;
         },
         cellClick: (e: any, cell: any) => {
            handleCellClick(cell.getData(), 'INSERTADO');
         },
      },
      {
         title: 'Actualizados',
         minWidth: 100,
         field: 'Actualizados',
         hozAlign: 'center',
         headerHozAlign: 'center',
         vertAlign: 'middle',
         visible: true,
         print: true,
         download: true,
         formatter(cell: any) {
            const response: any = cell.getData();
            return `<div class="flex items-center lg:justify-center">
                            ${response?.Actualizados ?? '---'}
                        </div>`;
         },
         cellClick: (e: any, cell: any) => {
            handleCellClick(cell.getData(), 'ACTUALIZADO');
         },
      },
      {
         title: 'Incompletos',
         minWidth: 100,
         field: 'ConError',
         hozAlign: 'center',
         headerHozAlign: 'center',
         vertAlign: 'middle',
         visible: true,
         print: true,
         download: true,
         formatter(cell: any) {
            const response: any = cell.getData();
            return `<div class="flex items-center lg:justify-center">
                            ${response?.ConError ?? '---'}
                        </div>`;
         },
         cellClick: (e: any, cell: any) => {
            handleCellClick(cell.getData(), 'INCOMPLETO');
         },
      },
      {
         title: 'Desechados',
         minWidth: 100,
         field: 'Desechados',
         hozAlign: 'center',
         headerHozAlign: 'center',
         vertAlign: 'middle',
         visible: true,
         print: true,
         download: true,
         formatter(cell: any) {
            const response: any = cell.getData();
            return `<div class="flex items-center lg:justify-center">
                            ${response?.Desechados ?? '---'}
                        </div>`;
         },
         cellClick: (e: any, cell: any) => {
            handleCellClick(cell.getData(), 'DESECHADO');
         },
      },
      {
         title: 'Fecha de carga',
         minWidth: 100,
         field: 'createdAt',
         hozAlign: 'center',
         headerHozAlign: 'center',
         vertAlign: 'middle',
         visible: true,
         print: true,
         download: true,
         formatter(cell: any) {
            const response: any = cell.getData();
            return `<div class="flex items-center lg:justify-center">
                            ${response?.createdAt ? new Date(response?.createdAt).toLocaleDateString() : '---'}
                        </div>`;
         },
      },
      /*  {
         title: t('updatedAt'),
         minWidth: 200,
         field: 'FechaUltimaModif',
         hozAlign: 'center',
         headerHozAlign: 'center',
         vertAlign: 'middle',
         print: false,
         download: false,
         formatter(cell: any) {
            const response: any = cell.getData();
            return `<div class="flex items-center lg:justify-center">
                ${response?.FechaUltimaModif ? new Date(response?.FechaUltimaModif).toLocaleDateString() : '---'}
                        </div>`;
         },
      }, */

      // For print format
      /*   {
         title: 'Tipo',
         field: 'Tipo',
         visible: true,
         print: true,
         download: true,
      },
      {
         title: 'Total',
         field: 'Total',
         visible: true,
         print: true,
         download: true,
      },
      {
         title: 'Insertados',
         field: 'Insertados',
         visible: true,
         print: true,
         download: true,
      },
      {
         title: 'Actualizados',
         field: 'Actualizados',
         visible: true,
         print: true,
         download: true,
      },
      {
         title: 'Incompletos',
         field: 'Incompletos',
         visible: true,
         print: true,
         download: true,
      },
      {
         title: 'Desechados',
         field: 'Desechados',
         visible: true,
         print: true,
         download: true,
      },

      {
         title: 'Fecha de carga',
         field: 'Fecha de carga',
         visible: false,
         print: true,
         download: true,
      }, */
      /* {
         title: t('updatedAt'),
         field: 'FechaUltimaModif',
         visible: false,
         print: true,
         download: true,
      }, */
   ];

   return cols;
};

export default columns;
