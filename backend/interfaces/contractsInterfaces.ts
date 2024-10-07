import { ESTADO_CONTRATO } from '@prisma/client';

export interface Contrato {
   Compania?: number;
   Producto?: number;
   Mediador?: number;
   EstadoContrato?: ESTADO_CONTRATO | null;
   ClaveOperacion?: string;
   FechaOperacion?: string | null;
   CCC?: string | null;
   CodigoSolicitud?: string | null;
   CodigoPoliza?: string | null;
   FechaEfecto?: string | null;
   AnuladoSEfecto?: boolean;
   DNIAsegurado?: string;
   NombreAsegurado?: string;
   FechaNacimientoAsegurado?: string | null;
   CSRespAfirmativas?: boolean;
   ProfesionAsegurado?: string;
   DeporteAsegurado?: string;
   DNITomador?: string;
   NombreTomador?: string;
   FechaValidezDNITomador?: string | null;
   Operador?: string | null;
   IndicadorFDPRECON?: boolean;
   TipoEnvioPRECON?: string;
   ResultadoFDPRECON: string;
   IndicadorFDCON: boolean;
   TipoEnvioCON: string;
   ResultadoFDCON: string;
   Revisar: boolean;
   Conciliar: boolean;
   Suplemento: boolean;
}

export interface ContractHistoryData {
   ContratoId?: number;
   EstadoContrato?: ESTADO_CONTRATO;
   Operacion?: any;
   FechaOperacion?: any;
   FechaEfecto?: any;
   AnuladoSEfecto?: boolean | null;
   DNIAsegurado?: string | null;
   NombreAsegurado?: string | null;
   FechaNacimientoAsegurado?: any;
   CSRespAfirmativas?: boolean | null;
   ProfesionAsegurado?: string | null;
   DeporteAsegurado?: string | null;
   DNITomador?: string | null;
   FechaValidezDNITomador?: any;
   NombreTomador?: string | null;
   Operador?: any;
   IndicadorFDPRECON?: boolean | null;
   TipoEnvioPRECON?: any;
   ResultadoFDPRECON?: string | null;
   IndicadorFDCON?: boolean | null;
   TipoEnvioCON?: any;
   ResultadoFDCON?: string | null;
   Revisar?: boolean;
   Conciliar?: boolean;
   Incidencias?: string | null;
   errores?: any;
   createdAt?: Date;
}

type FechaOperacionType = string | null | Date;

export interface ContractUpdate {
   ContratoId?: number;
   EstadoContrato?: ESTADO_CONTRATO;
   CompaniaId?: number;
   ProductoId?: number;
   ClaveOperacion?: string;
   FechaOperacion?: FechaOperacionType;
   CodigoPoliza?: string;
   FechaEfecto?: FechaOperacionType;
   AnuladoSEfecto?: boolean;
   DNIAsegurado?: string;
   NombreAsegurado?: string;
   FechaNacimientoAsegurado?: FechaOperacionType;
   CSRespAfirmativas?: boolean | null;
   ProfesionAsegurado?: string;
   DeporteAsegurado?: string;
   DNITomador?: string;
   FechaValidezDNITomador?: FechaOperacionType;
   NombreTomador?: string;
   MediadorId?: number;
   Operador?: string;
   IndicadorFDPRECON?: boolean | null;
   TipoEnvioPRECON?: string;
   ResultadoFDPRECON?: string;
   IndicadorFDCON?: boolean | null;
   TipoEnvioCON?: string;
   ResultadoFDCON?: string;
   Revisar?: boolean;
   Conciliar?: boolean;
   NumeroReclamaciones?: number;
   FechaProximaReclamacion?: FechaOperacionType;
   FechaReclamacion?: FechaOperacionType;

   errores?: string;
}

enum TIPO_ENVIO {
   PRESENCIAL = 'PRESENCIAL',
   REMOTA = 'REMOTA',
}

export enum OPERACION_CONTRATO {
   INSERTADO = 'INSERTADO',
   ACTUALIZADO = 'ACTUALIZADO',
   DESECHADO = 'DESECHADO',
   ELIMINADO = 'ELIMINADO',
}

export interface ErroresContrato {
   COMPAÑÍA?: string;
   PRODUCTO?: string;
   MEDIADOR?: string;
   EstadoContrato?: string;
   ClaveOperacion?: string;
   'FECHA DE OPERACIÓN'?: string;
   CCC?: string;
   CodigoSolicitud?: string;
   CodigoPoliza?: string;
   'FECHA EFECTO'?: string;
   'ANULADO SIN EFECTO'?: string;
   ID_ASEGURADO?: string;
   'NOMBRE ASEGURADO'?: string;
   'FECHA DE NACIMIENTO'?: string;
   CSRespAfirmativas?: string;
   ProfesionAsegurado?: string;
   DeporteAsegurado?: string;
   ID_TOMADOR_PARTICIPE?: string;
   'NOMBRE TOMADOR_PARTICIPE'?: string;
   'FECHA VALIDEZ IDENTIDAD TOMADOR'?: string;
   OPERADOR?: string;
   'INDICADOR FIRMA DIGITAL PRECON'?: string;
   TipoEnvioPRECON?: string;
   ResultadoFDPRECON?: string;
   'INDICADOR FIRMA DIGITAL CON'?: string;
   TipoEnvioCON?: string;
   ResultadoFDCON?: string;
   REVISAR?: string;
   CONCILIAR?: string;
   Suplemento?: string;
   Incidencias?: string;
}

export interface RecordDiaria {
   Compania?: string;
   Producto?: string;
   FechaOperacion?: string | null;
   TipoOperacion?: string;
   CCC: string;
   CodigoSolicitud: string;
   CodigoPoliza: string | undefined;
   FechaEfecto?: string | null;
   AnuladoSEfecto?: string | null;
   Suplemento?: string;
   DNIAsegurado?: string;
   NombreAsegurado?: string;
   FechaNacimientoAsegurado?: string | null;
   CSRespAfirmativas?: string;
   ProfesionAsegurado?: string;
   DeporteAsegurado?: string;
   DNITomador?: string;
   FechaValidezDNITomador?: string | null;
   NombreTomador?: string;
   Mediador?: string;
   Operador?: string;
   IndicadorFDPRECON?: string;
   TipoEnvioPRECON?: string;
   ResultadoFDPRECON?: string;
   IndicadorFDCON?: string;
   TipoEnvioCON?: string;
   ResultadoFDCON?: string;
   Revisar?: string;
   Conciliar?: string;
}

export interface NoProcesarInterface extends RecordDiaria {
   MotivoDesechado: string;
}

export interface TabletaRecord {
   compania?: string | null;
   tipoProducto?: string | null;
   tipoSubProducto?: string | null;
   NOMBRE_COMERCIAL_PRODUCTO?: string;
   CODIGO_PRODUCTO?: string;
   CODIGO_MODALIDAD?: string;
   CODIGO_POLIZA?: string;
   CODIGO_SOLICITUD?: string;
   FECHA_GRABACION?: string;
   NUM_IDENTIFICACION_ASE?: string;
   NOMBRE_ASE?: string;
   NUM_IDENTIFICACION_TO?: string;
   NOMBRE_TO?: string;
   CODIGO_MEDIADOR?: string;
   NOMBRE_MEDIADOR?: string;
   CODIGO_SUBMEDIADOR?: string;
   NOMBRE_SUBMEDIADOR?: string;
   CCC?: string;
   FECHA_OPERACION?: string;
   FECHA_ACTUALIZACION?: string;
   DESC_OPERACION?: string;
   TIPO_REGISTRO?: string;
   CODIGO_INTERNO_FORMULARIO?: string;
   DESC_FORMULARIO?: string;
   TIPO_FIRMA?: string;
   FECHA_FIRMA?: string;
   SITUACION_FIRMA?: string;
   CANAL_MEDIADOR?: string;
   CANAL_RECEPCION_FIRMA?: string;
   CODIGO_CENTRO?: string;
   NUM_ACTUALIZACIONES?: number;
   USUARIO?: string;
   CONCILIAR?: boolean;
   FORMULARIO_PRINCIPAL?: boolean;
   OBSERVACIONES?: string;
   FECHA_GENERACION?: string;
   FECHA_CARGA?: string;
}

export interface FirmaDigitalRecord {
   'AÑO/MES': string;
   NUM_POLIZA: string;
   CODIGO_POLIZA_TC: string;
   ESTADO_POLIZA: string;
   TIPO_ENVIO: string;
   ESTADO: string;
   RESULTADO: string;
   FECHA_INICIO: string;
   FECHA_CIERRE: string;
   MEDIADOR: string;
   DNI_ASEGURADO: string;
   ASEGURADO: string;
   MOVIL_ASEGURADO: string;
   DNI_TOMADOR: string;
   TOMADOR: string;
   MOVIL_TOMADOR: string;
   _16: string;
}

export interface Anuladas {
   COMPAÑÍA?: string;
   CLAVE_OPERACIÓN?: string;
   'FECHA EMISIÓN ANULACIÓN'?: string;
   'FECHA EFECTO ANULACIÓN'?: string;
   'MOTIVO ANULACIÓN'?: string;
   ''?: string;
}

enum TIPO_FIRMA {
   MANUAL = 'MANUAL',
   DIGITAL = 'DIGITAL',
}
