/*
  Warnings:

  - You are about to drop the column `FechaUltimaModif` on the `Compania` table. All the data in the column will be lost.
  - Made the column `CompaniaId` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ProductoId` on table `Contrato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `MediadorId` on table `Contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Contrato` DROP FOREIGN KEY `Contrato_CompaniaId_fkey`;

-- DropForeignKey
ALTER TABLE `Contrato` DROP FOREIGN KEY `Contrato_MediadorId_fkey`;

-- DropForeignKey
ALTER TABLE `Contrato` DROP FOREIGN KEY `Contrato_ProductoId_fkey`;

-- DropIndex
DROP INDEX `Compania_Descripcion_key` ON `Compania`;

-- AlterTable
ALTER TABLE `Compania` DROP COLUMN `FechaUltimaModif`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `FechaInicio` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Contrato` MODIFY `CompaniaId` INTEGER NOT NULL,
    MODIFY `ProductoId` INTEGER NOT NULL,
    MODIFY `MediadorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_CompaniaId_fkey` FOREIGN KEY (`CompaniaId`) REFERENCES `Compania`(`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_ProductoId_fkey` FOREIGN KEY (`ProductoId`) REFERENCES `Producto`(`ProductoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_MediadorId_fkey` FOREIGN KEY (`MediadorId`) REFERENCES `Mediador`(`MediadorId`) ON DELETE RESTRICT ON UPDATE CASCADE;
