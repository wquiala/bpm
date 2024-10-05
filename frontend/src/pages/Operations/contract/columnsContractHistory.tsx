'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ContractHistory = {
   CCC: string;
   Solicitud: number;
   Poliza: string;
   Estado: string;
   Operacion: string;
   FechaOperacion: string;
   ResutadoFDCON: string;
   Conciliar: boolean;
   Revisar: boolean;
};

export const columnsContractsHistory: ColumnDef<ContractHistory>[] = [
   {
      accessorKey: 'CCC',
      header: 'CCC',
   },
   {
      accessorKey: 'Solicitud',
      header: 'Solicitud',
   },
   {
      accessorKey: 'Poliza',
      header: 'Póliza',
   },
   {
      accessorKey: 'Estado',
      header: 'Estado',
   },
   {
      accessorKey: 'FechaOperacion',
      header: 'Fecha de operación',
   },

   {
      accessorKey: 'Conciliar',
      header: 'Conciliar',
   },
   {
      accessorKey: 'Revisar',
      header: 'Revisar',
   },
];
