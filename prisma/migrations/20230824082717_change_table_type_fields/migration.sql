/*
  Warnings:

  - You are about to drop the column `categoryId` on the `asset` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `asset` DROP FOREIGN KEY `Asset_categoryId_fkey`;

-- AlterTable
ALTER TABLE `asset` DROP COLUMN `categoryId`,
    ADD COLUMN `typeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `type` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Type` ADD CONSTRAINT `Type_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
