/*
  Warnings:

  - A unique constraint covering the columns `[ClaveOperacion]` on the table `Contrato` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ClaveOperacion` on table `Contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contrato` MODIFY `ClaveOperacion` VARCHAR(191) NOT NULL,
    MODIFY `TipoEnvioPRECON` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Contrato_ClaveOperacion_key` ON `Contrato`(`ClaveOperacion`);
