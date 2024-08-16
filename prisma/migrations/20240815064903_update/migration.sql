-- CreateTable
CREATE TABLE `TipoConciliacion` (
    `tipoConciliacioId` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaBaja` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `Activo` BOOLEAN NOT NULL,

    PRIMARY KEY (`tipoConciliacioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
