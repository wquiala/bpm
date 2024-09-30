'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DigitalSignature = {
   FechaAlta: string;
   FirmaDigital: string;
   IndicadorFirmaPrecon: string;
   TipoEnvioPrecon: string;
   ResultadoPrecon: string;
   IndicadorFirmaCon: string;
   TipoEnvioCon: string;
   ResultadoCon: string;
   Revisar: string;
   Conciliar: string;
};

export const columnsDigitalSignature: ColumnDef<DigitalSignature>[] = [
   {
      accessorKey: 'FechaAlta',
      header: 'Fecha de alta',
   },
   {
      accessorKey: 'FirmaDigital',
      header: 'Firma digital',
   },
   {
      accessorKey: 'IndicadorFirmaPrecon',
      header: 'Indicador de firma digital PRECON',
   },
   {
      accessorKey: 'TipoEnvioPrecon',
      header: 'Tipo de envío PRECON',
   },
   {
      accessorKey: 'ResultadoPrecon',
      header: 'Resultado de firma digital PRECON',
   },
   {
      accessorKey: 'IndicadorFirmaCon',
      header: 'Indicador de firma digital CON',
   },
   {
      accessorKey: 'TipoEnvioCon',
      header: 'Tipo de envío CON',
   },
   {
      accessorKey: 'ResultadoCon',
      header: 'Resultado de firma digital CON',
   },
   {
      accessorKey: 'Revisar',
      header: 'Revisar',
   },
   {
      accessorKey: 'Conciliar',
      header: 'Conciliar',
   },
];
