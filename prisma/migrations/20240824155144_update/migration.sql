/*
  Warnings:

  - Made the column `Suplemento` on table `Contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contrato` MODIFY `Suplemento` BOOLEAN NOT NULL DEFAULT false;
