'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DocumentHistory = {
   Familia_Documento: string;
   Documento: number;
   Codigo: string;
   Estado: string;
   Fase: 'PRECON' | 'CON';
   Fecha_estado: string;
   TipoConciliacion: string;
   Caja: string;
   Lote: string;
};

export const columnsDocumentsHistory: ColumnDef<DocumentHistory>[] = [
   {
      accessorKey: 'Familia_Documento',
      header: 'Familia',
   },
   {
      accessorKey: 'Codigo',
      header: 'Código',
   },
   {
      accessorKey: 'Documento',
      header: 'Documento',
   },
   {
      accessorKey: 'Estado',
      header: 'Estado',
   },
   {
      accessorKey: 'Fase',
      header: 'Fase',
   },

   {
      accessorKey: 'Fecha_estado',
      header: 'Fecha del estado',
   },
   {
      accessorKey: 'TipoConciliacion',
      header: 'Tipo de conciliación',
   },
   {
      accessorKey: 'Caja',
      header: 'Caja',
   },
   {
      accessorKey: 'Lote',
      header: 'Lote',
   },
];
