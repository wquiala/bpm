/*
  Warnings:

  - You are about to alter the column `TIPO_ENVIO` on the `FirmaDigital` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `FirmaDigital` MODIFY `AnnoMes` VARCHAR(191) NULL,
    MODIFY `NumPoliza` VARCHAR(191) NULL,
    MODIFY `CodigoPolizaTc` VARCHAR(191) NULL,
    MODIFY `EstadoPoliza` VARCHAR(191) NULL,
    MODIFY `TIPO_ENVIO` VARCHAR(191) NULL,
    MODIFY `Estado` VARCHAR(191) NULL,
    MODIFY `Resultado` VARCHAR(191) NULL,
    MODIFY `FechaInicio` DATETIME(3) NULL,
    MODIFY `FechaCierre` DATETIME(3) NULL,
    MODIFY `Mediador` VARCHAR(191) NULL,
    MODIFY `DNIAsegurado` VARCHAR(191) NULL,
    MODIFY `NombreAsegurado` VARCHAR(191) NULL,
    MODIFY `MovilAsegurado` INTEGER NULL,
    MODIFY `DNITomador` VARCHAR(191) NULL,
    MODIFY `NombreTomador` VARCHAR(191) NULL,
    MODIFY `MovilTomador` INTEGER NULL;
