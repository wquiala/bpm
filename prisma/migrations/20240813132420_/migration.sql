/*
  Warnings:

  - You are about to alter the column `TipoEnvioCON` on the `Contrato` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(10))` to `VarChar(191)`.
  - You are about to alter the column `TipoEnvioPRECON` on the `HistorialContrato` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to alter the column `TipoEnvioCON` on the `HistorialContrato` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `VarChar(191)`.
  - You are about to alter the column `TipoEnvioPRECON` on the `NoProcesar` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `VarChar(191)`.
  - You are about to alter the column `TipoEnvioCON` on the `NoProcesar` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `VarChar(191)`.
  - Made the column `TipoEnvioPRECON` on table `Contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contrato` MODIFY `TipoEnvioPRECON` VARCHAR(191) NOT NULL,
    MODIFY `TipoEnvioCON` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `HistorialContrato` MODIFY `TipoEnvioPRECON` VARCHAR(191) NULL,
    MODIFY `TipoEnvioCON` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `NoProcesar` MODIFY `TipoEnvioPRECON` VARCHAR(191) NULL,
    MODIFY `TipoEnvioCON` VARCHAR(191) NULL;
