/*
  Warnings:

  - You are about to alter the column `errores` on the `Contrato` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/
-- AlterTable
ALTER TABLE `Contrato` MODIFY `errores` JSON NULL;
