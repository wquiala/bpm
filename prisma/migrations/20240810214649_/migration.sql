/*
  Warnings:

  - You are about to drop the column `ContratoId` on the `HistorialContrato` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `HistorialContrato` DROP FOREIGN KEY `HistorialContrato_ContratoId_fkey`;

-- AlterTable
ALTER TABLE `HistorialContrato` DROP COLUMN `ContratoId`,
    ADD COLUMN `ContratoIdH` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `HistorialContrato` ADD CONSTRAINT `HistorialContrato_ContratoIdH_fkey` FOREIGN KEY (`ContratoIdH`) REFERENCES `Contrato`(`ContratoId`) ON DELETE SET NULL ON UPDATE CASCADE;
