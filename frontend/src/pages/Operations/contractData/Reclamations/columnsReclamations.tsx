'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reclamations = {
   FechaReclamacion: string;
   Mediador: string;
   CorreosDestinatarios: string;
};

export const columnsReclamations: ColumnDef<Reclamations>[] = [
   {
      accessorKey: 'FechaReclamacion',
      header: 'Fecha de reclamación',
   },
   {
      accessorKey: 'Mediador',
      header: 'Mediador',
   },
   {
      accessorKey: 'CorreosDestinatarios',
      header: 'Correos destinatarios',
   },
];
