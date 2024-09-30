-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (x86_64)
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
INSERT INTO `_prisma_migrations` VALUES ('0297c81c-87a2-4c74-be24-3e33c02d01a5','bc47fe6686123211a12a2d25ab3077ff71ea485475ca0185ddd17fe9185c2ccc','2024-09-25 07:16:00.278','20240924201637_update',NULL,NULL,'2024-09-25 07:16:00.262',1),('0b34a527-bb5d-4731-9194-89b3a522cba2','9a3869623868999f583ebaa1e782ce5f903252d985dc6b6b4438133c780008a0','2024-09-06 01:31:49.641','20240905174934_update',NULL,NULL,'2024-09-06 01:31:49.630',1),('0f35f367-757c-4d69-8bf3-e8f9c7e7c3e8','39df3762c22535bfbc4cacbdbb1d6367f21cfc3bba4827ff19ed4999f35e4b60','2024-09-19 21:44:55.031','20240919214454_update',NULL,NULL,'2024-09-19 21:44:54.989',1),('1761b178-81b6-4ef1-9c60-93248bf3e4e6','14b84aeed0cdba76780370dc7997911f5573f79ae291c2619735cb06f97c852e','2024-09-22 12:25:39.527','20240922122337_update',NULL,NULL,'2024-09-22 12:25:39.514',1),('17e38418-eb4d-46f5-b482-57584a9a9f68','f484e3a6b63fb5e3250e017ddb5b7c220f5b1ca7e5a08237734b937e210f9430','2024-09-15 17:13:59.351','20240913133245_update',NULL,NULL,'2024-09-15 17:13:59.216',1),('1dbe1e4a-2afe-4617-a10e-0bc453a9e992','174c2890276ec597d17ce3b0a2107c062116cdb12562dfc6855919e974081308','2024-09-22 12:25:39.513','20240922120342_update',NULL,NULL,'2024-09-22 12:25:39.449',1),('1f378fdb-b687-48c6-ab11-682390487a54','0407c255a81e600dd7e018ab4862de94fef660685f94e9b6f450638fe476eac0','2024-09-15 17:13:58.959','20240913103735_update',NULL,NULL,'2024-09-15 17:13:58.912',1),('27b137d0-369b-4313-a170-70092b3e25bf','7fc3c146bbe683985dd52a2578357bd8a6966a1ac0e4fc6de4650e8c6a134a5f','2024-09-06 01:31:49.629','20240905121813_update',NULL,NULL,'2024-09-06 01:31:49.607',1),('333a50d7-8378-481e-88da-4e5723912bd6','326e4cf76a5e0dbe273dea7f86408515628182fb0e44745854e1126b944a0814','2024-09-30 12:59:29.821','20240928135146_update',NULL,NULL,'2024-09-30 12:59:29.777',1),('365b985b-a1ed-46c9-bb7d-e26c3848b2c9','176aa5a25dfe56baf3c5cf94fd4494d07bfa3993723c608eb3f4239a9cbc79d2','2024-09-25 07:16:00.261','20240924195137_update',NULL,NULL,'2024-09-25 07:16:00.242',1),('3a83f7b9-ca37-46d1-8f3a-a2239555eaa0','6c9064da08dbfa7d0dd83459614e6f91ad9458c52abdce26030d3fbff7b22b64','2024-09-15 17:13:59.506','20240915150528_update',NULL,NULL,'2024-09-15 17:13:59.496',1),('42df53ed-1114-46b2-8622-8e5ed55f6f83','23c373a80982acef4196cb4ccd403f1f7f7a31a4f995385c76dc77cf1dd06406','2024-09-15 17:14:08.817','20240915171408_update',NULL,NULL,'2024-09-15 17:14:08.797',1),('473a872d-8b83-4a61-8e5e-1a0cf53ef638','11da222341172544b6b3c897cfcbb42d27ed5e2a9a9dddd6f958523005534475','2024-09-09 21:35:57.275','20240909213557_update',NULL,NULL,'2024-09-09 21:35:57.257',1),('49e16792-a10d-4d38-850d-45243cf0dc27','df0920e08ea806b09a4ea438965bed4f0f9d1a0cda9ad29388ec5640e78361f4','2024-09-02 12:09:48.322','20240902115955_init',NULL,NULL,'2024-09-02 12:09:47.601',1),('4cc6355a-7e50-42d0-8ef9-958233ac4531','a457f5b4b6122038504c17d3db361c5212621c18fcd98c1d336ac36ad5225650','2024-09-06 01:31:49.748','20240905232333_update',NULL,NULL,'2024-09-06 01:31:49.737',1),('52c1554a-23de-4d77-9615-5c79abf70768','d4f4f4cbb8123a2f33e3b0d67338bfd835cda09b3b980451503aabf651d24a78','2024-09-15 17:13:59.385','20240913134303_update',NULL,NULL,'2024-09-15 17:13:59.369',1),('5df00c8e-3c75-4038-b4d7-3df1cc5b7bb8','4b3a336451dd56c53977b8b163674954f0d124cb57d75773f8c49e7a98e4c653','2024-09-06 01:31:49.727','20240905230018_update',NULL,NULL,'2024-09-06 01:31:49.720',1),('65d4b924-19d2-4068-8d77-597bbd58a7f9','a98fc020673ff8a66f95d300b032c9997de95e53581b03fa203d282edbac4e92','2024-09-25 07:16:05.752','20240925071605_update',NULL,NULL,'2024-09-25 07:16:05.741',1),('67120a66-c33b-46f8-a432-fbec25ea3226','086bc9bac7377e721a3df740d3db012aacca32ad62a8959464f87813a300dccf','2024-09-06 01:31:49.737','20240905231200_update',NULL,NULL,'2024-09-06 01:31:49.728',1),('6788e57e-d061-497f-b99e-5e10cb6fa1ca','796160e0e004864f9e1407fa85c58def0012082563e3751c0e6ab62fbd4bf2e3','2024-09-30 12:59:29.883','20240928135246_update',NULL,NULL,'2024-09-30 12:59:29.824',1),('6dd13a7d-0212-4830-88d7-4870dd8318f4','b6bf41be009ff49579444dac5e30c4edf3f336789612ae1f0a382f0122afbc7e','2024-09-15 17:13:59.415','20240913214808_update',NULL,NULL,'2024-09-15 17:13:59.386',1),('71ba1dc9-fd12-4613-823d-75a883cd9612','baa63b098b091beb1dc89335037ae770e347711ca51fd16b20a5fd7077122412','2024-09-15 17:13:59.214','20240913115641_update',NULL,NULL,'2024-09-15 17:13:59.175',1),('884c44e3-3951-48a7-bec2-54de3593a1cf','e221c705c03198248f344dd376e38aaa787ccb77b724f4a5f388b6a1af1b37c8','2024-09-15 17:13:59.063','20240913112436_update',NULL,NULL,'2024-09-15 17:13:58.960',1),('8afa5715-0af5-41b0-8e51-b64ff15f2c9b','95e41598ab83b609ba3a9aab710221ff618387e4135984c3895b137778a1fd3b','2024-09-25 07:16:00.299','20240924221141_update',NULL,NULL,'2024-09-25 07:16:00.292',1),('96d7308b-4d65-448c-a883-eee98ddd904f','4a6eb94979903c2e1b86e63709e15f902539bec6dbc7f26d2b59122ee8a491d4','2024-09-30 12:59:30.092','20240929132936_update',NULL,NULL,'2024-09-30 12:59:30.026',1),('96e25051-ea64-45f4-9c2f-2b67f09668a8','a6de673e48db9af3929cc4f7dfda7fade4758f95ea0da4680bf6f6172ecff16c','2024-09-15 17:13:58.911','20240912131304_update',NULL,NULL,'2024-09-15 17:13:58.867',1),('9947e968-26e2-49ca-8bb2-394bd2b2de29','db2cc302ce10de7f0bc13c0c67ea2ea4adf6b3c9c9976a238df44c048d30f85f','2024-09-06 09:44:31.795','historial',NULL,NULL,'2024-09-06 09:44:31.785',1),('a0750b77-047d-4167-a517-d020d75a1aa3','910d68299614c13f429942482a3ed36aff42df803f8a081aee0d5c23a8fed589','2024-09-06 01:31:49.606','20240904231612_update',NULL,NULL,'2024-09-06 01:31:49.549',1),('a39da58b-ba2d-4aee-abfb-01a665450497','9681060ee5dd30bf66349ab97b925a380c7e73d25a9bf2343d4b42651fb3fbfa','2024-09-06 01:31:49.549','20240904231316_update',NULL,NULL,'2024-09-06 01:31:49.541',1),('a64ca0f6-383d-46e0-9144-bfb03a948cb8','50348fca850607b300ad96e5fb3e27a13c9bc74c7fb861a6435a8c4ad1d11d85','2024-09-06 01:31:49.719','20240905214821_update',NULL,NULL,'2024-09-06 01:31:49.641',1),('bbf480bd-9476-4b03-9aa2-6be862f8d501','7cd6d2d9386a6dc659e199f89159b7e3a82ffb39d25646fcb7646c3317d426f3','2024-09-09 21:35:46.767','20240906131242_update',NULL,NULL,'2024-09-09 21:35:46.729',1),('be435bd5-08a6-4421-bfe4-69261bf607fc','97d80e5c25d7d7f7506f62956153057cce9b52de47aa01f7ba612181a3c8f9c5','2024-09-30 12:59:30.024','20240928150027_update',NULL,NULL,'2024-09-30 12:59:29.989',1),('c396f033-d5c5-4ee4-8b3a-55656b21c303','182f0900f79ddb68c46f46bf08acde26ee0640d276089ac35a8036865c800728','2024-09-15 17:13:59.368','20240913134049_update',NULL,NULL,'2024-09-15 17:13:59.351',1),('cae713b3-f211-4a96-a77b-1bd8209c446b','d314f22924ed03cea4572d21f54997c86bd34be547d9680b0a35a75bb455fdf0','2024-09-23 13:22:03.914','20240922133959_update',NULL,NULL,'2024-09-23 13:22:03.830',1),('cc17582d-bba4-4290-a62a-b88581183de3','9b34ec73e456b24104379714b8bc63e63f937cb1f8c2ff593c85a45c9e032f16','2024-09-25 07:16:00.242','20240924194230_',NULL,NULL,'2024-09-25 07:16:00.223',1),('cc3ecd98-b618-40aa-ab77-d263a7ebc663','87d2d7075e3562de470f5840ac3ead23a9908482ad3fa2bbe5936b3d322b6320','2024-09-22 12:25:39.449','20240921141702_update',NULL,NULL,'2024-09-22 12:25:39.442',1),('d7539c39-ec30-46a9-8709-a1c16f270de3','ed8c07318df2732d560b3f13de7fe120cc485fc0283337a2ab0ec0964c5409e3','2024-09-15 17:13:59.561','20240915163321_update',NULL,NULL,'2024-09-15 17:13:59.507',1),('e4d2161e-54e7-40a1-ac08-178771072a08','4708f5960ece68afbeceb356b8c3897f55c45c641b090a0ff048de5527f702c8','2024-09-25 07:16:00.292','20240924220402_update',NULL,NULL,'2024-09-25 07:16:00.279',1),('eacdb4e1-f551-459b-a06d-9ce049f0cbe6','492a0d9e08ae30126dda5606bd97debf8de27e59ce502f7f82f7b3e065238bc7','2024-09-15 17:13:59.173','20240913115224_update',NULL,NULL,'2024-09-15 17:13:59.064',1),('eb7d23c7-ec29-4378-9824-9da27e34ade2','f3877359089b296398f8cacbba97915bf1ee853795d5b7a5fd8d4628d8ed7439','2024-09-06 10:02:13.338','20240906100213_update',NULL,NULL,'2024-09-06 10:02:13.266',1),('ecbd01c1-2966-4853-96a9-e6bd678330fe','d5514006f6cd128a73b3cbea8835921822e70b59566e2b148c4bac1bd2d4f8e0','2024-09-15 17:13:59.495','20240915133502_update',NULL,NULL,'2024-09-15 17:13:59.416',1),('ef9fcf94-470b-44fe-8c75-e9aa729d4e46','c7bbfd9438d64111058ad603843b9f466425dc9f5b0aa50c0e4ec476550c7506','2024-09-30 12:59:29.985','20240928143820_update',NULL,NULL,'2024-09-30 12:59:29.888',1),('f38f5670-896c-474c-88ea-43aee6a53b9d','db2cc302ce10de7f0bc13c0c67ea2ea4adf6b3c9c9976a238df44c048d30f85f','2024-09-06 01:31:49.771','20240906005701_update',NULL,NULL,'2024-09-06 01:31:49.749',1),('f40451d6-c73d-4fb5-b80b-2d1d5672a835','d4c80a5fb0c22de096a73a6fc4a976e00182119f5518e048b4672cc2f7f1c40a','2024-09-09 21:35:46.828','20240907224116_update',NULL,NULL,'2024-09-09 21:35:46.767',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  KEY `CajaLote_ContratoId_fkey` (`ContratoId`),
  KEY `CajaLote_DocumentoId_fkey` (`DocumentoId`),
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Compania`
--

LOCK TABLES `Compania` WRITE;
/*!40000 ALTER TABLE `Compania` DISABLE KEYS */;
INSERT INTO `Compania` VALUES (1,'SLS','C174','Santalucía Seguros','','',0,'',0,'','2024-08-21 23:07:33.205',NULL,'2024-05-08 18:41:21.000',1),(2,'SLP','G0241','Santalucía Gestora de Pensiones','','',0,'',0,'','2024-08-21 23:07:33.205',NULL,'2024-05-08 18:41:21.000',1),(3,'UNI','C637','Unicaja','','',0,'',0,'','2024-08-21 23:07:33.205',NULL,'2024-05-08 18:41:21.000',1),(4,'PLV','C693','Pelayo Vida','','',0,'',0,'','2024-08-21 23:07:33.205',NULL,'2024-05-08 18:41:21.000',1),(5,'Sin Compania','Sin Compania','Sin compania',NULL,NULL,0,NULL,0,NULL,'2024-08-21 23:07:33.205',NULL,'2024-08-09 09:43:16.809',1);
/*!40000 ALTER TABLE `Compania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comunicacion`
--

DROP TABLE IF EXISTS `Comunicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comunicacion` (
  `userId` int NOT NULL,
  `tipoComunicacion` enum('DOCUMENTOS_PENDIENTES','INCIDENCIAS','DOCUMENTOS_PENDIENTES_INCIDENCIAS') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comunicationId` int NOT NULL AUTO_INCREMENT,
  `contractoId` int NOT NULL,
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
  `Revisar` tinyint(1) NOT NULL DEFAULT '1',
  `Conciliar` tinyint(1) NOT NULL DEFAULT '1',
  `errores` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `TipoConciliacionId` int DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `NotaInterna` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `UsuarioId` int DEFAULT NULL,
  `FechaProximaReclamacion` datetime(3) DEFAULT NULL,
  `NumeroReclamaciones` int NOT NULL DEFAULT '0',
  `FechaReclamacion` datetime(3) DEFAULT NULL,
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
  `DocumentoContratoHistoryId` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`DocumentoContratoHistoryId`),
  KEY `DocumentoContratoHistory_DocumentoId_fkey` (`DocumentoId`),
  CONSTRAINT `DocumentoContratoHistory_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `DocumentoContrato` (`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11279 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentoContratoHistory`
--

LOCK TABLES `DocumentoContratoHistory` WRITE;
/*!40000 ALTER TABLE `DocumentoContratoHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentoContratoHistory` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `EstadoContrato` enum('PENDIENTE','PENDIENTE_INCIDENCIA','SIN_CONCILIAR','TRAMITADA','ANULADA','DESECHADO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Operacion` enum('INSERTADO','ACTUALIZADO','DESECHADO','ELIMINADO','ANULADO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaOperacion` datetime(3) DEFAULT NULL,
  `FechaEfecto` datetime(3) DEFAULT NULL,
  `AnuladoSEfecto` tinyint(1) DEFAULT '0',
  `Suplemento` tinyint(1) DEFAULT '0',
  `DNIAsegurado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `NumeroReclamaciones` int NOT NULL DEFAULT '0',
  `FechaProximaReclamacion` datetime(3) DEFAULT NULL,
  `FechaReclamacion` datetime(3) DEFAULT NULL,
  `CCC` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `ClaveOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `CodigoPoliza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `CodigoSolicitud` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `CompaniaId` int DEFAULT NULL,
  `MediadorId` int DEFAULT NULL,
  `ProductoId` int DEFAULT NULL,
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
  `Incidencia` int DEFAULT NULL,
  `UsuarioId` int NOT NULL,
  `createdAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `Resuelta` tinyint(1) DEFAULT '0',
  `NumReclamaciones` int NOT NULL DEFAULT '0',
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Nota` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Reclamada` datetime(3) DEFAULT NULL,
  `Revisada` tinyint(1) NOT NULL DEFAULT '0',
  `Enviar` tinyint(1) NOT NULL DEFAULT '0',
  `FechaUltimaReclamacion` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`IncidenciaDocId`),
  KEY `IncidenciaDocumento_DocumentoContratoId_fkey` (`DocumentoContratoId`),
  KEY `IncidenciaDocumento_UsuarioId_fkey` (`UsuarioId`),
  KEY `IncidenciaDocumento_Incidencia_fkey` (`Incidencia`),
  CONSTRAINT `IncidenciaDocumento_DocumentoContratoId_fkey` FOREIGN KEY (`DocumentoContratoId`) REFERENCES `DocumentoContrato` (`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `IncidenciaDocumento_Incidencia_fkey` FOREIGN KEY (`Incidencia`) REFERENCES `MaestroIncidencias` (`IncidenciaId`) ON DELETE SET NULL ON UPDATE CASCADE,
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
  `IncidenciaDocHistoryID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`IncidenciaDocHistoryID`),
  KEY `IncidenciaDocumentoHistory_IncidenciaDocId_fkey` (`IncidenciaDocId`),
  CONSTRAINT `IncidenciaDocumentoHistory_IncidenciaDocId_fkey` FOREIGN KEY (`IncidenciaDocId`) REFERENCES `IncidenciaDocumento` (`IncidenciaDocId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `Compania` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Producto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaOperacion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoOperacion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CCC` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoSolicitud` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoPoliza` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaEfecto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AnuladoSEfecto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Suplemento` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DNIAsegurado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreAsegurado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaNacimientoAsegurado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CSRespAfirmativas` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ProfesionAsegurado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DeporteAsegurado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DNITomador` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaValidezDNITomador` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NombreTomador` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mediador` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Operador` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IndicadorFDPRECON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoEnvioPRECON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDPRECON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IndicadorFDCON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoEnvioCON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDCON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Revisar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Conciliar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Insertada` tinyint(1) NOT NULL DEFAULT '0',
  `errores` json DEFAULT NULL,
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
  `Accion` enum('CARGA','RELOAD','UPDATE_CARGA','INCIDENCIA','RECLAMACION','CONCILIACION','ANULACION') COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `Actualizados` int NOT NULL DEFAULT '0',
  `Desechados` int NOT NULL DEFAULT '0',
  `ConError` int NOT NULL DEFAULT '0',
  `Details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `revisarCont` int NOT NULL DEFAULT '0',
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
  `Codigo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Suplemento` tinyint(1) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `Activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`DocumentoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaestroDocumentos`
--

LOCK TABLES `MaestroDocumentos` WRITE;
/*!40000 ALTER TABLE `MaestroDocumentos` DISABLE KEYS */;
INSERT INTO `MaestroDocumentos` VALUES (1,'ANE','Anexo Condiciones particulares','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(2,'BOL','Boletín de adhesión / Certificado de pertenencia','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(3,'CON','Formulario de conocimiento del cliente','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(4,'CP','Condiciones particulares o solicitudes','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(5,'CS','Cuestionario de salud','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(6,'DAT','Documento de datos fundamentales para el cliente. ','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(7,'DFP','Documento de datos fundamentales para el participe','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(8,'DNI','Documento acreditativo de identidad del cliente (NIF/NIE)','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(9,'IDO','Test de adecuación e idoneidad.','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(10,'SEPA','Documento Domiciliación SEPA','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(11,'SOL','Solicitud de seguro','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1),(12,'SUP','Suplementos, anulaciones, rescates y otros','',0,'2024-08-21 23:07:33.252',NULL,'2024-05-08 19:04:20.000',1);
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
  PRIMARY KEY (`IncidenciaId`),
  KEY `MaestroIncidencias_DocAsociadoId_fkey` (`DocAsociadoId`),
  CONSTRAINT `MaestroIncidencias_DocAsociadoId_fkey` FOREIGN KEY (`DocAsociadoId`) REFERENCES `MaestroDocumentos` (`DocumentoId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaestroIncidencias`
--

LOCK TABLES `MaestroIncidencias` WRITE;
/*!40000 ALTER TABLE `MaestroIncidencias` DISABLE KEYS */;
INSERT INTO `MaestroIncidencias` VALUES (1,2,'3003','El Boletín de adhesion al plan de pensiones no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(2,2,'3013','El Boletín de adhesion al plan de pensiones no está firmado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(3,2,'3023','La pregunta de actividad profesional no está respondida en el boletín de adhesión. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(4,2,'3033','La pregunta de obligaciones fiscales en el extrajero no está respondida en el boletín de adhesion. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(5,3,'822','ALTA ACTIVIDAD/CONOC. CLIENTE','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(6,3,'2002','El formulario de conocimiento del cliente no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(7,3,'2012','El formulario de conocimiento del cliente no está firmado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(8,3,'2022','El formulario de conocimiento del cliente esta incompleto. Faltan apartados por cumplimentar.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(9,3,'2102','El formulario de conocimiento del cliente no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(10,3,'2112','El formulario de conocimiento del cliente no está firmado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(11,3,'2122','El formulario de conocimiento del cliente está incompleto. Faltan apartados por cumplimentar.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(12,3,'22002','El formulario de conocimiento del cliente no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(13,3,'22012','El formulario de conocimiento del cliente no está firmado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(14,3,'22022','El formulario de conocimiento del cliente está incompleto. Faltan apartados por cumplimentar.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(15,3,'22122','El formulario de conocimiento del cliente está incompleto. Faltan apartados por cumplimentar.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(16,3,'22132','El formulario de conocimiento del cliente recibido es de persona física y se requiere el formulario de persona jurídica, al ser el tomador una empresa.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(17,4,'58','SELLO Y FIRMA DE LA OFICINA EN CONDICIONES GENERALES Y/O PARTICULARES','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(18,4,'653',' FALTA FIRMA DEL ASEGURADO/A EN LA DOCUMENTACIÓN CONTRACTUAL DE LA PÓLIZA.(Cond. Particulares, Cond. Generales y en determinados casos Anexo de las Cond. Particulares)','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(19,4,'654',' FALTA DOCUMENTACIÓN CONTRACTUAL DE LA PÓLIZA. (Cond. Particulares y/o Cond. Generales y/o, en determinados casos, Anexo de las Cond. Particulares)','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(20,4,'723','FALTA FIRMA DEL TOMADOR Y/O DEL ASEGURADO/A EN LA DOCUMENTACIÓN CONTRACTUAL DE LA PÓLIZA. (Cond. Particulares, Cond. Generales y en determinados casos Anexo de las Cond. Particulares)','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(21,4,'4004','Las Condiciones particulares de la póliza no se han recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(22,4,'4014','Las Condiciones particulares de la póliza no están firmadas por el cliente. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(23,4,'6013',' El 	Anexo a condiciones particulares no esta firmado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(24,4,'14004','Las Condiciones particulares de la póliza no se han recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(25,4,'14014','Las Condiciones particulares de la póliza no están firmadas por el cliente. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(26,5,'51','FIRMA EN CUESTIONARIO DE SALUD. (el Cuestionario de Salud debe estar siempre firmado por el cliente)','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(27,5,'56','FALTA COPIA CUESTIONARIO DE SALUD PARA LA COMPAÑÍA ASEGURADORA.(cumplimentación manual)','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(28,5,'57','CUESTIONARIO DE SALUD Y ACTIVIDAD  CORRECTAMENTE CUMPLIMENTADO INCLUIDA PROFESION (Si lo cumplimenta a mano tienen que coincidir todos los datos con los aportados por el cliente en el alta, en caso de desigualdad de datos, el cliente no estaría cubierto).','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(29,5,'651',' FALTA FIRMA DEL ASEGURADO/A EN EL CUESTIONARIO DE SALUD.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(30,5,'656','FALTA EL MODELO DEL CUESTIONARIO DE SALUD PARA LA COMPAÑÍA ASEGURADORA.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(31,5,'657',' EL CUESTIONARIO DE SALUD NO ESTÁ CUMPLIMENTADO CORRECTAMENTE.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(32,5,'721','FALTA FIRMA DEL ASEGURADO/A EN EL CUESTIONARIO DE SALUD.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(33,5,'726','FALTA EL MODELO DEL CUESTIONARIO DE SALUD PARA LA COMPAÑÍA ASEGURADORA.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(34,5,'727','EL CUESTIONARIO DE SALUD NO ESTÁ CUMPLIMENTADO CORRECTAMENTE.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(35,5,'728','FALTA FIRMA DEL ASEGURADO/A EN EL CUESTIONARIO DE SALUD.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(36,5,'821','FALTA FIRMA DEL ASEGURADO/A EN EL C. DE SALUD.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(37,5,'826','FALTA EL C. DE SALUD.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(38,5,'827','EL C. DE SALUD NO ESTÁ CUMPLIMENTADO CORRECTAMENTE.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(39,5,'6007','El cuestionario de salud no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(40,5,'6017',' El cuestionario de salud no esta firmado por el asegurado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(41,5,'6037',' El cuestionario de salud contiene enmiendas o tachaduras cuya correccion no está firmada por el asegurado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(42,5,'6047',' El cuestionario de salud no tiene informado el peso y/o la talla.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(43,5,'6057',' El cuestionario de salud no se puede firmar por poderes. Debe de firmarse por el asegurado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(44,5,'6067',' El cuestionario de salud tiene respuestas afirmativas y no se ha ampliado la información en la parte inferior.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(45,5,'6077',' El cuestionario de salud no indica la profesión del asegurado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(46,5,'6087',' El cuestionario de salud tiene respuestas tipo (SI/NO) sin responder.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(47,5,'6097',' El cuestionario de salud tiene respondida negativamente la pregunta 14. Realizar correccion y conseguir firma del cliente.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(48,5,'7007','El Cuestionario de salud no se ha recibido. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(49,5,'7017','El Cuestionario de salud no esta firmado por el asegurado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(50,5,'7027','El cuestionario de salud no indica la profesión del asegurado. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(51,5,'7037','El cuestionario de salud tiene respuestas sin responder. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(52,5,'7047','El cuestionario de salud no esta firmado por el asegurado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(53,5,'17007','El Cuestionario de salud no se ha recibido. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(54,5,'17017','El Cuestionario de salud no esta firmado por el asegurado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(55,5,'17027','El cuestionario de salud no indica la profesión del asegurado. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(56,5,'17037','El cuestionario de salud tiene respuestas sin responder. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(57,5,'17047','El cuestionario de salud tiene respuestas afirmativas y no se ha ampliado la información.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(58,6,'828','FALTA DOC. DATOS FUNDAMENTALES  (KID)','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(59,6,'6018',' El Documento de datos fundamentales no esta firmado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(60,6,'8008','El Documento de datos fundamentales no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(61,6,'8018','El Documento de datos fundamentales no esta firmado.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(62,6,'8028','El Documento de datos fundamentales corresponde a otro producto.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(63,7,'8108','El Documento de datos fundamentales del participe no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(64,7,'8118','El Documento de datos fundamentales del participe no está firmado','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(65,7,'8128','El Documento de datos fundamentales del participe corresponde a otro producto. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(66,8,'720','FALTA COPIA DEL DNI','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(67,8,'820','FALTA COPIA DEL DNI','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(68,8,'1000','El DNI del cliente no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(69,8,'1010','Falta el anverso del DNI del cliente recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(70,8,'1020','Falta el reverso del DNI del cliente recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(71,8,'1030','La fotografía del DNI del cliente no es visible. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(72,8,'1040','El número de DNI del cliente no es legible.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(73,8,'1050','El DNI del cliente recibido está caducado. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(74,8,'11000','El DNI del cliente no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(75,8,'11010','Falta el anverso del DNI del cliente recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(76,8,'11020','Falta el reverso del DNI del cliente recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(77,8,'11030','La fotografía del DNI del cliente no es visible. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(78,8,'11040','El número de DNI del cliente no es legible.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(79,8,'11050','El DNI del cliente recibido está caducado. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',1),(80,9,'829','FALTA TEST IDONEIDAD O PERFIL INVERSOR (IDO)','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(81,9,'6019',' El Test de adecuación e idoneidad no está firmado por el cliente.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(82,9,'9009','El Test de adecuación e idoneidad no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(83,9,'9019','El Test de adecuación e idoneidad no está firmado por el cliente.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(84,9,'9029','El Test de adecuación e idoneidad no tiene cumplimentada la renuncia manuscrita del cliente al asesoramiento.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(85,9,'9039','El Test de adecuación e idoneidad no está completo. Deben responderse todas las preguntas, seleccionar un perfil y las opciones de inversión recomendadas. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(86,10,'652','FALTA DOCUMENTO DOMICILIACION S.E.P.A.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(87,10,'6002','La orden de domiciliacion SEPA no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(88,10,'6012',' La orden de domiciliacion SEPA no está firmada por el cliente.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(89,11,'953',' FALTA FIRMA DEL ASEGURADO/A EN LA SOLICITUD DE SEGURO','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(90,11,'4024','La solicitud de seguro no está firmada por el cliente. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(91,11,'6004','La Póliza de Seguro (o Solicitud de Seguro) no se ha recibido.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(92,11,'6014',' La Póliza de Seguro (o Solicitud de Seguro) no está firmada por el cliente.','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(93,11,'7057','La pregunta de actividad profesional no está respondida en la solicitud de seguro. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0),(94,11,'7087','La pregunta de obligaciones fiscales en el extrajero no está respondida en la solicitud de seguro. ','2024-08-21 23:07:33.265',NULL,'2024-05-08 19:22:39.000',0);
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
  `CompaniaId` int NOT NULL,
  PRIMARY KEY (`MediadorId`),
  KEY `Mediador_CompaniaId_fkey` (`CompaniaId`),
  CONSTRAINT `Mediador_CompaniaId_fkey` FOREIGN KEY (`CompaniaId`) REFERENCES `Compania` (`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26321 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mediador`
--

LOCK TABLES `Mediador` WRITE;
/*!40000 ALTER TABLE `Mediador` DISABLE KEYS */;
INSERT INTO `Mediador` VALUES (1,'Primero ajnjajhnjandjndjndjnd njabdjbd','0',NULL,NULL,'bpmservinform@gmail.com',NULL,NULL,NULL,NULL,0,'2024-09-16 14:49:51.345',NULL,'2024-09-16 14:49:51.345',NULL,1,1),(2,'sengundokajk jakjsknas nas','1',NULL,NULL,'iphoneck2021@gmail.com',NULL,NULL,NULL,NULL,0,'2024-09-16 14:49:51.347',NULL,'2024-09-16 14:49:51.347',NULL,1,2),(3,'Luis najsssas jhasjsn','2',NULL,NULL,'lmunozbe@santaluciasc.es',NULL,NULL,NULL,NULL,0,'2024-09-16 14:52:01.676',NULL,'2024-09-16 14:52:01.676',NULL,1,3),(4,'Nuria najknnx knajkxnx','3',NULL,NULL,'nbernal.troncoso@servinform.es',NULL,NULL,NULL,NULL,0,'2024-09-16 14:53:06.405',NULL,'2024-09-16 14:53:06.405',NULL,1,4),(5,'Carolina najxnjxnjx jakjks','4',NULL,NULL,'carolina.lechuga@santaluciasc.es',NULL,NULL,NULL,NULL,0,'2024-09-17 13:14:26.378',NULL,'2024-09-17 13:14:26.378',NULL,1,2),(6,'Sin Mediador','Sin Mediador',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-09-17 00:35:07.334',NULL,'2024-09-17 00:35:07.334',NULL,1,3);
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
  `FechaOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TipoOperacion` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `CCC` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoPoliza` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoSolicitud` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Compania` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mediador` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MotivoDesechado` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Producto` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`NoprocesarId`)
) ENGINE=InnoDB AUTO_INCREMENT=3170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Producto`
--

LOCK TABLES `Producto` WRITE;
/*!40000 ALTER TABLE `Producto` DISABLE KEYS */;
INSERT INTO `Producto` VALUES (1,1,'4077','ARQUISEGUROS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(2,1,'4239','AVIVA PROTECCIÓN OPTIMA',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(3,1,'4246','VIDA ENTERA',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(4,1,'5036','MAXIPLAN PIAS ASEGURADO',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(5,1,'5037','MAXIPLAN PIAS FONDOS',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(6,1,'5038','MAXIPLAN PENSIÓN GARANTIZADA PPA III ',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(7,1,'5039','MAXIPLAN Dinero Seguro ',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(8,1,'5040','MAXIPLAN Inversión Futura ',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(9,1,'5041','MAXIPLAN Inversión Dinámica ',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(10,1,'5047','Maxi Plan Inversión Premium',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(11,1,'5048','MAXIPLAN PIAS Cestas',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(12,1,'5049','MAXIMPLAN INVERSION CESTAS',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(13,1,'5053','MAXIPLAN Inver. Personal',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(14,1,'5054','Maxiplan Pias Inversión Personalizada',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(15,1,'5071','MAXIPLAN PIAS SELECCIÓN DINAMICA',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(16,1,'5072','MAXIPLAN SELECCIÓN DINAMICA',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(17,1,'5076','Maxiplan Inversión Premium 2',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(18,1,'6001','ACCIDENTES BASICO',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(19,1,'6002','ACCIDENTES PREFERENTE',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(20,1,'6003','ACCIDENTES PREMIUM',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(21,3,'AC03','FIDELIS ASOC. AH',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(22,3,'AE12','UNIVIDA AHORRO INVERSION',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(23,3,'AE22','UNIVIDA AHORRO INVERSION II',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(24,3,'AE32','UNIVIDA AHORRO INVERSION III',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(25,2,'AESP','Santalucía VP Espabolsa PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(26,3,'AG02','UNIVIDA AHORRO FISCAL',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(27,3,'AG03','SEG. AHORRO FUTURO 5',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(28,3,'AL03','RENTAESPAÑA ELEC. II',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(29,3,'AL13','RENTAESPAÑA ELECCIÓN',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(30,3,'AP02','UNIVIDA AHORRO ASEGURADO',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(31,2,'APRO','Santalucia VP Retorno Absoluto',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(32,3,'AQ02','UNIVIDA AHORRO INFANTIL',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(33,3,'AQ03','AHORRO ESTUDIOS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(34,3,'AR11','AHORRO SEGURO I',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(35,3,'AR12','AHORRO SEGURO II',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(36,3,'AR13','AHORRO SEGURO III',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(37,3,'AR14','ALTA RENTABILIDAD',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(38,3,'AS02','UNIVIDA AHORRO JUBILACIÓN',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(39,3,'AS03','AHORRO ASEGURADO',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(40,3,'AS13','AHORRO INFANTIL C.E',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(41,3,'ASP3','PLAN FIDELIS C.E.',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(42,3,'AT01','ANUALIDADES',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(43,2,'ATRF','SANTALUCIA VIDA EMPLEADOS  RENTA FIJA, P.P.',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(44,2,'ATRV','SANTALUCIA VIDA EMPLEADOS  RENTA VARIABLE, P.P.',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(45,3,'AV03','RENTA PLAN VITALICIO',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(46,3,'AV13','RENTA II PLAN VITALI',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(47,3,'AV23','RENTA ESPEC. VITALI',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(48,3,'AX03','SEGURFONDOS C.ESPAÑA',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(49,3,'AX13','SEGURFONDO GARAN. CE',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(50,3,'AX23','SEGURFONDOS PREMIER',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(51,3,'AXM2','UNIFONDOS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(52,3,'AY02','UNIVIDA AHORRO ELECCIÓN',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(53,3,'AY03','AHORRO ELECCIÓN',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(54,3,'AZ02','RENTA SEGURA UNIPLAN',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(55,3,'AZ03','RENTA ESPAÑA II P.P.',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(56,2,'C101','Santalucía Tu Plan Más Personal 2025',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(57,2,'C201','Santalucía Tu Plan Más Personal 2035',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(58,2,'C301','Santalucía Tu Plan Más Personal 2045',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(59,2,'C401','Santalucía Tu Plan Más Personal 2055',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(60,3,'CE03','AHOR.ESPAÑA ESTUDIOS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(61,3,'CF03','AHORRO ESPAÑA FUTURO',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(62,3,'CJ03','AHOR.ESP. JUBILACION',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(63,3,'CUAN','ANUALIDADES',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(64,3,'CUTC','TEMPORAL CONSTANTE',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(65,3,'CUTF','TAR FAMILIAR',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(66,3,'CUTL','TAR LIBRE',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(67,3,'CUTP','TAR PRESTAMOS',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(68,3,'EC01','VIDA ESP. EMP. CONV.',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(69,3,'EE01','TAR FONDOEMPLEO',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(70,2,'EEUU','Santalucia VP RV USA Élite PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(71,3,'EN02','UNIVIDA ORO',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(72,1,'EPAV','Santalucía VP Mixto Prudente PPSI',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(73,1,'EPJB','Santalucía VP Gestión Decidido PPSI',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(74,1,'EPRF','Santalucía VP Renta Fija PPSI',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(75,3,'ER01','RENTAESPAÑA P.PENS.',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(76,3,'ER02','Renta Asaja Moderado',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(77,3,'ER03','Renta Asaja Medio',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(78,3,'ER04','Renta Asaja Dinámico',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(79,3,'ER05','Renta Asaja Futuresp',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(80,3,'ER06','Renta Agroupa',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(81,3,'ER07','Renta Agroupa Plus',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(82,2,'ESGM','Santalucia VP Gestión Sostenible RVM, PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(83,2,'EURI','Santalucia VP RV Europa Élite PP.',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(84,3,'EX01','TAR AYUNTAM ZAMORA.',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(85,3,'EX02','TAR SEG.COLECTIVOS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(86,2,'GESL','Santalucía Gestión Estable',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(87,2,'GEST','Santalucía VP Gestión Estable',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(88,3,'IN11','AHORRO SEGURO INDICE',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(89,3,'IN12','AHORRO SEGURO INDICE',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(90,1,'0,00 LRD','Maxiplan Rentas',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(91,1,'10,00 LRD','Maxiplan Inversión Rentas, constante',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(92,1,'11,00 LRD','Maxiplan Inversión Rentas, constante',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(93,1,'20,00 LRD','Maxiplan Inversión Rentas, decreciente',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(94,1,'21,00 LRD','Maxiplan Inversión Rentas, decreciente',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(95,1,'LRW00','Maxiplan Inversión Rentas, actuarial',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(96,2,'MUND','Santalucia VP Mundiglobal Euro',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(97,2,'OJ25','Santalucía VP Objetivo Jubilación 2025',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(98,2,'OJ35','Santalucía VP Objetivo Jubilación 2035',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(99,2,'OJ45','Santalucía VP Objetivo Jubilación 2045',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(100,2,'OJ55','Santalucía VP Objetivo Jubilación 2055',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(101,4,'P150','PLV TAR 150',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(102,2,'PAN','Santalucia Panda Prudente PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(103,2,'PAR','Santalucia Pardo Decidido PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(104,3,'PG12','Univida Ahorro Elección PIAS',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(105,3,'PG13','Seguro Ahorro Elección PIAS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(106,3,'PIG2','UNIAHORRO SISTEMÁTICO',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(107,3,'PIG3','AHORROESPAÑA ESTABLE',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(108,4,'PIND','PLV TAR 150 PIND',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(109,3,'PIR2','PENSIÓN INMEDIATA REVALORIZABLE (PIR)',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(110,3,'PIU3','AHORROESPAÑA FLEXI.',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(111,4,'PLVA','PLV PLAN ACTIVO',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(112,4,'PLVB','PLV ESPABOLSA',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(113,4,'PLVE','PLV PLAN EVOLUCION',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(114,4,'PLVF','PLV RENTA FIJA',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(115,4,'PLVS','PLV PLAN ESTABLE',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(116,2,'POL','Santalucia Polar Equilibrado PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(117,3,'PPA3','PLAN PREV. ASEG.',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(118,4,'PPAF','PLV PLAN DE AHORRO FLEXIBLE',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(119,2,'PPGE','Santalucía VP Gestión Decidido PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(120,2,'PPMX','Santalucía VP Mixto Prudente PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(121,4,'PPPA','PLV PLAN PREVISION ASEGURADO',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(122,2,'PPRF','Santalucía VP Renta Fija PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(123,2,'PPRV','Santalucía VP Renta Variable Europa PP',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(124,4,'PRL0','PLV VIDA SEGURO INTEGRAL',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(125,4,'PRL1','PLV SEGURO INTEGRAL',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(126,4,'PRLC','PELAYO VIDA MUJER',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(127,4,'PRM0','PLV SEGURO MODULAR',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','se reactiva 09/10/2023'),(128,4,'PRO0','PLV VIDA SEGURO AMORTIZACION',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(129,4,'PULC0','SEGURO DE APORTACIÓN DEFINIDA',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','NO CONCILIA'),(130,1,'Q4072','PLAN VIDA PROTECCION PERSONAL',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(131,3,'QQQQ','contratos CCM',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(132,2,'QREN','ANOIA FUTUR',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(133,3,'RD02','Unirentas Mixto',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(134,3,'RD03','Unirentas Mixto',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(135,3,'RD12','Unirentas Capital',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(136,3,'RD13','Unirentas Capital',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(137,3,'RD22','Unirentas Patrimonio 50',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(138,3,'RE02','SEGURO DE VIDA LIBRE PYMES',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(139,3,'RE03','VIDA RIESGO PYMES',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(140,3,'RI03','SEGURO INVALIDEZ',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(141,3,'RK02','SEGURO DE ACCIDENTES',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(142,3,'RK12','PLAN DE PROTECCIÓN FAMILIAR (Aplicalia)',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(143,4,'RL00','PLV SEGURO INTEGRAL',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(144,3,'RL02','UNIVIDA ANUAL RENOVABLE',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(145,3,'RL03','LIBRE',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(146,3,'RL12','UNIVIDA ANUAL RENOVABLE NO RESIDENTES',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(147,3,'RL13','RIESGO LIBRE NO RESI',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(148,3,'RL23','SEGURO VIDA MUJER',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(149,3,'RL33','SEGURO VIDA HOMBRE ENFERMEDAD 3C',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(150,4,'RLC0','PELAYO VIDA MUJER',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(151,4,'RLM0','PLV SEGURO MODULAR',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','se reactiva 09/10/2023'),(152,3,'RM02','UNIVIDA ANUAL RENOVABLE 45',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(153,3,'RM03','VIDAESPAÑA 45',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(154,3,'RN02','COLECTIVOS DE ACCIDENTES',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(155,4,'RO00','PLV SEGURO AMORTIZACION',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(156,3,'RO02','SEGURO CRÉDITOS HIPOTECARIOS',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(157,3,'RO03','PTMO HIPOTECARIO',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(158,3,'RO12','SEGURO CRÉDITOS HIPOTECARIOS NO RESIDENTES',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(159,3,'RO13','FINANCIACION NO RESI',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(160,3,'RP02','SEGURO CRÉDITOS PERSONALES',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','10/01/2023 deja de comercializarse'),(161,3,'RP03','PTMO PERSONAL',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(162,3,'RP12','Seguro Créditos Personales Anual',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(163,3,'RT02','SEGURO HIPOTECARIO PLUS 10',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','10/01/2023 deja de comercializarse'),(164,3,'RT12','Seguro Créditos Hipotecarios Mixto',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(165,3,'RT13','SEG.TEMPORAL - A.R.',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(166,3,'RU03','RIESGO HIPOTECARIO',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(167,3,'RW02','Unirentas Pensión Vitalicia',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(168,3,'RW03','Unirentas Pensión Vitalicia',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(169,3,'RW22','Unirentas Pensión Vitalicia 22',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','GDA'),(170,3,'SD02','SAFA (automatizado)',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(171,3,'SD2M','SAFA (manual)',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(172,2,'SL10','SANTA LUCIA FONDO X, F.P',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(173,3,'SM02','SAFA-RENTAS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(174,3,'SR02','SEGURO DE RENTAS (automatizado)',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(175,3,'SR2M','SEGURO DE RENTAS (manual)',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(176,1,'SULC0','SEGURO DE APORTACIÓN DEFINIDA',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','NO CONCILIA'),(177,3,'TC01','TEMPORAL CONSTANTE',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(178,1,'U4071','TAR INDIVIDUAL U4071',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(179,3,'UL11','MULTIFONDOS I',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(180,3,'UL12','MULTIFONDOS II',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(181,3,'UR01','UNIPLAN RENTAS ASEGURADAS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(182,3,'UX01','TAR COLECTIVOS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(183,3,'UX02','TAR COLECTIVOS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(184,3,'UX03','TAR COLECTIVOS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(185,3,'UX04','TAR EXTERIORIZACIÓN UNICAJA',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(186,3,'UX05','TAR COLECTIVOS ABIERTO',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(187,1,'V4071','PLAN VIDA INTEGRAL',1,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(188,3,'VC03','RENTA VITALICIA PLUS',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(189,3,'VR03','RENTA ESPAÑA P.V.',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296','14/10/2019 SE ANADEN LOS DE CEV'),(190,3,'ZZZZ','contratos liberbank',0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',''),(191,5,'Sin Producto',NULL,0,1,'2024-08-21 23:07:33.296',NULL,'2024-08-21 23:07:33.296',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=571 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductoDocumento`
--

LOCK TABLES `ProductoDocumento` WRITE;
/*!40000 ALTER TABLE `ProductoDocumento` DISABLE KEYS */;
INSERT INTO `ProductoDocumento` VALUES (1,1,8,NULL,NULL,NULL,1,'CON',0,'2024-08-21 23:07:33.308',NULL),(2,2,8,NULL,NULL,NULL,1,'CON',0,'2024-08-21 23:07:33.308',NULL),(3,3,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(4,3,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(5,3,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(6,3,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(7,4,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(8,4,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(9,4,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(10,5,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(11,5,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(12,5,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(13,5,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(14,5,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(15,6,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(16,6,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(17,7,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(18,7,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(19,7,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(20,8,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(21,8,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(22,8,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(23,8,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(24,8,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(25,9,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(26,9,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(27,9,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(28,9,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(29,9,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(30,10,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(31,10,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(32,10,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(33,10,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(34,10,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(35,10,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(36,11,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(37,11,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(38,11,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(39,11,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(40,11,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(41,11,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(42,12,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(43,12,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(44,12,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(45,12,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(46,12,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(47,12,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(48,13,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(49,13,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(50,13,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(51,13,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(52,13,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(53,13,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(54,14,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(55,14,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(56,14,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(57,14,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(58,14,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(59,14,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(60,15,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(61,15,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(62,15,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(63,15,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(64,15,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(65,15,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(66,16,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(67,16,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(68,16,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(69,16,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(70,16,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(71,16,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(72,17,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(73,17,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(74,17,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(75,17,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(76,17,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(77,18,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(78,18,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(79,19,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(80,19,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(81,19,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(82,20,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(83,20,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(84,20,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(85,25,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(86,25,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(87,25,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(88,31,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(89,31,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(90,31,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(91,43,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(92,43,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(93,43,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(94,44,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(95,44,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(96,44,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(97,56,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(98,56,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(99,56,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(100,57,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(101,57,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(102,57,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(103,58,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(104,58,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(105,58,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(106,59,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(107,59,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(108,59,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(109,70,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(110,70,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(111,70,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(112,72,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(113,72,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(114,73,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(115,73,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(116,74,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(117,74,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(118,82,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(119,82,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(120,82,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(121,83,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(122,83,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(123,83,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(124,86,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(125,86,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(126,86,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(127,87,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(128,87,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(129,87,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(130,95,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(131,95,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(132,95,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(133,95,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(134,95,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(135,96,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(136,96,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(137,96,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(138,97,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(139,97,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(140,97,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(141,98,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(142,98,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(143,98,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(144,99,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(145,99,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(146,99,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(147,100,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(148,100,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(149,100,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(150,102,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(151,102,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(152,102,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(153,103,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(154,103,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(155,103,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(156,116,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(157,116,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(158,116,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(159,119,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(160,119,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(161,119,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(162,120,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(163,120,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(164,120,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(165,122,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(166,122,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(167,122,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(168,123,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(169,123,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(170,123,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(171,130,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(172,130,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(173,130,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(174,130,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(175,172,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(176,172,7,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(177,172,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(178,178,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(179,178,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(180,178,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(181,178,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(182,187,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(183,187,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(184,187,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(185,187,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(186,101,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(187,101,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(188,101,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(189,101,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(190,108,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(191,108,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(192,108,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(193,108,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(194,118,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(195,118,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(196,118,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(197,121,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(198,121,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(199,121,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(200,124,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(201,124,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(202,124,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(203,124,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(204,125,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(205,125,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(206,125,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(207,125,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(208,126,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(209,126,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(210,126,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(211,126,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(212,127,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(213,127,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(214,127,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(215,127,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(216,128,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(217,128,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(218,128,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(219,128,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(220,143,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(221,143,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(222,143,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(223,143,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(224,150,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(225,150,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(226,150,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(227,150,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(228,151,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(229,151,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(230,151,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(231,151,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(232,155,3,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(233,155,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(234,155,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(235,155,8,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(236,22,1,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(237,22,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(238,22,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(239,22,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(240,22,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(241,23,1,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(242,23,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(243,23,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(244,23,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(245,23,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(246,24,1,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(247,24,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(248,24,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(249,24,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(250,24,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(251,26,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(252,26,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(253,32,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(254,32,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(255,32,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(256,32,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(257,38,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(258,38,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(259,38,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(260,40,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(261,40,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(262,40,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(263,50,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(264,50,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(265,50,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(266,51,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(267,51,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(268,51,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(269,52,1,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(270,52,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(271,52,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(272,52,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(273,52,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(274,52,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(275,53,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(276,62,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(277,62,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(278,65,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(279,65,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(280,65,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(281,66,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(282,66,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(283,66,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(284,67,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(285,67,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(286,67,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(287,104,1,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(288,104,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(289,104,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(290,104,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(291,104,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(292,104,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(293,106,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(294,106,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(295,106,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(296,133,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(297,133,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(298,133,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(299,135,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(300,135,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(301,135,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(302,136,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(303,136,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(304,136,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(305,137,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(306,137,6,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(307,137,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(308,138,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(309,138,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(310,138,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(311,138,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(312,139,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(313,139,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(314,139,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(315,139,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(316,140,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(317,140,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(318,140,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(319,141,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(320,141,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(321,141,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(322,144,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(323,144,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(324,144,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(325,144,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(326,145,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(327,145,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(328,145,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(329,145,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(330,146,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(331,146,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(332,146,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(333,146,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(334,148,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(335,148,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(336,148,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(337,148,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(338,152,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(339,152,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(340,152,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(341,152,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(342,153,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(343,153,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(344,153,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(345,153,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(346,154,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(347,154,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(348,154,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(349,156,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(350,156,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(351,156,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(352,156,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(353,157,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(354,157,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(355,157,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(356,157,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(357,158,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(358,158,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(359,158,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(360,158,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(361,160,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(362,160,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(363,160,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(364,161,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(365,161,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(366,161,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(367,162,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(368,162,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(369,162,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(370,163,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(371,163,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(372,163,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(373,163,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(374,164,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(375,164,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(376,164,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(377,165,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(378,165,5,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(379,165,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(380,165,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(381,167,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(382,167,10,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(383,167,11,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(384,169,4,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(385,169,9,NULL,NULL,NULL,1,'CON',1,'2024-08-21 23:07:33.308',NULL),(386,1,8,NULL,NULL,NULL,1,'PRECON',0,'2024-08-21 23:07:33.308',NULL),(387,2,8,NULL,NULL,NULL,1,'PRECON',0,'2024-08-21 23:07:33.308',NULL),(388,3,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(389,3,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(390,3,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(391,3,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(392,4,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(393,4,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(394,4,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(395,5,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(396,5,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(397,5,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(398,5,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(399,5,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(400,6,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(401,6,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(402,7,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(403,7,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(404,7,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(405,8,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(406,8,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(407,8,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(408,8,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(409,8,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(410,9,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(411,9,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(412,9,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(413,9,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(414,9,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(415,10,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(416,10,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(417,10,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(418,10,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(419,10,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(420,10,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(421,11,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(422,11,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(423,11,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(424,11,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(425,11,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(426,11,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(427,12,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(428,12,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(429,12,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(430,12,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(431,12,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(432,12,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(433,13,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(434,13,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(435,13,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(436,13,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(437,13,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(438,13,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(439,14,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(440,14,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(441,14,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(442,14,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(443,14,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(444,14,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(445,15,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(446,15,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(447,15,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(448,15,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(449,15,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(450,15,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(451,16,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(452,16,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(453,16,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(454,16,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(455,16,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(456,16,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(457,17,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(458,17,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(459,17,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(460,17,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(461,17,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(462,18,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(463,18,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(464,19,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(465,19,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(466,19,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(467,20,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(468,20,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(469,20,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(470,25,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(471,25,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(472,25,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(473,31,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(474,31,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(475,31,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(476,43,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(477,43,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(478,43,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(479,44,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(480,44,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(481,44,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(482,56,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(483,56,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(484,56,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(485,57,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(486,57,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(487,57,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(488,58,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(489,58,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(490,58,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(491,59,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(492,59,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(493,59,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(494,70,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(495,70,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(496,70,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(497,72,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(498,72,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(499,73,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(500,73,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(501,74,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(502,74,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(503,82,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(504,82,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(505,82,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(506,83,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(507,83,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(508,83,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(509,86,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(510,86,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(511,86,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(512,87,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(513,87,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(514,87,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(515,95,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(516,95,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(517,95,6,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(518,95,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(519,95,9,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(520,96,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(521,96,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(522,96,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(523,97,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(524,97,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(525,97,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(526,98,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(527,98,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(528,98,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(529,99,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(530,99,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(531,99,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(532,100,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(533,100,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(534,100,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(535,102,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(536,102,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(537,102,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(538,103,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(539,103,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(540,103,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(541,116,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(542,116,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(543,116,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(544,119,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(545,119,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(546,119,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(547,120,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(548,120,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(549,120,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(550,122,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(551,122,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(552,122,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(553,123,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(554,123,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(555,123,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(556,130,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(557,130,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(558,130,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(559,130,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(560,172,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(561,172,7,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(562,172,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(563,178,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(564,178,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(565,178,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(566,178,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(567,187,3,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(568,187,4,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(569,187,5,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL),(570,187,8,NULL,NULL,NULL,1,'PRECON',1,'2024-08-21 23:07:33.308',NULL);
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
INSERT INTO `ProductoTipoOperacion` VALUES (1,1,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(2,2,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(3,3,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(4,4,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(5,5,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(6,6,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(7,7,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(8,8,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(9,9,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(10,10,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(11,11,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(12,12,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(13,13,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(14,14,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(15,15,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(16,16,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(17,17,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(18,18,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(19,19,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(20,20,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(21,21,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(22,22,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(23,23,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(24,24,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(25,25,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(26,26,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(27,27,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(28,28,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(29,29,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(30,30,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(31,31,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(32,32,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(33,33,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(34,34,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(35,35,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(36,36,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(37,37,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(38,38,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(39,39,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(40,40,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(41,41,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(42,42,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(43,43,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(44,44,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(45,45,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(46,46,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(47,47,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(48,48,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(49,49,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(50,50,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(51,51,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(52,52,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(53,53,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(54,54,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(55,55,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(56,56,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(57,57,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(58,58,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(59,59,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(60,60,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(61,61,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(62,62,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(63,63,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(64,64,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(65,65,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(66,66,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(67,67,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(68,68,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(69,69,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(70,70,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(71,71,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(72,72,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(73,73,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(74,74,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(75,75,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(76,76,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(77,77,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(78,78,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(79,79,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(80,80,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(81,81,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(82,82,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(83,83,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(84,84,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(85,85,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(86,86,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(87,87,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(88,88,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(89,89,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(90,90,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(91,91,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(92,92,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(93,93,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(94,94,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(95,95,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(96,96,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(97,97,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(98,98,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(99,99,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(100,100,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(101,101,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(102,102,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(103,103,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(104,104,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(105,105,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(106,106,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(107,107,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(108,108,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(109,109,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(110,110,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(111,111,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(112,112,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(113,113,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(114,114,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(115,115,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(116,116,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(117,117,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(118,118,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(119,119,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(120,120,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(121,121,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(122,122,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(123,123,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(124,124,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(125,125,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(126,126,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(127,127,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(128,128,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(129,129,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(130,130,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(131,131,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(132,132,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(133,133,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(134,134,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(135,135,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(136,136,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(137,137,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(138,138,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(139,139,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(140,140,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(141,141,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(142,142,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(143,143,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(144,144,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(145,145,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(146,146,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(147,147,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(148,148,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(149,149,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(150,150,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(151,151,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(152,152,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(153,153,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(154,154,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(155,155,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(156,156,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(157,157,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(158,158,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(159,159,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(160,160,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(161,161,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(162,162,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(163,163,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(164,164,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(165,165,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(166,166,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(167,167,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(168,168,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(169,169,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(170,170,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(171,171,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(172,172,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(173,173,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(174,174,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(175,175,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(176,176,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(177,177,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(178,178,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(179,179,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(180,180,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(181,181,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(182,182,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(183,183,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(184,184,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(185,185,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(186,186,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(187,187,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(188,188,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(189,189,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL),(190,190,NULL,NULL,'Alta',1,'2024-08-21 23:07:33.314','2024-08-21 23:07:33.314',NULL);
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
INSERT INTO `Rol` VALUES (1,'ADMIN','2024-09-02 12:09:53.587',NULL,'2024-09-02 12:09:53.587',1),(2,'MONITOR','2024-09-02 12:09:53.592',NULL,'2024-09-02 12:09:53.592',1),(3,'BASE','2024-09-02 12:09:53.594',NULL,'2024-09-02 12:09:53.594',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoConciliacion`
--

LOCK TABLES `TipoConciliacion` WRITE;
/*!40000 ALTER TABLE `TipoConciliacion` DISABLE KEYS */;
INSERT INTO `TipoConciliacion` VALUES (1,'actualización de histórico','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(2,'por grabación carga GDA','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(3,'conciliado GDA','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(4,'Por Volcado (CCC)','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(5,'Por Volcado (Póliza)','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(6,'Por Fichero Tableta (CCC)','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(7,'Por Fichero Tableta (Propuesta NP)','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(8,'Por Grabación AvivaBancos (CCC)','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(9,'Por Grabación AvivaBancos (Póliza)','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(10,'Por Grabación AvivaBancos (Póliza NP)','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(11,'Por Grabación AvivaBancos (Propuesta NP)','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(12,'Por Grabación AvivaBancos (Ramo+Propuesta 1+2+3)','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(13,'MANUAL','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(14,'Carga previa','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1),(15,'Firma digital','2024-08-21 23:07:33.354',NULL,'2024-05-27 19:03:47.000',1);
/*!40000 ALTER TABLE `TipoConciliacion` ENABLE KEYS */;
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
INSERT INTO `Usuario` VALUES (1,'Iván','$2b$10$k6z6PA25Vyg5nnmMtaS1ZODc6riP9zCWI4X/La.y.fH1xxaU.XbL.',NULL,1,'0000','2024-09-02 12:09:53.668',NULL,'2024-09-02 12:09:53.668','2024-09-02 12:09:53.668',1),(2,'Sistema','$2b$10$PrvNr4isd6rEmeuZUvDk8.t0om9KhXXcyq9SkA.HweIgF7sW1zFky',NULL,1,'0001','2024-09-02 12:09:53.741',NULL,'2024-09-02 12:09:53.741','2024-09-02 12:09:53.741',1),(3,'Luis Muñoz Benito','$2b$10$wHd8JsPct1ad2NLdD/iya.6AdZ5NVoVvcyL08gaD5deZMFs0WMuCa',NULL,3,'lmb_base','2024-09-02 12:09:53.815',NULL,'2024-09-02 12:09:53.815','2024-09-02 12:09:53.815',1),(4,'Luis Muñoz Benito','$2b$10$EdL9bqRLgKwBXImz9JArGu8aYHknfT5icwjrebP6BkbD26vj74yr2',NULL,2,'lmb_monitor','2024-09-02 12:09:53.880',NULL,'2024-09-02 12:09:53.880','2024-09-02 12:09:53.880',1),(5,'Luis Muñoz Benito','$2b$10$KNPvxTCp2IzQ/JEYulNWFOJkOhFqIZZFKDECTIrE/Df7gqb7v/BjS',NULL,1,'lmb_admin','2024-09-02 12:09:53.944',NULL,'2024-09-02 12:09:53.944','2024-09-02 12:09:53.944',1),(6,'Sebastián Torres Guzmán','$2b$10$x3NmahLejmr4h6QjkYZbZOsjqvTSG3dEEPR6lyknYhDP.w83y.tyC',NULL,3,'stg_base','2024-09-02 12:09:54.009',NULL,'2024-09-02 12:09:54.009','2024-09-02 12:09:54.009',1),(7,'Sebastián Torres Guzmán','$2b$10$MfDjvxttRhvj6ZoSJ/vgrelmClJy.1zWzOAThmRxXYOV.lO/pN/eK',NULL,2,'stg_monitor','2024-09-02 12:09:54.073',NULL,'2024-09-02 12:09:54.073','2024-09-02 12:09:54.073',1),(8,'Sebastián Torres Guzmán','$2b$10$UaBEhynNl72jQIvlSaikeu0QU2Iu1htg0jRMXHQqxOG83Lhf4Feka',NULL,1,'stg_admin','2024-09-02 12:09:54.138',NULL,'2024-09-02 12:09:54.138','2024-09-02 12:09:54.138',1),(9,'Juan Lora Rodríguez','$2b$10$098lYGTwLM4JDbZxRY95Ne0/5Cwl/m4VsafZ/uS3Yg871CIkn2lWS',NULL,1,'juanlr','2024-09-02 12:09:54.204',NULL,'2024-09-02 12:09:54.204','2024-09-02 12:09:54.204',1),(10,'Moises Cañete Lopez','$2b$10$DjHrbhuRkAa/GRrdV4izSOAs/YMTKDfLuUaYDr7.VWmtAQ7NAtRJS',NULL,1,'moisescl','2024-09-02 12:09:54.269',NULL,'2024-09-02 12:09:54.269','2024-09-02 12:09:54.269',1),(11,'Nuria Lopez Perez','$2b$10$o6H672ZSt84l/R6.tk.LZO3NIc41HNFHNPFKsmZo3ekVtaLagIOnu',NULL,3,'nurialp','2024-09-02 12:09:54.333',NULL,'2024-09-02 12:09:54.333','2024-09-02 12:09:54.333',1),(12,'admin','$2b$10$zWl4edun2EucKw.8tHJtjO/5VvJnfp0xg2T7G/eie4EI1A2jW4cGy',NULL,1,'admin','2024-09-02 12:09:54.397',NULL,'2024-09-02 12:09:54.397','2024-09-02 12:09:54.397',1),(13,'Luis Muñoz','$2b$10$HRdPUyqXg7Z3HAtCWNV/zujvh0fYwhWUAAvkFH2nn1/KHqMyMYWPu',NULL,1,'lmunoz','2024-09-02 12:09:54.461',NULL,'2024-09-02 12:09:54.461','2024-09-02 12:09:54.461',1),(14,'Juan Lora','$2b$10$APtZVmKpVK.uYm5yUy7TWuHlF1cuEFXABmLs8otYDFs7JMjPZGAAe',NULL,2,'jlora','2024-09-02 12:09:54.525',NULL,'2024-09-02 12:09:54.525','2024-09-02 12:09:54.525',1),(15,'Usuario Base','$2b$10$eMO6ck14ijKTHCoqgUQm..XsX8El7Z6fzgoTA6fStAMQSA6AmWbwy',NULL,3,'base','2024-09-02 12:09:54.591',NULL,'2024-09-02 12:09:54.591','2024-09-02 12:09:54.591',1);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-30 15:00:43
