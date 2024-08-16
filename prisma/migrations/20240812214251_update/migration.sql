/*
  Warnings:

  - You are about to drop the column `ContratoIdH` on the `HistorialContrato` table. All the data in the column will be lost.
  - You are about to drop the column `Estado` on the `HistorialContrato` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `HistorialContrato` DROP FOREIGN KEY `HistorialContrato_ContratoIdH_fkey`;

-- AlterTable
ALTER TABLE `Contrato` MODIFY `TipoOperacion` VARCHAR(191) NULL DEFAULT 'ALTA',
    MODIFY `AnuladoSEfecto` BOOLEAN NULL DEFAULT false,
    MODIFY `DNIAsegurado` VARCHAR(191) NULL,
    MODIFY `NombreAsegurado` VARCHAR(191) NULL,
    MODIFY `DNITomador` VARCHAR(191) NULL,
    MODIFY `NombreTomador` VARCHAR(191) NULL,
    MODIFY `IndicadorFDPRECON` BOOLEAN NULL DEFAULT false,
    MODIFY `Incidencias` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `HistorialContrato` DROP COLUMN `ContratoIdH`,
    DROP COLUMN `Estado`,
    ADD COLUMN `ContratoId` INTEGER NULL,
    ADD COLUMN `EstadoContrato` ENUM('PENDIENTE', 'PENDIENTE_INCIDENCIA', 'SIN_CONCILIAR', 'TRAMITADA', 'ANULADA', 'DESECHADO') NULL;

-- AddForeignKey
ALTER TABLE `HistorialContrato` ADD CONSTRAINT `HistorialContrato_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato`(`ContratoId`) ON DELETE SET NULL ON UPDATE CASCADE;
