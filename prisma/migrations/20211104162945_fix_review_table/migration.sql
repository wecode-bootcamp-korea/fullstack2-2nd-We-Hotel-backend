/*
  Warnings:

  - You are about to alter the column `scores` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(1,1)` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE `reviews` MODIFY `scores` DECIMAL(2, 1) NOT NULL;
