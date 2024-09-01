-- AlterTable
ALTER TABLE `IncidenciaDocumento` ADD COLUMN `Incidencia` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `IncidenciaDocumento` ADD CONSTRAINT `IncidenciaDocumento_Incidencia_fkey` FOREIGN KEY (`Incidencia`) REFERENCES `MaestroIncidencias`(`IncidenciaId`) ON DELETE SET NULL ON UPDATE CASCADE;
