/*
  Warnings:

  - You are about to drop the `RamoTipoOperacion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProductoDocumento` DROP FOREIGN KEY `ProductoDocumento_ProductoId_fkey`;

-- DropForeignKey
ALTER TABLE `RamoTipoOperacion` DROP FOREIGN KEY `RamoTipoOperacion_PlantillaConciliacion_fkey`;

-- DropForeignKey
ALTER TABLE `RamoTipoOperacion` DROP FOREIGN KEY `RamoTipoOperacion_PlantillaIncidencia_fkey`;

-- DropForeignKey
ALTER TABLE `RamoTipoOperacion` DROP FOREIGN KEY `RamoTipoOperacion_ProductoId_fkey`;

-- DropTable
DROP TABLE `RamoTipoOperacion`;

-- CreateTable
CREATE TABLE `ProductoTipoOperacion` (
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

-- AddForeignKey
ALTER TABLE `ProductoTipoOperacion` ADD CONSTRAINT `ProductoTipoOperacion_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `Producto`(`ProductoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoTipoOperacion` ADD CONSTRAINT `ProductoTipoOperacion_PlantillaIncidencia_fkey` FOREIGN KEY (`PlantillaIncidencia`) REFERENCES `RepositorioPlantillas`(`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoTipoOperacion` ADD CONSTRAINT `ProductoTipoOperacion_PlantillaConciliacion_fkey` FOREIGN KEY (`PlantillaConciliacion`) REFERENCES `RepositorioPlantillas`(`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoDocumento` ADD CONSTRAINT `ProductoDocumento_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `ProductoTipoOperacion`(`RamoTipoOpId`) ON DELETE RESTRICT ON UPDATE CASCADE;
