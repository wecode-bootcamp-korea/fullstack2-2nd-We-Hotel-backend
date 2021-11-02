/*
  Warnings:

  - You are about to drop the `dates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reserved_dates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms_stocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `reserved_dates` DROP FOREIGN KEY `reserved_dates_dates_id_fkey`;

-- DropForeignKey
ALTER TABLE `reserved_dates` DROP FOREIGN KEY `reserved_dates_stocks_id_fkey`;

-- DropForeignKey
ALTER TABLE `rooms_stocks` DROP FOREIGN KEY `rooms_stocks_rooms_id_fkey`;

-- DropForeignKey
ALTER TABLE `rooms_stocks` DROP FOREIGN KEY `rooms_stocks_stocks_id_fkey`;

-- DropTable
DROP TABLE `dates`;

-- DropTable
DROP TABLE `reserved_dates`;

-- DropTable
DROP TABLE `rooms_stocks`;

-- DropTable
DROP TABLE `stocks`;
