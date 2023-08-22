/*
  Warnings:

  - You are about to drop the column `name` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - Added the required column `manufacture` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_userId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `name`,
    DROP COLUMN `price`,
    DROP COLUMN `userId`,
    ADD COLUMN `manufacture` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `roleId` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `creteadAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usedBy` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
