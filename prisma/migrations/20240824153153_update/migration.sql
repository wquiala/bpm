/*
  Warnings:

  - Made the column `CodigoSolicitud` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DNIAsegurado` on table `Contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contrato` MODIFY `CodigoSolicitud` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `DNIAsegurado` VARCHAR(191) NOT NULL DEFAULT '';
