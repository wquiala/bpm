/*
  Warnings:

  - You are about to alter the column `Estado` on the `HistorialContrato` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to alter the column `Estado` on the `NoProcesar` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `Operacion` on the `NoProcesar` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `HistorialContrato` MODIFY `Estado` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `NoProcesar` MODIFY `Estado` VARCHAR(191) NULL,
    MODIFY `Operacion` VARCHAR(191) NULL;
