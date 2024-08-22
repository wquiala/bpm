import { ESTADO_CONTRATO } from '@prisma/client';

export interface Contrato {
      Compania?: number;
      Producto?: number;
      Mediador?: number;
      EstadoContrato?: ESTADO_CONTRATO | null;
      ClaveOperacion?: string;
      FechaOperacion?: Date;
      CCC?: string | null;
      CodigoSolicitud?: string | null;
      CodigoPoliza?: string | null;
      FechaEfecto?: Date | null;
      AnuladoSEfecto?: boolean;
      DNIAsegurado?: string;
      NombreAsegurado?: string;
      FechaNacimientoAsegurado?: Date | null;
      CSRespAfirmativas?: boolean;
      ProfesionAsegurado?: string;
      DeporteAsegurado?: string;
      DNITomador?: string;
      NombreTomador?: string;
      FechaValidezDNITomador?: Date | null;
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

export interface ContractUpdate {
      EstadoContrato?: ESTADO_CONTRATO;
      CompaniaId?: number;
      ProductoId?: number;
      ClaveOperacion?: string;
      FechaOperacion?: Date | null;
      CodigoPoliza?: string;
      FechaEfecto?: Date | null;
      AnuladoSEfecto?: boolean;
      DNIAsegurado?: string;
      NombreAsegurado?: string;
      FechaNacimientoAsegurado?: Date | null;
      CSRespAfirmativas?: boolean | null;
      ProfesionAsegurado?: string;
      DeporteAsegurado?: string;
      DNITomador?: string;
      FechaValidezDNITomador?: Date | null;
      NombreTomador?: string;
      MediadorId?: number | null;
      Operador?: string;
      IndicadorFDPRECON?: boolean | null;
      TipoEnvioPRECON?: string;
      ResultadoFDPRECON?: string;
      IndicadorFDCON?: boolean | null;
      TipoEnvioCON?: string;
      ResultadoFDCON?: string;
      Revisar?: boolean;
      Conciliar?: boolean;
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
      'COMPA��A'?: string;
      PRODUCTO?: string;
      MEDIADOR?: string;
      EstadoContrato?: string;
      ClaveOperacion?: string;
      'FECHA DE OPERACI�N'?: string;
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

export interface Record {
      COMPAÑÍA: string;
      PRODUCTO: string;
      FECHA_DE_OPERACIÓN: string;
      TIPO_DE_OPERACIÓN: string;
      CCC: string;
      CODIGO_SOLICITUD: string;
      POLIZA_CONTRATO: string;
      FECHA_EFECTO: string;
      ANULADO_SIN_EFECTO: string;
      SUPLEMENTO: number;
      ID_ASEGURADO: string;
      NOMBRE_ASEGURADO: string;
      FECHA_DE_NACIMIENTO: string;
      CS_CON_RESPUESTAS_AFIRMATIVAS: string;
      PROFESION: string;
      DEPORTE: string;
      ID_TOMADOR_PARTICIPE: string;
      FECHA_VALIDEZ_IDENTIDAD_TOMADOR: string;
      NOMBRE_TOMADOR_PARTICIPE: string;
      MEDIADOR: string;
      OPERADOR: string;
      INDICADOR_FIRMA_DIGITAL_PRECON: string;
      TIPO_DE_ENVÍO_PRECON: string;
      RESULTADO_FIRMA_DIGITAL_PRECON: string;
      INDICADOR_FIRMA_DIGITAL_CON: string;
      TIPO_DE_ENVÍO_CON: string;
      RESULTADO_FIRMA_DIGITAL_CON: string;
      REVISAR: string;
      CONCILIAR: string;
}

export interface TabletaRecord {
      '#COMPANNIA'?: string | null;
      TIPO_PRODUCTO?: string | null;
      TIPO_SUBPRODUCTO?: string | null;
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
