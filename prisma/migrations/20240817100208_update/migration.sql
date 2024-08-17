/*
  Warnings:

  - The primary key for the `NoProcesar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ContratoHistoryId` on the `NoProcesar` table. All the data in the column will be lost.
  - Added the required column `NoprocesarId` to the `NoProcesar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HistorialContrato` MODIFY `Operacion` ENUM('INSERTADO', 'ACTUALIZADO', 'DESECHADO', 'ELIMINADO', 'ANULADO') NULL;

-- AlterTable
ALTER TABLE `NoProcesar` DROP PRIMARY KEY,
    DROP COLUMN `ContratoHistoryId`,
    ADD COLUMN `NoprocesarId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`NoprocesarId`);
