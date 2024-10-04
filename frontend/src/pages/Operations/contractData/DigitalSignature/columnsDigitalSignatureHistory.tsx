'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DigitalSignatureHistory = {
   FechaAlta: string;

   TipoEnvioCon?: string;
   ResultadoCon?: string;
   /*  Revisar?: string;
   Conciliar?: string; */
};

export const columnsDigitalSignatureHistory: ColumnDef<DigitalSignatureHistory>[] = [
   {
      accessorKey: 'FechaAlta',
      header: 'Fecha de alta',
   },
   /*  {
      accessorKey: 'FirmaDigital',
      header: 'Firma digital',
   }, */

   {
      accessorKey: 'TipoEnvioCon',
      header: 'Tipo de envío CON',
   },
   {
      accessorKey: 'ResultadoCon',
      header: 'Resultado de firma digital CON',
   },
   /*   {
      accessorKey: 'Revisar',
      header: 'Revisar',
   },
   {
      accessorKey: 'Conciliar',
      header: 'Conciliar',
   }, */
];
