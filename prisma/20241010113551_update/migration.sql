-- AlterTable
ALTER TABLE `Compania` ADD COLUMN `CC` VARCHAR(191) NULL,
    ADD COLUMN `MailCopiaOculta` VARCHAR(191) NULL,
    ADD COLUMN `MailRemitente` VARCHAR(191) NULL,
    ADD COLUMN `MailRespuesta` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Producto` ADD COLUMN `Familia` VARCHAR(191) NULL;
