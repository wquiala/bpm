-- MySQL dump 10.13  Distrib 9.0.1, for macos14 (x86_64)
--
-- Host: localhost    Database: bpm-prod
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('98df2c03-d0a4-48d9-aee6-6722a0c9d3d1','30df0b662ce2a55daee4576b222789848073bd7d99437beba9a5aa15c41e2a69','2024-10-01 13:54:53.725','20241001135452_init',NULL,NULL,'2024-10-01 13:54:52.586',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Anuladas`
--

DROP TABLE IF EXISTS `Anuladas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Anuladas` (
  `anuladasId` int NOT NULL AUTO_INCREMENT,
  `compannia` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `claveOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fechaEmisionAnulacion` datetime(3) DEFAULT NULL,
  `fechaEfectoAnulacion` datetime(3) DEFAULT NULL,
  `motivoAnulacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`anuladasId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Anuladas`
--

LOCK TABLES `Anuladas` WRITE;
/*!40000 ALTER TABLE `Anuladas` DISABLE KEYS */;
/*!40000 ALTER TABLE `Anuladas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CajaLote`
--

DROP TABLE IF EXISTS `CajaLote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CajaLote` (
  `CajaLoteId` int NOT NULL AUTO_INCREMENT,
  `ContratoId` int DEFAULT NULL,
  `Caja` int NOT NULL,
  `Lote` int NOT NULL,
  `Nota` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `DocumentoId` int DEFAULT NULL,
  `fechaCreacion` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`CajaLoteId`),
  KEY `CajaLote_DocumentoId_fkey` (`DocumentoId`),
  KEY `CajaLote_ContratoId_fkey` (`ContratoId`),
  CONSTRAINT `CajaLote_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato` (`ContratoId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `CajaLote_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `DocumentoContrato` (`DocumentoId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CajaLote`
--

LOCK TABLES `CajaLote` WRITE;
/*!40000 ALTER TABLE `CajaLote` DISABLE KEYS */;
/*!40000 ALTER TABLE `CajaLote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Compania`
--

DROP TABLE IF EXISTS `Compania`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Compania` (
  `CompaniaId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Codigo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Telefono` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CorreoComp` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ReclamarComp` tinyint(1) DEFAULT '0',
  `CorreoSoporte` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ReclamarSoporte` tinyint(1) DEFAULT '0',
  `ColorBase` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `Activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`CompaniaId`),
  UNIQUE KEY `Compania_Codigo_key` (`Codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Compania`
--

LOCK TABLES `Compania` WRITE;
/*!40000 ALTER TABLE `Compania` DISABLE KEYS */;
INSERT INTO `Compania` VALUES (1,'SLS','C174','Santalucía Seguros','','lmunozbe@santaluciasc.es',1,'contratacionriesgoindividual@santaluciasc.es',1,'','2024-05-08 18:41:21.000',NULL,'2024-05-08 18:41:21.000',1),(2,'SLP','G0241','Santalucía Pensiones','','lmunozbe@santaluciasc.es',1,'contratacionriesgoindividual@santaluciasc.es',1,'','2024-05-08 18:41:21.000',NULL,'2024-05-08 18:41:21.000',1),(3,'UNI','C637','Unicorp Vida','','lmunozbe@santaluciasc.es',1,'contratacion@unicorpvida.com',1,'','2024-05-08 18:41:21.000',NULL,'2024-05-08 18:41:21.000',1),(4,'PLV','C693','Pelayo Vida','','lmunozbe@santaluciasc.es',1,'contratacion@unicorpvida.com',1,'','2024-05-08 18:41:21.000',NULL,'2024-05-08 18:41:21.000',1);
/*!40000 ALTER TABLE `Compania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comunicacion`
--

DROP TABLE IF EXISTS `Comunicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comunicacion` (
  `comunicationId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `contractoId` int NOT NULL,
  `tipoComunicacion` enum('DOCUMENTOS_PENDIENTES','INCIDENCIAS','DOCUMENTOS_PENDIENTES_INCIDENCIAS') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailDestinatario` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`comunicationId`),
  KEY `Comunicacion_userId_fkey` (`userId`),
  KEY `Comunicacion_contractoId_fkey` (`contractoId`),
  CONSTRAINT `Comunicacion_contractoId_fkey` FOREIGN KEY (`contractoId`) REFERENCES `Contrato` (`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Comunicacion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comunicacion`
--

LOCK TABLES `Comunicacion` WRITE;
/*!40000 ALTER TABLE `Comunicacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comunicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contrato`
--

DROP TABLE IF EXISTS `Contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contrato` (
  `ContratoId` int NOT NULL AUTO_INCREMENT,
  `EstadoContrato` enum('PENDIENTE','PENDIENTE_INCIDENCIA','SIN_CONCILIAR','TRAMITADA','ANULADA','DESECHADO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDIENTE',
  `ClaveOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CompaniaId` int NOT NULL,
  `ProductoId` int NOT NULL,
  `MediadorId` int NOT NULL,
  `FechaOperacion` datetime(3) DEFAULT NULL,
  `TipoOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ALTA',
  `CCC` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `CodigoSolicitud` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `CodigoPoliza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `FechaEfecto` datetime(3) DEFAULT NULL,
  `AnuladoSEfecto` tinyint(1) DEFAULT '0',
  `Suplemento` tinyint(1) NOT NULL DEFAULT '0',
  `DNIAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `NombreAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `FechaNacimientoAsegurado` datetime(3) DEFAULT NULL,
  `CSRespAfirmativas` tinyint(1) NOT NULL DEFAULT '0',
  `ProfesionAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `DeporteAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `DNITomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `FechaValidezDNITomador` datetime(3) DEFAULT NULL,
  `NombreTomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `Operador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `IndicadorFDPRECON` tinyint(1) DEFAULT '0',
  `TipoEnvioPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `ResultadoFDPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `IndicadorFDCON` tinyint(1) DEFAULT NULL,
  `TipoEnvioCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `ResultadoFDCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `FechaGrabacion` datetime(3) DEFAULT NULL,
  `NumeroReclamaciones` int NOT NULL DEFAULT '0',
  `FechaProximaReclamacion` datetime(3) DEFAULT NULL,
  `FechaReclamacion` datetime(3) DEFAULT NULL,
  `Revisar` tinyint(1) NOT NULL DEFAULT '1',
  `Conciliar` tinyint(1) NOT NULL DEFAULT '1',
  `errores` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `TipoConciliacionId` int DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `NotaInterna` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `UsuarioId` int DEFAULT NULL,
  PRIMARY KEY (`ContratoId`),
  UNIQUE KEY `Contrato_ClaveOperacion_key` (`ClaveOperacion`),
  KEY `Contrato_CompaniaId_fkey` (`CompaniaId`),
  KEY `Contrato_ProductoId_fkey` (`ProductoId`),
  KEY `Contrato_MediadorId_fkey` (`MediadorId`),
  KEY `Contrato_TipoConciliacionId_fkey` (`TipoConciliacionId`),
  KEY `Contrato_UsuarioId_fkey` (`UsuarioId`),
  CONSTRAINT `Contrato_CompaniaId_fkey` FOREIGN KEY (`CompaniaId`) REFERENCES `Compania` (`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Contrato_MediadorId_fkey` FOREIGN KEY (`MediadorId`) REFERENCES `Mediador` (`MediadorId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Contrato_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `Producto` (`ProductoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Contrato_TipoConciliacionId_fkey` FOREIGN KEY (`TipoConciliacionId`) REFERENCES `TipoConciliacion` (`tipoConciliacionId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Contrato_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contrato`
--

LOCK TABLES `Contrato` WRITE;
/*!40000 ALTER TABLE `Contrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `Contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DetalleObservacion`
--

DROP TABLE IF EXISTS `DetalleObservacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleObservacion` (
  `ObservacionId` int NOT NULL AUTO_INCREMENT,
  `UsuarioId` int NOT NULL,
  `IncidenciaId` int DEFAULT NULL,
  `ContratoId` int NOT NULL,
  `Contenido` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaObs` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`ObservacionId`),
  KEY `DetalleObservacion_UsuarioId_fkey` (`UsuarioId`),
  KEY `DetalleObservacion_IncidenciaId_fkey` (`IncidenciaId`),
  KEY `DetalleObservacion_ContratoId_fkey` (`ContratoId`),
  CONSTRAINT `DetalleObservacion_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato` (`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DetalleObservacion_IncidenciaId_fkey` FOREIGN KEY (`IncidenciaId`) REFERENCES `IncidenciaDocumento` (`IncidenciaDocId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `DetalleObservacion_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DetalleObservacion`
--

LOCK TABLES `DetalleObservacion` WRITE;
/*!40000 ALTER TABLE `DetalleObservacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `DetalleObservacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocumentoContrato`
--

DROP TABLE IF EXISTS `DocumentoContrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocumentoContrato` (
  `DocumentoId` int NOT NULL AUTO_INCREMENT,
  `ContratoId` int NOT NULL,
  `DocId` int NOT NULL,
  `ProdctoDoc` int NOT NULL,
  `UsuarioId` int NOT NULL,
  `EstadoDoc` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `NumeReclamaciones` int NOT NULL DEFAULT '0',
  `FechaReclamacion` datetime(3) DEFAULT NULL,
  `FechaConciliacion` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`DocumentoId`),
  KEY `DocumentoContrato_ProdctoDoc_fkey` (`ProdctoDoc`),
  KEY `DocumentoContrato_ContratoId_fkey` (`ContratoId`),
  KEY `DocumentoContrato_DocId_fkey` (`DocId`),
  KEY `DocumentoContrato_UsuarioId_fkey` (`UsuarioId`),
  CONSTRAINT `DocumentoContrato_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato` (`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DocumentoContrato_DocId_fkey` FOREIGN KEY (`DocId`) REFERENCES `MaestroDocumentos` (`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DocumentoContrato_ProdctoDoc_fkey` FOREIGN KEY (`ProdctoDoc`) REFERENCES `ProductoDocumento` (`ProductoDocId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DocumentoContrato_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentoContrato`
--

LOCK TABLES `DocumentoContrato` WRITE;
/*!40000 ALTER TABLE `DocumentoContrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentoContrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocumentoContratoHistory`
--

DROP TABLE IF EXISTS `DocumentoContratoHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocumentoContratoHistory` (
  `DocumentoContratoHistoryId` int NOT NULL AUTO_INCREMENT,
  `DocumentoId` int NOT NULL,
  `DocId` int NOT NULL,
  `ProdctoDoc` int NOT NULL,
  `UsuarioId` int NOT NULL,
  `EstadoDoc` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `NumeReclamaciones` int NOT NULL DEFAULT '0',
  `FechaReclamacion` datetime(3) DEFAULT NULL,
  `FechaConciliacion` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`DocumentoContratoHistoryId`),
  KEY `DocumentoContratoHistory_DocumentoId_fkey` (`DocumentoId`),
  CONSTRAINT `DocumentoContratoHistory_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `DocumentoContrato` (`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentoContratoHistory`
--

LOCK TABLES `DocumentoContratoHistory` WRITE;
/*!40000 ALTER TABLE `DocumentoContratoHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentoContratoHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FamiliaDocumento`
--

DROP TABLE IF EXISTS `FamiliaDocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FamiliaDocumento` (
  `FamiliaId` int NOT NULL AUTO_INCREMENT,
  `Codigo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`FamiliaId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FamiliaDocumento`
--

LOCK TABLES `FamiliaDocumento` WRITE;
/*!40000 ALTER TABLE `FamiliaDocumento` DISABLE KEYS */;
INSERT INTO `FamiliaDocumento` VALUES (1,'ANE','Anexo Condiciones particulares',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(2,'BOL','Boletín de adhesión / Certificado de pertenencia',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(3,'CON','Formulario de conocimiento del cliente',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(4,'CP','Condiciones particulares o solicitudes',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(5,'CS','Cuestionario de salud',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(6,'DAT','Documento de datos fundamentales para el cliente. ',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(7,'DFP','Documento de datos fundamentales para el participe',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(8,'DNI','Documento acreditativo de identidad del cliente (NIF/NIE)',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(9,'IDO','Test de adecuación e idoneidad.',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(10,'SEPA','Documento Domiciliación SEPA',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455'),(11,'SUP','Suplementos, anulaciones, rescates y otros',1,'2024-10-01 14:11:18.455','2024-10-01 14:11:18.455');
/*!40000 ALTER TABLE `FamiliaDocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FirmaDigital`
--

DROP TABLE IF EXISTS `FirmaDigital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FirmaDigital` (
  `FirmaDigitalId` int NOT NULL AUTO_INCREMENT,
  `AnnoMes` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NumPoliza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoPolizaTc` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EstadoPoliza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TIPO_ENVIO` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Estado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Resultado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaInicio` datetime(3) DEFAULT NULL,
  `FechaCierre` datetime(3) DEFAULT NULL,
  `Mediador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DNIAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MovilAsegurado` int DEFAULT NULL,
  `DNITomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreTomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MovilTomador` int DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Actualizado` tinyint(1) NOT NULL DEFAULT '0',
  `errores` json DEFAULT NULL,
  PRIMARY KEY (`FirmaDigitalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FirmaDigital`
--

LOCK TABLES `FirmaDigital` WRITE;
/*!40000 ALTER TABLE `FirmaDigital` DISABLE KEYS */;
/*!40000 ALTER TABLE `FirmaDigital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HistorialContrato`
--

DROP TABLE IF EXISTS `HistorialContrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HistorialContrato` (
  `ContratoHistoryId` int NOT NULL AUTO_INCREMENT,
  `ContratoId` int DEFAULT NULL,
  `ClaveOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `CCC` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `CodigoSolicitud` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `CodigoPoliza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `CompaniaId` int DEFAULT NULL,
  `ProductoId` int DEFAULT NULL,
  `MediadorId` int DEFAULT NULL,
  `EstadoContrato` enum('PENDIENTE','PENDIENTE_INCIDENCIA','SIN_CONCILIAR','TRAMITADA','ANULADA','DESECHADO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Operacion` enum('INSERTADO','ACTUALIZADO','DESECHADO','ELIMINADO','ANULADO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaOperacion` datetime(3) DEFAULT NULL,
  `FechaEfecto` datetime(3) DEFAULT NULL,
  `AnuladoSEfecto` tinyint(1) DEFAULT '0',
  `Suplemento` tinyint(1) DEFAULT '0',
  `DNIAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NumeroReclamaciones` int NOT NULL DEFAULT '0',
  `FechaProximaReclamacion` datetime(3) DEFAULT NULL,
  `FechaReclamacion` datetime(3) DEFAULT NULL,
  `NombreAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaNacimientoAsegurado` datetime(3) DEFAULT NULL,
  `CSRespAfirmativas` tinyint(1) DEFAULT NULL,
  `ProfesionAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DeporteAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DNITomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaValidezDNITomador` datetime(3) DEFAULT NULL,
  `NombreTomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Operador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IndicadorFDPRECON` tinyint(1) DEFAULT NULL,
  `TipoEnvioPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IndicadorFDCON` tinyint(1) DEFAULT NULL,
  `TipoEnvioCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Revisar` tinyint(1) DEFAULT '1',
  `Conciliar` tinyint(1) DEFAULT '1',
  `errores` json DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `FechaGrabacion` datetime(3) DEFAULT NULL,
  `NotaInterna` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ContratoHistoryId`),
  KEY `HistorialContrato_ContratoId_fkey` (`ContratoId`),
  CONSTRAINT `HistorialContrato_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato` (`ContratoId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HistorialContrato`
--

LOCK TABLES `HistorialContrato` WRITE;
/*!40000 ALTER TABLE `HistorialContrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `HistorialContrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IncidenciaDocumento`
--

DROP TABLE IF EXISTS `IncidenciaDocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IncidenciaDocumento` (
  `IncidenciaDocId` int NOT NULL AUTO_INCREMENT,
  `DocumentoContratoId` int NOT NULL,
  `TipoIncidenciaDocumentoId` int NOT NULL,
  `Nota` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Reclamada` datetime(3) DEFAULT NULL,
  `Revisada` tinyint(1) NOT NULL DEFAULT '0',
  `Enviar` tinyint(1) NOT NULL DEFAULT '0',
  `Incidencia` int DEFAULT NULL,
  `UsuarioId` int NOT NULL,
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `Resuelta` tinyint(1) DEFAULT '0',
  `NumReclamaciones` int NOT NULL DEFAULT '0',
  `FechaUltimaReclamacion` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`IncidenciaDocId`),
  KEY `IncidenciaDocumento_TipoIncidenciaDocumentoId_fkey` (`TipoIncidenciaDocumentoId`),
  KEY `IncidenciaDocumento_DocumentoContratoId_fkey` (`DocumentoContratoId`),
  KEY `IncidenciaDocumento_UsuarioId_fkey` (`UsuarioId`),
  CONSTRAINT `IncidenciaDocumento_DocumentoContratoId_fkey` FOREIGN KEY (`DocumentoContratoId`) REFERENCES `DocumentoContrato` (`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `IncidenciaDocumento_TipoIncidenciaDocumentoId_fkey` FOREIGN KEY (`TipoIncidenciaDocumentoId`) REFERENCES `TipoDocumentoIncidencia` (`TipoDocumentoIncidenciaId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `IncidenciaDocumento_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IncidenciaDocumento`
--

LOCK TABLES `IncidenciaDocumento` WRITE;
/*!40000 ALTER TABLE `IncidenciaDocumento` DISABLE KEYS */;
/*!40000 ALTER TABLE `IncidenciaDocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IncidenciaDocumentoHistory`
--

DROP TABLE IF EXISTS `IncidenciaDocumentoHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IncidenciaDocumentoHistory` (
  `IncidenciaDocHistoryID` int NOT NULL AUTO_INCREMENT,
  `IncidenciaDocId` int NOT NULL,
  `Nota` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Reclamada` datetime(3) DEFAULT NULL,
  `Revisada` tinyint(1) NOT NULL DEFAULT '0',
  `Enviar` tinyint(1) NOT NULL DEFAULT '0',
  `Incidencia` int DEFAULT NULL,
  `UsuarioId` int NOT NULL,
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `Resuelta` tinyint(1) DEFAULT '0',
  `NumReclamaciones` int NOT NULL DEFAULT '0',
  `FechaUltimaReclamacion` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`IncidenciaDocHistoryID`),
  KEY `IncidenciaDocumentoHistory_IncidenciaDocId_fkey` (`IncidenciaDocId`),
  CONSTRAINT `IncidenciaDocumentoHistory_IncidenciaDocId_fkey` FOREIGN KEY (`IncidenciaDocId`) REFERENCES `IncidenciaDocumento` (`IncidenciaDocId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IncidenciaDocumentoHistory`
--

LOCK TABLES `IncidenciaDocumentoHistory` WRITE;
/*!40000 ALTER TABLE `IncidenciaDocumentoHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `IncidenciaDocumentoHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Incompletas`
--

DROP TABLE IF EXISTS `Incompletas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Incompletas` (
  `incompletaId` int NOT NULL AUTO_INCREMENT,
  `Compania` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Producto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CCC` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoSolicitud` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoPoliza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaEfecto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AnuladoSEfecto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Suplemento` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DNIAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaNacimientoAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CSRespAfirmativas` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProfesionAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DeporteAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DNITomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaValidezDNITomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreTomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mediador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Operador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IndicadorFDPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoEnvioPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IndicadorFDCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoEnvioCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Revisar` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Conciliar` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `errores` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Insertada` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`incompletaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Incompletas`
--

LOCK TABLES `Incompletas` WRITE;
/*!40000 ALTER TABLE `Incompletas` DISABLE KEYS */;
/*!40000 ALTER TABLE `Incompletas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LogAccion`
--

DROP TABLE IF EXISTS `LogAccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LogAccion` (
  `LogId` int NOT NULL AUTO_INCREMENT,
  `UsuarioId` int NOT NULL,
  `Accion` enum('CARGA','RELOAD','UPDATE_CARGA','INCIDENCIA','RECLAMACION','CONCILIACION','ANULACION') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`LogId`),
  KEY `LogAccion_UsuarioId_fkey` (`UsuarioId`),
  CONSTRAINT `LogAccion_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LogAccion`
--

LOCK TABLES `LogAccion` WRITE;
/*!40000 ALTER TABLE `LogAccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `LogAccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LogCarga`
--

DROP TABLE IF EXISTS `LogCarga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LogCarga` (
  `LogCargaId` int NOT NULL AUTO_INCREMENT,
  `LogId` int NOT NULL,
  `Tipo` enum('POLIZA','TABLETA','DIGITAL','ANULADA') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `TotalRegistros` int NOT NULL DEFAULT '0',
  `Insertados` int NOT NULL DEFAULT '0',
  `revisarCont` int NOT NULL DEFAULT '0',
  `Actualizados` int NOT NULL DEFAULT '0',
  `Desechados` int NOT NULL DEFAULT '0',
  `ConError` int NOT NULL DEFAULT '0',
  `Details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`LogCargaId`),
  KEY `LogCarga_LogId_fkey` (`LogId`),
  CONSTRAINT `LogCarga_LogId_fkey` FOREIGN KEY (`LogId`) REFERENCES `LogAccion` (`LogId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LogCarga`
--

LOCK TABLES `LogCarga` WRITE;
/*!40000 ALTER TABLE `LogCarga` DISABLE KEYS */;
/*!40000 ALTER TABLE `LogCarga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaestroDocumentos`
--

DROP TABLE IF EXISTS `MaestroDocumentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaestroDocumentos` (
  `DocumentoId` int NOT NULL,
  `FamiliaId` int NOT NULL,
  `Codigo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Suplemento` tinyint(1) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`DocumentoId`),
  KEY `MaestroDocumentos_FamiliaId_fkey` (`FamiliaId`),
  CONSTRAINT `MaestroDocumentos_FamiliaId_fkey` FOREIGN KEY (`FamiliaId`) REFERENCES `FamiliaDocumento` (`FamiliaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaestroDocumentos`
--

LOCK TABLES `MaestroDocumentos` WRITE;
/*!40000 ALTER TABLE `MaestroDocumentos` DISABLE KEYS */;
INSERT INTO `MaestroDocumentos` VALUES (1,1,'ANE1','Anexo Condiciones particulares','Anexo Condiciones particulares (Estructurado)',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(2,2,'BOL','Boletín de adhesión / Certificado de pertenencia','Boletín de adhesión / Certificado de pertenencia',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(3,3,'CON','Formulario de conocimiento del cliente','Formulario de conocimiento del cliente',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(4,4,'CP','Condiciones particulares o Solicitud de seguro','Condiciones particulares o Solicitud de seguro',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(5,5,'CS1','Cuestionario de Salud','Cuestionario de Salud Riesgo WS',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(6,6,'DAT','Documento de datos fundamentales para el cliente. ','Documento de datos fundamentales para el cliente. ',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(7,7,'DFP','Documento de datos fundamentales para el participe','Documento de datos fundamentales para el participe',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(8,8,'DNI','Documento acreditativo de identidad del cliente (DNI/NIE)','Documento acreditativo de identidad del cliente (DNI/NIE)',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(9,9,'IDO','Test de adecuación e idoneidad.','Test de adecuación e idoneidad.',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(10,10,'SEPA','Documento Domiciliación SEPA','Documento Domiciliación SEPA',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(11,11,'SUP','Suplementos, anulaciones, rescates y otros','Suplementos, anulaciones, rescates y otros',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(12,5,'CS2','Cuestionario de Salud','Cuestionario de Salud Invalidez, Accidentes, AQ02',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(13,5,'CS3','Cuestionario de Salud','Cuestionario de Salud Ahorro',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(14,5,'CS4','Cuestionario de Salud','Cuestionario de Salud Riesgo batch',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1),(15,1,'ANE2','Anexo Cestas de Inversión','Anexo Cestas de Inversión',0,'2024-10-01 14:13:12.291',NULL,'2024-10-01 14:13:12.291',1);
/*!40000 ALTER TABLE `MaestroDocumentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaestroIncidencias`
--

DROP TABLE IF EXISTS `MaestroIncidencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaestroIncidencias` (
  `IncidenciaId` int NOT NULL,
  `DocAsociadoId` int DEFAULT NULL,
  `Codigo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Activo` tinyint(1) NOT NULL,
  `maestroDocumentosDocumentoId` int DEFAULT NULL,
  PRIMARY KEY (`IncidenciaId`),
  KEY `MaestroIncidencias_DocAsociadoId_fkey` (`DocAsociadoId`),
  CONSTRAINT `MaestroIncidencias_DocAsociadoId_fkey` FOREIGN KEY (`DocAsociadoId`) REFERENCES `FamiliaDocumento` (`FamiliaId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaestroIncidencias`
--

LOCK TABLES `MaestroIncidencias` WRITE;
/*!40000 ALTER TABLE `MaestroIncidencias` DISABLE KEYS */;
INSERT INTO `MaestroIncidencias` VALUES (1,1,'1','El Anexo a Condiciones particulares no esta firmado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(2,1,'2','El Anexo a las Cestas de Inversión no está firmado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(3,2,'3','El Boletín de adhesion al plan de pensiones no está firmado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(4,2,'4','La pregunta de actividad profesional no está respondida en el Boletín de adhesión. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(5,2,'5','La pregunta de obligaciones fiscales en el extrajero no está respondida en el boletín de adhesion. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(6,3,'6','El Formulario de conocimiento del cliente está incompleto. Faltan apartados por cumplimentar.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(7,3,'7','El Formulario de conocimiento del cliente no está firmado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(8,3,'8','El Formulario de conocimiento del cliente recibido es de persona física y se requiere el formulario de persona jurídica, al ser el tomador una empresa.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(9,4,'9','Las Condiciones particulares (o Solicitud de seguro) no están firmadas por el tomador','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(10,4,'10','Las Condiciones particulares (o Solicitud de seguro) no están firmadas por el asegurado','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(11,5,'11','El Cuestionario de salud no esta firmado por el asegurado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(12,5,'12','El Cuestionario de salud contiene enmiendas o tachaduras cuya corrección no está firmada por el asegurado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(13,5,'13','El Cuestionario de salud tiene preguntas sin responder. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(14,5,'14','El Cuestionario de salud no indica la profesión del asegurado. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(15,5,'15','El Cuestionario de salud no tiene informado el peso y/o la talla.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(16,5,'16','El Cuestionario de salud tiene respuestas afirmativas y no se ha ampliado la información.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(17,5,'17','El Cuestionario de salud físico recibido contiene discrepancias con respecto a los datos tecleados en el cuestionario telemático de Neos. El cliente responde afirmativamente a una de las preguntas y por tanto debéis enviar una solicitud de anulación de la operación firmada por el cliente (Unicorp Vida devolverá al cliente todo lo que haya pagado). Esta gestión es urgente para evitar problemas en caso de siniestro y en auditorías. Debe enviarse a atencioncliente@unicorpvida.com.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(18,5,'18','El Cuestionario de salud físico recibido contiene discrepancias con respecto a los datos tecleados en el cuestionario telemático de Neos. El cliente declara que es JUBILADO/PREJUBILADO y por tanto debéis enviar una solicitud de anulación de la operación firmada por el cliente (Unicorp Vida devolverá al cliente todo lo que haya pagado) SALVO que sea EXCLUSIVAMENTE POR EDAD, en cuyo lo que deberéis responder a este e-mail aclarando este punto. Esta gestión es urgente para evitar problemas en caso de siniestro y en auditorías. Debe enviarse a atencioncliente@unicorpvida.com.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(19,5,'19','El Cuestionario de salud físico recibido contiene discrepancias con respecto a los datos tecleados en el cuestionario telemático de Neos. El cliente declara que es POLICÍA/GUARDIA CIVIL y por tanto debéis enviar una solicitud de anulación de la operación firmada por el cliente (Unicorp Vida devolverá al cliente todo lo que haya pagado) SALVO que tenga tareas EXCLUSIVAMENTE ADMINISTRATIVAS, en cuyo lo que deberéis enviar es una carta firmada por el cliente aclarando este punto. Esta gestión es urgente para evitar problemas en caso de siniestro y en auditorías. Debe enviarse a atencioncliente@unicorpvida.com.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(20,5,'20','El Cuestionario de salud tiene respondida negativamente la pregunta 14. Realizar corrección y conseguir firma del cliente.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(21,5,'21','El número de cuestionario recibido no coincide con el numero de cuestionario indicado en la póliza de seguro. Se adjunta carta de vinculación para la firma del cliente.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(22,5,'22','El Cuestionario de salud no se puede firmar por poderes. Debe de firmarse por el asegurado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(23,6,'23','El Documento de datos fundamentales corresponde a otro producto.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(24,6,'24','El Documento de datos fundamentales del participe corresponde a otro producto. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(25,6,'25','El Documento de datos fundamentales del participe no está firmado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(26,6,'26','El Documento de datos fundamentales no esta firmado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(27,8,'27','El DNI/NIE del cliente no se ha recibido.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(28,8,'28','El DNI/NIE del cliente recibido está caducado. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(29,8,'29','El número de DNI/NIE del cliente no es legible.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(30,8,'30','Falta el anverso del DNI/NIE del cliente recibido.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(31,8,'31','Falta el reverso del DNI/NIE del cliente recibido.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(32,8,'32','Cuando la firma de la Póliza o Solicitud es por poderes debe de adjuntarse los poderes de representación y DNI/NIE del apoderado.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(33,8,'33','La fotografía del DNI del cliente no es visible. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(34,9,'34','El Test de adecuación e idoneidad no está completo. Deben responderse todas las preguntas. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(35,9,'35','El Test de adecuación e idoneidad no está completo. Debe seleccionar un perfil.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(36,9,'36','El Test de adecuación e idoneidad no está completo. Deben seleccionar las opciones de inversión recomendadas. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(37,9,'37','El Test de adecuación e idoneidad no está firmado por el cliente.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(38,10,'38','La orden de domiciliacion SEPA no está firmada por el cliente.','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(39,4,'39','La pregunta de actividad profesional no está respondida en la solicitud de seguro. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL),(40,4,'40','La pregunta de obligaciones fiscales en el extrajero no está respondida en la Solicitud de seguro. ','2024-10-01 14:18:03.363',NULL,'2024-10-01 14:18:03.363',1,NULL);
/*!40000 ALTER TABLE `MaestroIncidencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mediador`
--

DROP TABLE IF EXISTS `Mediador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mediador` (
  `MediadorId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Codigo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Canal` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Zona` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CompaniaId` int NOT NULL,
  `Email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Responsable` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmailResponsable` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Responsable2` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmailResponsable2` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Reclamar` tinyint(1) DEFAULT '0',
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `Observaciones` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`MediadorId`),
  KEY `Mediador_CompaniaId_fkey` (`CompaniaId`),
  CONSTRAINT `Mediador_CompaniaId_fkey` FOREIGN KEY (`CompaniaId`) REFERENCES `Compania` (`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mediador`
--

LOCK TABLES `Mediador` WRITE;
/*!40000 ALTER TABLE `Mediador` DISABLE KEYS */;
/*!40000 ALTER TABLE `Mediador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NoProcesar`
--

DROP TABLE IF EXISTS `NoProcesar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NoProcesar` (
  `NoprocesarId` int NOT NULL AUTO_INCREMENT,
  `MotivoDesechado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Compania` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Producto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CCC` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoSolicitud` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoPoliza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaEfecto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AnuladoSEfecto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Suplemento` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DNIAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaNacimientoAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CSRespAfirmativas` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProfesionAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DeporteAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DNITomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaValidezDNITomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreTomador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mediador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Operador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IndicadorFDPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoEnvioPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDPRECON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IndicadorFDCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoEnvioCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDCON` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Revisar` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Conciliar` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`NoprocesarId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NoProcesar`
--

LOCK TABLES `NoProcesar` WRITE;
/*!40000 ALTER TABLE `NoProcesar` DISABLE KEYS */;
/*!40000 ALTER TABLE `NoProcesar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Precios`
--

DROP TABLE IF EXISTS `Precios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Precios` (
  `PrecioId` int NOT NULL,
  `CompaniaId` int NOT NULL,
  `Desde` int NOT NULL,
  `Hasta` int NOT NULL,
  `PrecioActuacion` double NOT NULL,
  `PrecioFijo` double NOT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`PrecioId`),
  KEY `Precios_CompaniaId_fkey` (`CompaniaId`),
  CONSTRAINT `Precios_CompaniaId_fkey` FOREIGN KEY (`CompaniaId`) REFERENCES `Compania` (`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Precios`
--

LOCK TABLES `Precios` WRITE;
/*!40000 ALTER TABLE `Precios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Precios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Producto`
--

DROP TABLE IF EXISTS `Producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Producto` (
  `ProductoId` int NOT NULL AUTO_INCREMENT,
  `CompId` int NOT NULL,
  `Codigo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Reclamar` tinyint(1) DEFAULT '0',
  `Activo` tinyint(1) DEFAULT '1',
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Observaciones` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ProductoId`),
  UNIQUE KEY `Producto_Codigo_key` (`Codigo`),
  KEY `Producto_CompId_fkey` (`CompId`),
  CONSTRAINT `Producto_CompId_fkey` FOREIGN KEY (`CompId`) REFERENCES `Compania` (`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Producto`
--

LOCK TABLES `Producto` WRITE;
/*!40000 ALTER TABLE `Producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `Producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductoDocumento`
--

DROP TABLE IF EXISTS `ProductoDocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductoDocumento` (
  `ProductoDocId` int NOT NULL AUTO_INCREMENT,
  `ProductoId` int NOT NULL,
  `DocumentoId` int NOT NULL,
  `AnexoIncidencias` int DEFAULT NULL,
  `AnexoConciliacion` int DEFAULT NULL,
  `Caratula` int DEFAULT NULL,
  `RequiereComunicacion` tinyint(1) DEFAULT '0',
  `Fase` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`ProductoDocId`),
  KEY `ProductoDocumento_ProductoId_fkey` (`ProductoId`),
  KEY `ProductoDocumento_DocumentoId_fkey` (`DocumentoId`),
  KEY `ProductoDocumento_AnexoIncidencias_fkey` (`AnexoIncidencias`),
  KEY `ProductoDocumento_AnexoConciliacion_fkey` (`AnexoConciliacion`),
  KEY `ProductoDocumento_Caratula_fkey` (`Caratula`),
  CONSTRAINT `ProductoDocumento_AnexoConciliacion_fkey` FOREIGN KEY (`AnexoConciliacion`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ProductoDocumento_AnexoIncidencias_fkey` FOREIGN KEY (`AnexoIncidencias`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ProductoDocumento_Caratula_fkey` FOREIGN KEY (`Caratula`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ProductoDocumento_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `MaestroDocumentos` (`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductoDocumento_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `ProductoTipoOperacion` (`ProductoTipoOpId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductoDocumento`
--

LOCK TABLES `ProductoDocumento` WRITE;
/*!40000 ALTER TABLE `ProductoDocumento` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductoDocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductoTipoOperacion`
--

DROP TABLE IF EXISTS `ProductoTipoOperacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductoTipoOperacion` (
  `ProductoTipoOpId` int NOT NULL,
  `ProductoId` int NOT NULL,
  `PlantillaIncidencia` int DEFAULT NULL,
  `PlantillaConciliacion` int DEFAULT NULL,
  `TipoOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`ProductoTipoOpId`),
  KEY `ProductoTipoOperacion_ProductoId_fkey` (`ProductoId`),
  KEY `ProductoTipoOperacion_PlantillaIncidencia_fkey` (`PlantillaIncidencia`),
  KEY `ProductoTipoOperacion_PlantillaConciliacion_fkey` (`PlantillaConciliacion`),
  CONSTRAINT `ProductoTipoOperacion_PlantillaConciliacion_fkey` FOREIGN KEY (`PlantillaConciliacion`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ProductoTipoOperacion_PlantillaIncidencia_fkey` FOREIGN KEY (`PlantillaIncidencia`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ProductoTipoOperacion_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `Producto` (`ProductoId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductoTipoOperacion`
--

LOCK TABLES `ProductoTipoOperacion` WRITE;
/*!40000 ALTER TABLE `ProductoTipoOperacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductoTipoOperacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reclamaciones`
--

DROP TABLE IF EXISTS `Reclamaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reclamaciones` (
  `ReclamacionId` int NOT NULL AUTO_INCREMENT,
  `ContratoId` int NOT NULL,
  `UsuarioId` int NOT NULL,
  `Descricion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`ReclamacionId`),
  KEY `Reclamaciones_ContratoId_fkey` (`ContratoId`),
  KEY `Reclamaciones_UsuarioId_fkey` (`UsuarioId`),
  CONSTRAINT `Reclamaciones_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato` (`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Reclamaciones_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reclamaciones`
--

LOCK TABLES `Reclamaciones` WRITE;
/*!40000 ALTER TABLE `Reclamaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reclamaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RepositorioPlantillas`
--

DROP TABLE IF EXISTS `RepositorioPlantillas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RepositorioPlantillas` (
  `PlantillaId` int NOT NULL,
  `Documento` longblob NOT NULL,
  `Nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`PlantillaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RepositorioPlantillas`
--

LOCK TABLES `RepositorioPlantillas` WRITE;
/*!40000 ALTER TABLE `RepositorioPlantillas` DISABLE KEYS */;
/*!40000 ALTER TABLE `RepositorioPlantillas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rol`
--

DROP TABLE IF EXISTS `Rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rol` (
  `RolId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`RolId`),
  UNIQUE KEY `Rol_Nombre_key` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rol`
--

LOCK TABLES `Rol` WRITE;
/*!40000 ALTER TABLE `Rol` DISABLE KEYS */;
INSERT INTO `Rol` VALUES (1,'ADMIN','2024-10-01 13:54:58.628',NULL,'2024-10-01 13:54:58.628',1),(2,'MONITOR','2024-10-01 13:54:58.639',NULL,'2024-10-01 13:54:58.639',1),(3,'BASE','2024-10-01 13:54:58.641',NULL,'2024-10-01 13:54:58.641',1);
/*!40000 ALTER TABLE `Rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tableta`
--

DROP TABLE IF EXISTS `Tableta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tableta` (
  `TabletaId` int NOT NULL AUTO_INCREMENT,
  `Compannia` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoProducto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoSubProducto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreComercialProducto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoProducto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoModalidad` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoPoliza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoSolicitud` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaGrabacion` datetime(3) DEFAULT NULL,
  `DNIAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NumIdentificacionTo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreTo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoMediador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreMediador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoSubmediador` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `NombreSubMediador` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `CCC` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaOperacion` datetime(3) DEFAULT NULL,
  `FechaActualizacion` datetime(3) DEFAULT NULL,
  `DescOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoRegistro` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoInternoFormulario` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DescFormulario` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoFirma` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaFirma` datetime(3) DEFAULT NULL,
  `SituacionFirma` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CanalMediador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CanalRecepcionFirma` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoCentro` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NumActualizaciones` int DEFAULT NULL,
  `Usuario` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Conciliar` tinyint(1) DEFAULT NULL,
  `FormularioPrincipal` tinyint(1) DEFAULT NULL,
  `Observaciones` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaGeneracion` datetime(3) DEFAULT NULL,
  `FechaCarga` datetime(3) DEFAULT NULL,
  `Actualiazado` tinyint(1) NOT NULL DEFAULT '0',
  `Activo` tinyint(1) DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `errores` json DEFAULT NULL,
  PRIMARY KEY (`TabletaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tableta`
--

LOCK TABLES `Tableta` WRITE;
/*!40000 ALTER TABLE `Tableta` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tableta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoConciliacion`
--

DROP TABLE IF EXISTS `TipoConciliacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoConciliacion` (
  `tipoConciliacionId` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `fechaBaja` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`tipoConciliacionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoConciliacion`
--

LOCK TABLES `TipoConciliacion` WRITE;
/*!40000 ALTER TABLE `TipoConciliacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `TipoConciliacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoDocumentoIncidencia`
--

DROP TABLE IF EXISTS `TipoDocumentoIncidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoDocumentoIncidencia` (
  `TipoDocumentoIncidenciaId` int NOT NULL AUTO_INCREMENT,
  `DocumentoId` int NOT NULL,
  `IncidenciaId` int NOT NULL,
  `MailInterno` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Activo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`TipoDocumentoIncidenciaId`),
  KEY `TipoDocumentoIncidencia_IncidenciaId_fkey` (`IncidenciaId`),
  KEY `TipoDocumentoIncidencia_DocumentoId_fkey` (`DocumentoId`),
  CONSTRAINT `TipoDocumentoIncidencia_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `MaestroDocumentos` (`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `TipoDocumentoIncidencia_IncidenciaId_fkey` FOREIGN KEY (`IncidenciaId`) REFERENCES `MaestroIncidencias` (`IncidenciaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoDocumentoIncidencia`
--

LOCK TABLES `TipoDocumentoIncidencia` WRITE;
/*!40000 ALTER TABLE `TipoDocumentoIncidencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `TipoDocumentoIncidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `UsuarioId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CaducidadPassword` datetime(3) DEFAULT NULL,
  `RolId` int NOT NULL,
  `Codigo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechAlta` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`UsuarioId`),
  UNIQUE KEY `Usuario_Codigo_key` (`Codigo`),
  KEY `Usuario_RolId_fkey` (`RolId`),
  CONSTRAINT `Usuario_RolId_fkey` FOREIGN KEY (`RolId`) REFERENCES `Rol` (`RolId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (1,'Iván','$2b$10$NdRsoG5vhapq5A.oWqr8cOKGgMqBsIQ9m9d2dFZaNilOTLfY5k0S6',NULL,1,'0000','2024-10-01 13:54:58.742',NULL,'2024-10-01 13:54:58.742','2024-10-01 13:54:58.742',1),(2,'Sistema','$2b$10$V/xNAq5dM5YIZzvtd2bYou4X5eqaxalRkYcpwr7jqxc.IjulgMXXy',NULL,1,'0001','2024-10-01 13:54:58.821',NULL,'2024-10-01 13:54:58.821','2024-10-01 13:54:58.821',1),(3,'Luis Muñoz Benito','$2b$10$i5LytnN0J7zRs/9.2Jx0Y.2LW50GJFdQC4IQE/9cxokJo4sd.Y4MW',NULL,3,'lmb_base','2024-10-01 13:54:58.905',NULL,'2024-10-01 13:54:58.905','2024-10-01 13:54:58.905',1),(4,'Luis Muñoz Benito','$2b$10$xvZklazJufVbs3uXsFLY7urRRSpsmamL41a2yafxSJJb0pTy.LkQq',NULL,2,'lmb_monitor','2024-10-01 13:54:58.980',NULL,'2024-10-01 13:54:58.980','2024-10-01 13:54:58.980',1),(5,'Luis Muñoz Benito','$2b$10$kZHH54AyRm5CrZI5qyctE.q4v7FkaVI2gdB3dOSAJBv5BSl.lK3Lu',NULL,1,'lmb_admin','2024-10-01 13:54:59.050',NULL,'2024-10-01 13:54:59.050','2024-10-01 13:54:59.050',1),(6,'Sebastián Torres Guzmán','$2b$10$Pfl/DEnlpmUvQESKZDEkuugRaDf1fuGp5791btZIXZaRDMJ/Iyjq.',NULL,3,'stg_base','2024-10-01 13:54:59.122',NULL,'2024-10-01 13:54:59.122','2024-10-01 13:54:59.122',1),(7,'Sebastián Torres Guzmán','$2b$10$XqnTrf6ICFDGZ6Ipj60bUufno6/kOMk/lAW4biBPQVgrDa9ZNzpSK',NULL,2,'stg_monitor','2024-10-01 13:54:59.194',NULL,'2024-10-01 13:54:59.194','2024-10-01 13:54:59.194',1),(8,'Sebastián Torres Guzmán','$2b$10$fah3uvyi24IfXP3VekJSJ..4koqKdRWqHAOc47qGDjkI.3jgwALdO',NULL,1,'stg_admin','2024-10-01 13:54:59.268',NULL,'2024-10-01 13:54:59.268','2024-10-01 13:54:59.268',1),(9,'Juan Lora Rodríguez','$2b$10$RQbq/FtR6PSx495cbop9ku8qZvBxlmHIR6pg6UkXJ3XBmlyU2uVQC',NULL,1,'juanlr','2024-10-01 13:54:59.337',NULL,'2024-10-01 13:54:59.337','2024-10-01 13:54:59.337',1),(10,'Moises Cañete Lopez','$2b$10$ZB2SRD/nhKL2pEzET2GFcuf2/4t2VzPI54RRX20yJkymxUe6rxEeW',NULL,1,'moisescl','2024-10-01 13:54:59.404',NULL,'2024-10-01 13:54:59.404','2024-10-01 13:54:59.404',1),(11,'Nuria Lopez Perez','$2b$10$wgSOCJzk1aAB1CUajPRHi.DR8TNm5ps7MBf1ShNIRYfvmoNXhZJf6',NULL,3,'nurialp','2024-10-01 13:54:59.473',NULL,'2024-10-01 13:54:59.473','2024-10-01 13:54:59.473',1),(12,'admin','$2b$10$O5rkccehkTExNqpinY/fiu9zH3xlH0ptO6pBHvzya33ZvlcrBErY6',NULL,1,'admin','2024-10-01 13:54:59.540',NULL,'2024-10-01 13:54:59.540','2024-10-01 13:54:59.540',1),(13,'Luis Muñoz','$2b$10$Y6xczocRXbGNKmYHPrXjt.4UYRpM0hv1FC01Zcx9nn/6XIFOq0VfW',NULL,1,'lmunoz','2024-10-01 13:54:59.608',NULL,'2024-10-01 13:54:59.608','2024-10-01 13:54:59.608',1),(14,'Juan Lora','$2b$10$uIWb6KocMs/PvJ5xDloeqemLcvPU6gahNbt0J7RoDop7MvcAb4.zW',NULL,2,'jlora','2024-10-01 13:54:59.772',NULL,'2024-10-01 13:54:59.772','2024-10-01 13:54:59.772',1),(15,'Usuario Base','$2b$10$1x.9qgY3nVwlOIle43zcXO00qpNlMMEQkUCx4YDF0B/KJOeoKTqd6',NULL,3,'base','2024-10-01 13:54:59.851',NULL,'2024-10-01 13:54:59.851','2024-10-01 13:54:59.851',1);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bpm-prod'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-01 16:01:02
