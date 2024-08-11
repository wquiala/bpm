export interface Contrato {
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

export interface ContractHistoryData {
      ContratoId?: number;
      Estado?: string;
      Operacion?: any;
      FechaOperacion?: any;
      FechaEfecto?: any;
      AnuladoSEfecto?: boolean;
      DNIAsegurado?: string;
      NombreAsegurado?: string;
      FechaNacimientoAsegurado?: any;
      CSRespAfirmativas?: boolean | null;
      ProfesionAsegurado?: string | null;
      DeporteAsegurado?: string | null;
      DNITomador?: string;
      FechaValidezDNITomador?: any;
      NombreTomador?: string;
      Operador?: any;
      IndicadorFDPRECON?: boolean | null;
      TipoEnvioPRECON?: any;
      ResultadoFDPRECON?: string | null;
      IndicadorFDCON?: boolean | null;
      TipoEnvioCON?: any;
      ResultadoFDCON?: string | null;
      Revisar?: boolean;
      Conciliar?: boolean;
      Incidencias?: string;
}

enum TIPO_ENVIO {
      PRESENCIAL = 'PRESENCIAL',
      REMOTA = 'REMOTA',
}
