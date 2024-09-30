'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Incidence = {
   Familia_Documento: string;
   Incidencia: string;
   Comentarios: string;
   EstadoIncidencia: 'PRECON' | 'CON';
   Fecha_estado: string;
   FechaAltaIncidencia: string;
   FechaUltimaReclamacion: string;
   FechaProximaReclamacion: string;
};

export const columnsIncidences: ColumnDef<Incidence>[] = [
   {
      accessorKey: 'Familia_Documento',
      header: 'Familia Documento',
   },
   {
      accessorKey: 'Incidencia',
      header: 'Incidencia',
   },
   {
      accessorKey: 'Comentarios',
      header: 'Comentarios',
   },

   {
      accessorKey: 'Estado_Incidencia',
      header: 'Estado',
   },
   {
      accessorKey: 'FechaEstado',
      header: 'Fecha del estado',
   },
   {
      accessorKey: 'FechaAltaIncidencia',
      header: 'Fecha de alta de la incidencia ',
   },
   {
      accessorKey: 'FechaUltimaReclamacion',
      header: 'Fecha de la última relamación',
   },

   {
      accessorKey: 'FechaProximaReclamacion',
      header: 'Fecha de la próxima reclamación',
   },
];
