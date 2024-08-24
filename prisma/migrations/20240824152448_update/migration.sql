/*
  Warnings:

  - You are about to drop the column `tipoConciliacioId` on the `TipoConciliacion` table. All the data in the column will be lost.
  - Made the column `CodigoPoliza` on table `Contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contrato` MODIFY `CodigoPoliza` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `TipoConciliacion` DROP COLUMN `tipoConciliacioId`;
