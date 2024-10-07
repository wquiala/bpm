/*
  Warnings:

  - You are about to drop the column `CajaLoteId` on the `DocumentoContratoHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DocumentoContratoHistory` DROP COLUMN `CajaLoteId`,
    ADD COLUMN `Caja` INTEGER NULL,
    ADD COLUMN `Lote` INTEGER NULL,
    ADD COLUMN `TipoConciliacion` VARCHAR(191) NULL;
