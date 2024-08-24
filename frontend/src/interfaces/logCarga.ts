export interface logCarga {
   LogCargaId: number;
   LogId: number;
   Tipo: string;
   TotalRegistros: number;
   Insertados: number;
   Actualizados: number;
   Desechados: number;
   ConError: number;
   Details: string;
   createdAt: string;
}

export interface Details {
   compania?: string;
   producto?: string;
   fechaOperacion?: string;
   tipoOperacion?: string;
   ccc: string;
   codigoSolicitud: string;
   polizaContrato: string | undefined;
   fechaEfecto?: Date;
   anulaSE?: string | boolean;
   suplemento?: string;
   dniAsegurado?: string;
   nombreAsegurado?: string;
   fechaNacimiento?: string;
   csResAfirm?: string;
   profesion?: string;
   deporte?: string;
   dniTomador?: string;
   fechaValidezDniT?: string;
   nombreTomador?: string;
   mediador?: string;
   operador?: string;
   indicadorPrecon?: string;
   tipoEnvioPrecon?: string;
   resultadoPrecon?: string;
   indicadorCon?: string;
   tipoEnvioC?: string;
   resultadoCon?: string;
   revisar?: string;
   conciliar?: string;
   estado: string;
}
