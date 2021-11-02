/*
  Warnings:

  - You are about to drop the `clicked_accommodations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `clicked_accommodations` DROP FOREIGN KEY `clicked_accommodations_accommodation_id_fkey`;

-- DropForeignKey
ALTER TABLE `clicked_accommodations` DROP FOREIGN KEY `clicked_accommodations_user_id_fkey`;

-- DropTable
DROP TABLE `clicked_accommodations`;

-- CreateTable
CREATE TABLE `stocks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_available` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms_stocks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stocks_id` INTEGER NOT NULL,
    `rooms_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserved_dates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stocks_id` INTEGER NOT NULL,
    `dates_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(2000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rooms_stocks` ADD CONSTRAINT `rooms_stocks_stocks_id_fkey` FOREIGN KEY (`stocks_id`) REFERENCES `stocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms_stocks` ADD CONSTRAINT `rooms_stocks_rooms_id_fkey` FOREIGN KEY (`rooms_id`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reserved_dates` ADD CONSTRAINT `reserved_dates_stocks_id_fkey` FOREIGN KEY (`stocks_id`) REFERENCES `stocks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reserved_dates` ADD CONSTRAINT `reserved_dates_dates_id_fkey` FOREIGN KEY (`dates_id`) REFERENCES `dates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
