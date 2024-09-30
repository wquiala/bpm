'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Incompletos = {
   compania: string;
   mediador: string;
   fechaOperacion: string;
   producto: string;
   dniAsegurado: string;
   dniTomador: string;
   errores: string;
};

export const columnsIncompletos: ColumnDef<Incompletos>[] = [
   {
      accessorKey: 'compania',
      header: 'Compañia',
   },
   {
      accessorKey: 'mediador',
      header: 'Mediador',
   },
   {
      accessorKey: 'producto',
      header: 'Producto',
   },
   {
      accessorKey: 'fechaOperacion',
      header: 'Fecha de Operación',
   },
   {
      accessorKey: 'dniAsegurado',
      header: 'DNI asegurado',
   },
   {
      accessorKey: 'dniTomador',
      header: 'DNI tomador',
   },
   {
      accessorKey: 'errores',
      header: 'Errores',
   },
];
