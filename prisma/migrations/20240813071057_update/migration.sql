/*
  Warnings:

  - You are about to alter the column `Operador` on the `Contrato` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(9))` to `VarChar(191)`.
  - You are about to alter the column `Operador` on the `HistorialContrato` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to alter the column `Operador` on the `NoProcesar` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Contrato` MODIFY `Operador` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `HistorialContrato` MODIFY `Operador` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `NoProcesar` MODIFY `Operador` VARCHAR(191) NULL;
