'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type IncidenceHistory = {
   Incidencia: string;
   Comentarios: string;
   EstadoIncidencia: string;
   Fecha_estado: string;
};

export const columnsIncidencesHistory: ColumnDef<IncidenceHistory>[] = [
   {
      accessorKey: 'Incidencia',
      header: 'Incidencia',
   },
   {
      accessorKey: 'Comentarios',
      header: 'Comentarios',
   },

   {
      accessorKey: 'EstadoIncidencia',
      header: 'Estado',
   },
   {
      accessorKey: 'Fecha_estado',
      header: 'Fecha del estado',
   },
];
