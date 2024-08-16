/*
  Warnings:

  - You are about to drop the column `FechaUltimaModif` on the `MaestroDocumentos` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `MaestroDocumentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MaestroDocumentos` DROP COLUMN `FechaUltimaModif`,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;
