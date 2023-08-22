/*
  Warnings:

  - You are about to drop the column `type` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serialNumber]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serialNumber` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spesification` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagName` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `asset` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `serialNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `spesification` VARCHAR(191) NOT NULL,
    ADD COLUMN `tagName` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `usedBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `type`,
    MODIFY `userId` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Asset_serialNumber_key` ON `Asset`(`serialNumber`);

-- AddForeignKey
ALTER TABLE `Type` ADD CONSTRAINT `Type_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
