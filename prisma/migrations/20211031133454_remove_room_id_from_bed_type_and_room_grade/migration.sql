/*
  Warnings:

  - You are about to drop the column `room_id` on the `bed_types` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `room_grades` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bed_types` DROP FOREIGN KEY `bed_types_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `room_grades` DROP FOREIGN KEY `room_grades_room_id_fkey`;

-- AlterTable
ALTER TABLE `bed_types` DROP COLUMN `room_id`;

-- AlterTable
ALTER TABLE `room_grades` DROP COLUMN `room_id`;
