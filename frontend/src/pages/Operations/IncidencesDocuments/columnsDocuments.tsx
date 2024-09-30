'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Document = {
   Familia_Documento: string;
   Grupo_Documento: number;
   Estado: string;
   Fase: 'PRECON' | 'CON';
   Fecha_estado: string;
   FechaUltimaRecepcion: string;
   FechaUltimaReclamacion: string;
   FechaProximaReclamacion: string;
};

export const columnsDocuments: ColumnDef<Document>[] = [
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
      accessorKey: 'Fecha_estado',
      header: 'Fecha del estado',
   },
   {
      accessorKey: 'FechaUltimaRecepcion',
      header: 'Fecha de la última recepción',
   },
   {
      accessorKey: 'FechaUltimaReclamacion',
      header: 'Fecha de la última reclamación ',
   },

   {
      accessorKey: 'FechaProximaReclamacion',
      header: 'Fecha de la próxima reclamación',
   },
];
