-- CreateTable
CREATE TABLE `Rol` (
    `RolId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Activo` BOOLEAN NULL DEFAULT true,
    `FechaAlta` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Rol_Nombre_key`(`Nombre`),
    PRIMARY KEY (`RolId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `UsuarioId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `CaducidadPassword` DATETIME(3) NULL,
    `RolId` INTEGER NOT NULL,
    `Codigo` VARCHAR(191) NULL,
    `FechAlta` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Activo` BOOLEAN NULL DEFAULT true,
    `FechaBaja` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_Codigo_key`(`Codigo`),
    PRIMARY KEY (`UsuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `LogId` INTEGER NOT NULL AUTO_INCREMENT,
    `UsuarioId` INTEGER NOT NULL,
    `Accion` VARCHAR(191) NOT NULL,
    `Detalles` VARCHAR(191) NOT NULL,
    `FechaAccion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`LogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compania` (
    `CompaniaId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Codigo` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `Telefono` VARCHAR(191) NULL,
    `CorreoComp` VARCHAR(191) NULL,
    `ReclamarComp` BOOLEAN NULL DEFAULT false,
    `CorreoSoporte` VARCHAR(191) NULL,
    `ReclamarSoporte` BOOLEAN NULL DEFAULT false,
    `ColorBase` VARCHAR(191) NULL,
    `FechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,
    `FechaUltimaModif` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Compania_Codigo_key`(`Codigo`),
    UNIQUE INDEX `Compania_Descripcion_key`(`Descripcion`),
    PRIMARY KEY (`CompaniaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mediador` (
    `MediadorId` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Codigo` VARCHAR(191) NOT NULL,
    `Canal` VARCHAR(191) NULL,
    `Zona` VARCHAR(191) NULL,
    `Email` VARCHAR(191) NULL,
    `Responsable` VARCHAR(191) NULL,
    `EmailResponsable` VARCHAR(191) NULL,
    `Responsable2` VARCHAR(191) NULL,
    `EmailResponsable2` VARCHAR(191) NULL,
    `Reclamar` BOOLEAN NULL DEFAULT false,
    `FechaAlta` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,
    `FechaUltimaModif` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Observaciones` VARCHAR(191) NULL,
    `Activo` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`MediadorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaestroDocumentos` (
    `DocumentoId` INTEGER NOT NULL,
    `Codigo` VARCHAR(191) NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `Suplemento` BOOLEAN NOT NULL,
    `FechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,
    `FechaUltimaModif` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Activo` BOOLEAN NOT NULL,

    PRIMARY KEY (`DocumentoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaestroIncidencias` (
    `IncidenciaId` INTEGER NOT NULL,
    `DocAsociadoId` INTEGER NULL,
    `Codigo` VARCHAR(191) NOT NULL,
    `Nombre` TEXT NOT NULL,
    `Activo` BOOLEAN NOT NULL,
    `FechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`IncidenciaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocIncidencia` (
    `TipoDocIncidenciaId` INTEGER NOT NULL,
    `DocumentoId` INTEGER NOT NULL,
    `IncidenciaId` INTEGER NOT NULL,
    `ContratoId` INTEGER NULL,
    `Cinciliado` BOOLEAN NULL,
    `MailInterno` BOOLEAN NOT NULL DEFAULT false,
    `FechaConciliacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,
    `FechaUltimaModif` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`TipoDocIncidenciaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RepositorioPlantillas` (
    `PlantillaId` INTEGER NOT NULL,
    `Documento` LONGBLOB NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Activo` BOOLEAN NOT NULL,
    `FechaAlta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,
    `FechaUltimaModif` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`PlantillaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `ProductoId` INTEGER NOT NULL AUTO_INCREMENT,
    `CompId` INTEGER NOT NULL,
    `Codigo` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `Reclamar` BOOLEAN NULL DEFAULT false,
    `Activo` BOOLEAN NULL DEFAULT true,
    `FechaAlta` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,
    `FechaUltimaModif` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Observaciones` VARCHAR(191) NULL,

    UNIQUE INDEX `Producto_Codigo_key`(`Codigo`),
    PRIMARY KEY (`ProductoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RamoTipoOperacion` (
    `RamoTipoOpId` INTEGER NOT NULL,
    `ProductoId` INTEGER NOT NULL,
    `PlantillaIncidencia` INTEGER NULL,
    `PlantillaConciliacion` INTEGER NULL,
    `TipoOperacion` VARCHAR(191) NOT NULL,
    `Activo` BOOLEAN NOT NULL,
    `FechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,

    PRIMARY KEY (`RamoTipoOpId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoDocumento` (
    `ProductoDocId` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductoId` INTEGER NOT NULL,
    `DocumentoId` INTEGER NOT NULL,
    `AnexoIncidencias` INTEGER NULL,
    `AnexoConciliacion` INTEGER NULL,
    `Caratula` INTEGER NULL,
    `RequiereComunicacion` BOOLEAN NULL DEFAULT false,
    `Fase` VARCHAR(191) NOT NULL,
    `Activo` BOOLEAN NOT NULL,
    `FechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `FechaBaja` DATETIME(3) NULL,

    PRIMARY KEY (`ProductoDocId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrato` (
    `ContratoId` INTEGER NOT NULL AUTO_INCREMENT,
    `EstadoContrato` ENUM('PENDIENTE', 'PENDIENTE_INCIDENCIA', 'SIN_CONCILIAR', 'TRAMITADA', 'ANULADA', 'DESECHADO') NOT NULL DEFAULT 'PENDIENTE',
    `ClaveOperacion` VARCHAR(191) NULL,
    `CompaniaId` INTEGER NULL,
    `ProductoId` INTEGER NULL,
    `FechaOperacion` DATETIME(3) NULL,
    `TipoOperacion` VARCHAR(191) NOT NULL DEFAULT 'ALTA',
    `CCC` VARCHAR(191) NULL,
    `CodigoSolicitud` VARCHAR(191) NULL,
    `CodigoPoliza` VARCHAR(191) NULL,
    `FechaEfecto` DATETIME(3) NULL,
    `AnuladoSEfecto` BOOLEAN NOT NULL DEFAULT false,
    `Suplemento` BOOLEAN NULL DEFAULT false,
    `DNIAsegurado` VARCHAR(191) NOT NULL,
    `NombreAsegurado` VARCHAR(191) NOT NULL,
    `FechaNacimientoAsegurado` DATETIME(3) NULL,
    `CSRespAfirmativas` BOOLEAN NULL,
    `ProfesionAsegurado` VARCHAR(191) NULL,
    `DeporteAsegurado` VARCHAR(191) NULL,
    `DNITomador` VARCHAR(191) NOT NULL,
    `FechaValidezDNITomador` DATETIME(3) NULL,
    `NombreTomador` VARCHAR(191) NOT NULL,
    `MediadorId` INTEGER NULL,
    `Operador` ENUM('ONE', 'HAM', 'TLPUCV', 'TLPPLV') NULL,
    `IndicadorFDPRECON` BOOLEAN NULL,
    `TipoEnvioPRECON` ENUM('PRESENCIAL', 'REMOTA') NULL,
    `ResultadoFDPRECON` VARCHAR(191) NULL,
    `IndicadorFDCON` BOOLEAN NULL,
    `TipoEnvioCON` ENUM('PRESENCIAL', 'REMOTA') NULL,
    `ResultadoFDCON` VARCHAR(191) NULL,
    `Revisar` BOOLEAN NOT NULL,
    `Conciliar` BOOLEAN NOT NULL,
    `Incidencias` VARCHAR(191) NOT NULL,
    `Activo` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `Contrato_ClaveOperacion_key`(`ClaveOperacion`),
    UNIQUE INDEX `Contrato_CCC_key`(`CCC`),
    UNIQUE INDEX `Contrato_CodigoSolicitud_key`(`CodigoSolicitud`),
    UNIQUE INDEX `Contrato_CodigoPoliza_key`(`CodigoPoliza`),
    PRIMARY KEY (`ContratoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialContrato` (
    `ContratoHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `ContratoId` INTEGER NULL,
    `Estado` ENUM('PENDIENTE', 'PENDIENTE_INCIDENCIA', 'SIN_CONCILIAR', 'TRAMITADA', 'ANULADA', 'DESECHADO') NULL DEFAULT 'PENDIENTE',
    `Operacion` ENUM('INSERTADO', 'ACTUALIZADO', 'DESECHADO', 'ELIMINADO') NULL,
    `FechaOperacion` DATETIME(3) NULL,
    `TipoOperacion` VARCHAR(191) NULL DEFAULT 'ALTA',
    `FechaEfecto` DATETIME(3) NULL,
    `AnuladoSEfecto` BOOLEAN NULL DEFAULT false,
    `Suplemento` BOOLEAN NULL DEFAULT false,
    `DNIAsegurado` VARCHAR(191) NULL,
    `NombreAsegurado` VARCHAR(191) NULL,
    `FechaNacimientoAsegurado` DATETIME(3) NULL,
    `CSRespAfirmativas` BOOLEAN NULL,
    `ProfesionAsegurado` VARCHAR(191) NULL,
    `DeporteAsegurado` VARCHAR(191) NULL,
    `DNITomador` VARCHAR(191) NULL,
    `FechaValidezDNITomador` DATETIME(3) NULL,
    `NombreTomador` VARCHAR(191) NULL,
    `Operador` ENUM('ONE', 'HAM', 'TLPUCV', 'TLPPLV') NULL,
    `IndicadorFDPRECON` BOOLEAN NULL,
    `TipoEnvioPRECON` ENUM('PRESENCIAL', 'REMOTA') NULL,
    `ResultadoFDPRECON` VARCHAR(191) NULL,
    `IndicadorFDCON` BOOLEAN NULL,
    `TipoEnvioCON` ENUM('PRESENCIAL', 'REMOTA') NULL,
    `ResultadoFDCON` VARCHAR(191) NULL,
    `Revisar` BOOLEAN NULL DEFAULT true,
    `Conciliar` BOOLEAN NULL DEFAULT true,
    `Incidencias` VARCHAR(191) NULL,
    `Activo` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`ContratoHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tableta` (
    `TabletaId` INTEGER NOT NULL AUTO_INCREMENT,
    `Compannia` VARCHAR(191) NULL,
    `TipoProducto` VARCHAR(191) NOT NULL,
    `TipoSubProducto` VARCHAR(191) NOT NULL,
    `NombreComercialProducto` VARCHAR(191) NOT NULL,
    `CodigoProducto` VARCHAR(191) NOT NULL,
    `CodigoModalidad` VARCHAR(191) NOT NULL,
    `CodigoPoliza` VARCHAR(191) NOT NULL,
    `CodigoSolicitud` VARCHAR(191) NOT NULL,
    `FechaGrabacion` DATETIME(3) NOT NULL,
    `DNIAsegurado` VARCHAR(191) NOT NULL,
    `NombreAsegurado` VARCHAR(191) NOT NULL,
    `NumIdentificacionTo` VARCHAR(191) NOT NULL,
    `NombreTo` VARCHAR(191) NOT NULL,
    `CodigoMediador` VARCHAR(191) NOT NULL,
    `NombreMediador` VARCHAR(191) NOT NULL,
    `CodigoSubmediador` VARCHAR(191) NOT NULL,
    `NombreSubMediador` VARCHAR(191) NOT NULL,
    `CCC` VARCHAR(191) NOT NULL,
    `FechaOperacion` DATETIME(3) NOT NULL,
    `FechaActualizacion` DATETIME(3) NOT NULL,
    `DescOperacion` VARCHAR(191) NOT NULL,
    `TipoRegistro` VARCHAR(191) NOT NULL,
    `CodigoInternoFormulario` VARCHAR(191) NOT NULL,
    `DescFormulario` VARCHAR(191) NOT NULL,
    `TipoFirma` ENUM('MANUAL', 'DIGITAL') NOT NULL,
    `FechaFirma` DATETIME(3) NOT NULL,
    `SituacionFirma` VARCHAR(191) NOT NULL,
    `CanalMediador` VARCHAR(191) NOT NULL,
    `CanalRecepcionFirma` VARCHAR(191) NOT NULL,
    `CodigoCentro` VARCHAR(191) NOT NULL,
    `NumActualizaciones` INTEGER NOT NULL,
    `Usuario` VARCHAR(191) NOT NULL,
    `Conciliar` BOOLEAN NOT NULL,
    `FormularioPrincipal` BOOLEAN NOT NULL,
    `Observaciones` VARCHAR(191) NOT NULL,
    `FechaGeneracion` DATETIME(3) NOT NULL,
    `FechaCarga` DATETIME(3) NOT NULL,
    `Activo` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`TabletaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FirmaDigital` (
    `FirmaDigitalId` INTEGER NOT NULL AUTO_INCREMENT,
    `AnnoMes` VARCHAR(191) NOT NULL,
    `NumPoliza` VARCHAR(191) NOT NULL,
    `CodigoPolizaTc` VARCHAR(191) NOT NULL,
    `EstadoPoliza` VARCHAR(191) NOT NULL,
    `TIPO_ENVIO` ENUM('PRESENCIAL', 'REMOTA') NOT NULL,
    `Estado` VARCHAR(191) NOT NULL,
    `Resultado` VARCHAR(191) NOT NULL,
    `FechaInicio` DATETIME(3) NOT NULL,
    `FechaCierre` DATETIME(3) NOT NULL,
    `Mediador` VARCHAR(191) NOT NULL,
    `DNIAsegurado` VARCHAR(191) NOT NULL,
    `NombreAsegurado` VARCHAR(191) NOT NULL,
    `MovilAsegurado` INTEGER NOT NULL,
    `DNITomador` VARCHAR(191) NOT NULL,
    `NombreTomador` VARCHAR(191) NOT NULL,
    `MovilTomador` INTEGER NOT NULL,
    `Activo` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`FirmaDigitalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentoContrato` (
    `DocumentoId` INTEGER NOT NULL AUTO_INCREMENT,
    `ContratoId` INTEGER NOT NULL,
    `DocId` INTEGER NOT NULL,
    `UsuarioId` INTEGER NOT NULL,
    `EstadoDoc` VARCHAR(191) NOT NULL,
    `NumeReclamaciones` INTEGER NOT NULL DEFAULT 0,
    `FechaReclamacion` DATETIME(3) NULL,
    `FechaConciliacion` DATETIME(3) NULL,
    `historialContratoContratoId` INTEGER NULL,

    PRIMARY KEY (`DocumentoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IncidenciaDocumento` (
    `IncidenciaDocId` INTEGER NOT NULL AUTO_INCREMENT,
    `DocumentoId` INTEGER NOT NULL,
    `IncidenciaId` INTEGER NOT NULL,
    `ContratoId` INTEGER NOT NULL,
    `UsuarioId` INTEGER NOT NULL,
    `FechaIncidencia` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Resuelta` BOOLEAN NULL DEFAULT false,
    `NumReclamaciones` INTEGER NULL DEFAULT 0,
    `FechaUltimaModif` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `historialContratoContratoId` INTEGER NULL,

    PRIMARY KEY (`IncidenciaDocId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reclamaciones` (
    `ReclamacionId` INTEGER NOT NULL AUTO_INCREMENT,
    `ContratoId` INTEGER NOT NULL,
    `UsuarioId` INTEGER NOT NULL,
    `Descricion` VARCHAR(191) NOT NULL,
    `FechaReclamacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `historialContratoContratoId` INTEGER NULL,

    PRIMARY KEY (`ReclamacionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleObservacion` (
    `ObservacionId` INTEGER NOT NULL AUTO_INCREMENT,
    `UsuarioId` INTEGER NOT NULL,
    `IncidenciaId` INTEGER NOT NULL,
    `ContratoId` INTEGER NOT NULL,
    `Contenido` VARCHAR(191) NOT NULL,
    `FechaObs` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `historialContratoContratoId` INTEGER NULL,

    PRIMARY KEY (`ObservacionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Precios` (
    `PrecioId` INTEGER NOT NULL,
    `CompaniaId` INTEGER NOT NULL,
    `Desde` INTEGER NOT NULL,
    `Hasta` INTEGER NOT NULL,
    `PrecioActuacion` DOUBLE NOT NULL,
    `PrecioFijo` DOUBLE NOT NULL,
    `FechaUltimaModif` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`PrecioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_RolId_fkey` FOREIGN KEY (`RolId`) REFERENCES `Rol`(`RolId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaestroIncidencias` ADD CONSTRAINT `MaestroIncidencias_DocAsociadoId_fkey` FOREIGN KEY (`DocAsociadoId`) REFERENCES `MaestroDocumentos`(`DocumentoId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocIncidencia` ADD CONSTRAINT `DocIncidencia_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `MaestroDocumentos`(`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocIncidencia` ADD CONSTRAINT `DocIncidencia_IncidenciaId_fkey` FOREIGN KEY (`IncidenciaId`) REFERENCES `MaestroIncidencias`(`IncidenciaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_CompId_fkey` FOREIGN KEY (`CompId`) REFERENCES `Compania`(`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RamoTipoOperacion` ADD CONSTRAINT `RamoTipoOperacion_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `Producto`(`ProductoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RamoTipoOperacion` ADD CONSTRAINT `RamoTipoOperacion_PlantillaIncidencia_fkey` FOREIGN KEY (`PlantillaIncidencia`) REFERENCES `RepositorioPlantillas`(`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RamoTipoOperacion` ADD CONSTRAINT `RamoTipoOperacion_PlantillaConciliacion_fkey` FOREIGN KEY (`PlantillaConciliacion`) REFERENCES `RepositorioPlantillas`(`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoDocumento` ADD CONSTRAINT `ProductoDocumento_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `RamoTipoOperacion`(`RamoTipoOpId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoDocumento` ADD CONSTRAINT `ProductoDocumento_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `MaestroDocumentos`(`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoDocumento` ADD CONSTRAINT `ProductoDocumento_AnexoIncidencias_fkey` FOREIGN KEY (`AnexoIncidencias`) REFERENCES `RepositorioPlantillas`(`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoDocumento` ADD CONSTRAINT `ProductoDocumento_AnexoConciliacion_fkey` FOREIGN KEY (`AnexoConciliacion`) REFERENCES `RepositorioPlantillas`(`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoDocumento` ADD CONSTRAINT `ProductoDocumento_Caratula_fkey` FOREIGN KEY (`Caratula`) REFERENCES `RepositorioPlantillas`(`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_CompaniaId_fkey` FOREIGN KEY (`CompaniaId`) REFERENCES `Compania`(`CompaniaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `Producto`(`ProductoId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_MediadorId_fkey` FOREIGN KEY (`MediadorId`) REFERENCES `Mediador`(`MediadorId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialContrato` ADD CONSTRAINT `HistorialContrato_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato`(`ContratoId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoContrato` ADD CONSTRAINT `DocumentoContrato_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato`(`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoContrato` ADD CONSTRAINT `DocumentoContrato_DocId_fkey` FOREIGN KEY (`DocId`) REFERENCES `MaestroDocumentos`(`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoContrato` ADD CONSTRAINT `DocumentoContrato_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaDocumento` ADD CONSTRAINT `IncidenciaDocumento_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `DocumentoContrato`(`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaDocumento` ADD CONSTRAINT `IncidenciaDocumento_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaDocumento` ADD CONSTRAINT `IncidenciaDocumento_IncidenciaId_fkey` FOREIGN KEY (`IncidenciaId`) REFERENCES `MaestroIncidencias`(`IncidenciaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaDocumento` ADD CONSTRAINT `IncidenciaDocumento_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato`(`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reclamaciones` ADD CONSTRAINT `Reclamaciones_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato`(`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reclamaciones` ADD CONSTRAINT `Reclamaciones_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleObservacion` ADD CONSTRAINT `DetalleObservacion_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleObservacion` ADD CONSTRAINT `DetalleObservacion_IncidenciaId_fkey` FOREIGN KEY (`IncidenciaId`) REFERENCES `IncidenciaDocumento`(`IncidenciaDocId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleObservacion` ADD CONSTRAINT `DetalleObservacion_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato`(`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Precios` ADD CONSTRAINT `Precios_CompaniaId_fkey` FOREIGN KEY (`CompaniaId`) REFERENCES `Compania`(`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE;
