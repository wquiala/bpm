-- AlterTable
ALTER TABLE `Contrato` ADD COLUMN `TipoConciliacionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_TipoConciliacionId_fkey` FOREIGN KEY (`TipoConciliacionId`) REFERENCES `TipoConciliacion`(`tipoConciliacioId`) ON DELETE SET NULL ON UPDATE CASCADE;
