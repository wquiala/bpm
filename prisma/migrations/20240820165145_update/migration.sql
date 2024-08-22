/*
  Warnings:

  - The values [DIARIO] on the enum `LogCarga_Tipo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `LogCarga` MODIFY `Tipo` ENUM('POLIZA', 'TABLETA', 'DIGITAL', 'ANULADA') NOT NULL;
