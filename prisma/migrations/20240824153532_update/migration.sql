/*
  Warnings:

  - Made the column `TipoOperacion` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `CCC` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `NombreAsegurado` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ProfesionAsegurado` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DeporteAsegurado` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DNITomador` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `NombreTomador` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Operador` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TipoEnvioPRECON` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ResultadoFDPRECON` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TipoEnvioCON` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ResultadoFDCON` on table `Contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contrato` MODIFY `TipoOperacion` VARCHAR(191) NOT NULL DEFAULT 'ALTA',
    MODIFY `CCC` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `NombreAsegurado` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `ProfesionAsegurado` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `DeporteAsegurado` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `DNITomador` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `NombreTomador` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `Operador` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `TipoEnvioPRECON` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `ResultadoFDPRECON` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `TipoEnvioCON` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `ResultadoFDCON` VARCHAR(191) NOT NULL DEFAULT '';
