/*
  Warnings:

  - The values [ACTUALIZACION] on the enum `LogAccion_Accion` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `LogAccion` MODIFY `Accion` ENUM('CARGA', 'UPDATE_CARGA', 'INCIDENCIA', 'RECLAMACION', 'CONCILIACION', 'ANULACION') NOT NULL;

-- CreateTable
CREATE TABLE `Anuladas` (
    `anuladasId` INTEGER NOT NULL AUTO_INCREMENT,
    `compannia` VARCHAR(191) NULL,
    `claveOperacion` VARCHAR(191) NULL,
    `fechaEmisionAnulacion` DATETIME(3) NULL,
    `fechaEfectoAnulacion` DATETIME(3) NULL,
    `motivoAnulacion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`anuladasId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
