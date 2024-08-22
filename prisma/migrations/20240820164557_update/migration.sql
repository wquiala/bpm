/*
  Warnings:

  - You are about to drop the column `FechaInicio` on the `Compania` table. All the data in the column will be lost.
  - You are about to drop the column `Cinciliado` on the `DocIncidencia` table. All the data in the column will be lost.
  - You are about to drop the column `FechaUltimaModif` on the `DocIncidencia` table. All the data in the column will be lost.
  - You are about to drop the column `FechaIncidencia` on the `IncidenciaDocumento` table. All the data in the column will be lost.
  - You are about to drop the column `FechaUltimaModif` on the `IncidenciaDocumento` table. All the data in the column will be lost.
  - You are about to drop the column `FechaInicio` on the `MaestroDocumentos` table. All the data in the column will be lost.
  - You are about to drop the column `FechaInicio` on the `MaestroIncidencias` table. All the data in the column will be lost.
  - You are about to drop the column `FechaAlta` on the `Mediador` table. All the data in the column will be lost.
  - You are about to drop the column `FechaUltimaModif` on the `Precios` table. All the data in the column will be lost.
  - You are about to drop the column `FechaAlta` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `FechaUltimaModif` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `FechaInicio` on the `ProductoDocumento` table. All the data in the column will be lost.
  - You are about to drop the column `FechaInicio` on the `ProductoTipoOperacion` table. All the data in the column will be lost.
  - You are about to drop the column `FechaReclamacion` on the `Reclamaciones` table. All the data in the column will be lost.
  - You are about to drop the column `FechaAlta` on the `RepositorioPlantillas` table. All the data in the column will be lost.
  - You are about to drop the column `FechaUltimaModif` on the `RepositorioPlantillas` table. All the data in the column will be lost.
  - You are about to drop the column `FechaAlta` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `fechaInicio` on the `TipoConciliacion` table. All the data in the column will be lost.
  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `DocId` to the `IncidenciaDocumento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_UsuarioId_fkey`;

-- AlterTable
ALTER TABLE `Compania` DROP COLUMN `FechaInicio`,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `DetalleObservacion` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `DocIncidencia` DROP COLUMN `Cinciliado`,
    DROP COLUMN `FechaUltimaModif`,
    ADD COLUMN `Conciliado` BOOLEAN NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `DocumentoContrato` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `FirmaDigital` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `IncidenciaDocumento` DROP COLUMN `FechaIncidencia`,
    DROP COLUMN `FechaUltimaModif`,
    ADD COLUMN `DocId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `MaestroDocumentos` DROP COLUMN `FechaInicio`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `MaestroIncidencias` DROP COLUMN `FechaInicio`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Mediador` DROP COLUMN `FechaAlta`,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `NoProcesar` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Precios` DROP COLUMN `FechaUltimaModif`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Producto` DROP COLUMN `FechaAlta`,
    DROP COLUMN `FechaUltimaModif`,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `ProductoDocumento` DROP COLUMN `FechaInicio`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `ProductoTipoOperacion` DROP COLUMN `FechaInicio`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Reclamaciones` DROP COLUMN `FechaReclamacion`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `RepositorioPlantillas` DROP COLUMN `FechaAlta`,
    DROP COLUMN `FechaUltimaModif`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Rol` DROP COLUMN `FechaAlta`,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Tableta` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `TipoConciliacion` DROP COLUMN `fechaInicio`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `Log`;

-- CreateTable
CREATE TABLE `LogAccion` (
    `LogId` INTEGER NOT NULL AUTO_INCREMENT,
    `UsuarioId` INTEGER NOT NULL,
    `Accion` ENUM('CARGA', 'ACTUALIZACION', 'INCIDENCIA', 'RECLAMACION', 'CONCILIACION', 'ANULACION') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`LogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogCarga` (
    `LogCargaId` INTEGER NOT NULL AUTO_INCREMENT,
    `LogId` INTEGER NOT NULL,
    `Tipo` ENUM('DIARIO', 'TABLETA', 'DIGITAL', 'ANULADA') NOT NULL,
    `TotalRegistros` INTEGER NOT NULL,
    `Insertados` INTEGER NOT NULL,
    `Actualizados` INTEGER NOT NULL,
    `ConError` INTEGER NOT NULL,
    `Details` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`LogCargaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LogAccion` ADD CONSTRAINT `LogAccion_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario`(`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogCarga` ADD CONSTRAINT `LogCarga_LogId_fkey` FOREIGN KEY (`LogId`) REFERENCES `LogAccion`(`LogId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenciaDocumento` ADD CONSTRAINT `IncidenciaDocumento_DocId_fkey` FOREIGN KEY (`DocId`) REFERENCES `MaestroDocumentos`(`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
