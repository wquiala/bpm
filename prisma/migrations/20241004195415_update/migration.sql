/*
  Warnings:

  - You are about to drop the column `DocumentoId` on the `CajaLote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `CajaLote` DROP FOREIGN KEY `CajaLote_DocumentoId_fkey`;

-- AlterTable
ALTER TABLE `CajaLote` DROP COLUMN `DocumentoId`;

-- AlterTable
ALTER TABLE `DocumentoContrato` ADD COLUMN `CajaLoteId` INTEGER NULL,
    ADD COLUMN `TipoConciliacionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `DocumentoContrato` ADD CONSTRAINT `DocumentoContrato_CajaLoteId_fkey` FOREIGN KEY (`CajaLoteId`) REFERENCES `CajaLote`(`CajaLoteId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoContrato` ADD CONSTRAINT `DocumentoContrato_TipoConciliacionId_fkey` FOREIGN KEY (`TipoConciliacionId`) REFERENCES `TipoConciliacion`(`tipoConciliacionId`) ON DELETE SET NULL ON UPDATE CASCADE;
