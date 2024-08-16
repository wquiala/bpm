/*
  Warnings:

  - You are about to drop the column `Incidencias` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `Incidencias` on the `HistorialContrato` table. All the data in the column will be lost.
  - You are about to drop the column `Incidencias` on the `NoProcesar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Contrato` DROP COLUMN `Incidencias`,
    ADD COLUMN `errores` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `HistorialContrato` DROP COLUMN `Incidencias`,
    ADD COLUMN `errores` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `NoProcesar` DROP COLUMN `Incidencias`,
    ADD COLUMN `errores` LONGTEXT NULL;
