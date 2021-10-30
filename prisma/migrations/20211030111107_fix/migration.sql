/*
  Warnings:

  - You are about to drop the `main_sub_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sub_categories` DROP FOREIGN KEY `sub_categories_main_category_id_fkey`;

-- DropTable
DROP TABLE `main_sub_categories`;

-- CreateTable
CREATE TABLE `main_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sub_categories` ADD CONSTRAINT `sub_categories_main_category_id_fkey` FOREIGN KEY (`main_category_id`) REFERENCES `main_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
