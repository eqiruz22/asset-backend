-- CreateTable
CREATE TABLE `Divisi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `divisiName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sbuId` INTEGER NOT NULL,

    UNIQUE INDEX `Divisi_divisiName_key`(`divisiName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Divisi` ADD CONSTRAINT `Divisi_sbuId_fkey` FOREIGN KEY (`sbuId`) REFERENCES `Sbu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
