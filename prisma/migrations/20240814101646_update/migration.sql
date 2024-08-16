/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `HistorialContrato` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Contrato` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `HistorialContrato` DROP COLUMN `updatedAt`;
