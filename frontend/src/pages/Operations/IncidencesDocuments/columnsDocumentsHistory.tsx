'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DocumentHistory = {
   Familia_Documento: string;
   Grupo_Documento: number;
   Estado: string;
   Fase: 'PRECON' | 'CON';
   createdAt: string;
};

export const columnsDocumentsHistory: ColumnDef<DocumentHistory>[] = [
   {
      accessorKey: 'Familia_Documento',
      header: 'Familia Documento',
   },
   {
      accessorKey: 'Grupo_Documento',
      header: 'Grupo Documento',
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
      accessorKey: 'createdAt',
      header: 'Fecha del estado',
   },
];
