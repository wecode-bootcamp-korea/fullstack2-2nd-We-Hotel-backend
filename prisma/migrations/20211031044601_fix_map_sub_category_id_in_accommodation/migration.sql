/*
  Warnings:

  - You are about to drop the column `category_id` on the `accommodations` table. All the data in the column will be lost.
  - Added the required column `sub_category_id` to the `accommodations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accommodations` DROP FOREIGN KEY `accommodations_category_id_fkey`;

-- AlterTable
ALTER TABLE `accommodations` DROP COLUMN `category_id`,
    ADD COLUMN `sub_category_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `accommodations` ADD CONSTRAINT `accommodations_sub_category_id_fkey` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
