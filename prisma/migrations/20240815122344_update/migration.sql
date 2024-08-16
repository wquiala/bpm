/*
  Warnings:

  - The primary key for the `ProductoTipoOperacion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `RamoTipoOpId` on the `ProductoTipoOperacion` table. All the data in the column will be lost.
  - Added the required column `ProductoTipoOpId` to the `ProductoTipoOperacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ProductoDocumento` DROP FOREIGN KEY `ProductoDocumento_ProductoId_fkey`;

-- AlterTable
ALTER TABLE `ProductoTipoOperacion` DROP PRIMARY KEY,
    DROP COLUMN `RamoTipoOpId`,
    ADD COLUMN `ProductoTipoOpId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`ProductoTipoOpId`);

-- AlterTable
ALTER TABLE `Tableta` MODIFY `TipoProducto` VARCHAR(191) NULL,
    MODIFY `TipoSubProducto` VARCHAR(191) NULL,
    MODIFY `NombreComercialProducto` VARCHAR(191) NULL,
    MODIFY `CodigoProducto` VARCHAR(191) NULL,
    MODIFY `CodigoModalidad` VARCHAR(191) NULL,
    MODIFY `CodigoPoliza` VARCHAR(191) NULL,
    MODIFY `CodigoSolicitud` VARCHAR(191) NULL,
    MODIFY `FechaGrabacion` DATETIME(3) NULL,
    MODIFY `DNIAsegurado` VARCHAR(191) NULL,
    MODIFY `NombreAsegurado` VARCHAR(191) NULL,
    MODIFY `NumIdentificacionTo` VARCHAR(191) NULL,
    MODIFY `NombreTo` VARCHAR(191) NULL,
    MODIFY `CodigoMediador` VARCHAR(191) NULL,
    MODIFY `NombreMediador` VARCHAR(191) NULL,
    MODIFY `CodigoSubmediador` VARCHAR(191) NULL,
    MODIFY `NombreSubMediador` VARCHAR(191) NULL,
    MODIFY `CCC` VARCHAR(191) NULL,
    MODIFY `FechaOperacion` DATETIME(3) NULL,
    MODIFY `FechaActualizacion` DATETIME(3) NULL,
    MODIFY `DescOperacion` VARCHAR(191) NULL,
    MODIFY `TipoRegistro` VARCHAR(191) NULL,
    MODIFY `CodigoInternoFormulario` VARCHAR(191) NULL,
    MODIFY `DescFormulario` VARCHAR(191) NULL,
    MODIFY `TipoFirma` ENUM('MANUAL', 'DIGITAL') NULL,
    MODIFY `FechaFirma` DATETIME(3) NULL,
    MODIFY `SituacionFirma` VARCHAR(191) NULL,
    MODIFY `CanalMediador` VARCHAR(191) NULL,
    MODIFY `CanalRecepcionFirma` VARCHAR(191) NULL,
    MODIFY `CodigoCentro` VARCHAR(191) NULL,
    MODIFY `NumActualizaciones` INTEGER NULL,
    MODIFY `Usuario` VARCHAR(191) NULL,
    MODIFY `Conciliar` BOOLEAN NULL,
    MODIFY `FormularioPrincipal` BOOLEAN NULL,
    MODIFY `Observaciones` VARCHAR(191) NULL,
    MODIFY `FechaGeneracion` DATETIME(3) NULL,
    MODIFY `FechaCarga` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `ProductoDocumento` ADD CONSTRAINT `ProductoDocumento_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `ProductoTipoOperacion`(`ProductoTipoOpId`) ON DELETE RESTRICT ON UPDATE CASCADE;
