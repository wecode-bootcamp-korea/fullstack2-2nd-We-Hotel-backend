/*
  Warnings:

  - You are about to drop the column `accomodation_id` on the `accommodations_images` table. All the data in the column will be lost.
  - You are about to drop the column `accomodation_id` on the `clicked_accommodations` table. All the data in the column will be lost.
  - You are about to drop the column `accomodation_id` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `accomodation_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `accomodation_id` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `sosial_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accommodation_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accommodation_id` to the `accommodations_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accommodation_id` to the `clicked_accommodations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accommodation_id` to the `hosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accommodation_id` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accommodation_id` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accommodations` DROP FOREIGN KEY `accommodations_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `accommodations_images` DROP FOREIGN KEY `accommodations_images_accomodation_id_fkey`;

-- DropForeignKey
ALTER TABLE `clicked_accommodations` DROP FOREIGN KEY `clicked_accommodations_accomodation_id_fkey`;

-- DropForeignKey
ALTER TABLE `hosts` DROP FOREIGN KEY `hosts_accomodation_id_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_accomodation_id_fkey`;

-- DropForeignKey
ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_accomodation_id_fkey`;

-- AlterTable
ALTER TABLE `accommodations_images` DROP COLUMN `accomodation_id`,
    ADD COLUMN `accommodation_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `clicked_accommodations` DROP COLUMN `accomodation_id`,
    ADD COLUMN `accommodation_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `hosts` DROP COLUMN `accomodation_id`,
    ADD COLUMN `accommodation_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `likes` DROP COLUMN `accomodation_id`,
    ADD COLUMN `accommodation_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `rooms` DROP COLUMN `accomodation_id`,
    ADD COLUMN `accommodation_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `sosial_id`,
    ADD COLUMN `social_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `categories`;

-- CreateTable
CREATE TABLE `main_sub_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `main_category_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `likes_accommodation_id_key` ON `likes`(`accommodation_id`);

-- AddForeignKey
ALTER TABLE `sub_categories` ADD CONSTRAINT `sub_categories_main_category_id_fkey` FOREIGN KEY (`main_category_id`) REFERENCES `main_sub_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodations` ADD CONSTRAINT `accommodations_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `sub_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodations_images` ADD CONSTRAINT `accommodations_images_accommodation_id_fkey` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_accommodation_id_fkey` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hosts` ADD CONSTRAINT `hosts_accommodation_id_fkey` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_accommodation_id_fkey` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clicked_accommodations` ADD CONSTRAINT `clicked_accommodations_accommodation_id_fkey` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
