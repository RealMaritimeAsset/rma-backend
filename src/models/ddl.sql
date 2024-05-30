create database rma;  

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) PRIMARY KEY DEFAULT (UUID()),
    `is_business` BOOLEAN NOT NULL DEFAULT false,
    `business_name` VARCHAR(191) NULL,
    `business_ca` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `address` VARCHAR(191) NOT NULL,
    UNIQUE INDEX `User_address_key`(`address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- CreateTable
CREATE TABLE `Rwa` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `main_id` int NOT NULL,
  `sub_id` int NOT NULL,
  `token_uri` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int NOT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `network` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ipfs_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sold_amount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Rwa_user_id_fkey` (`user_id`),
  KEY `Rwa_ipfs_id_fkey` (`ipfs_id`),
  CONSTRAINT `Rwa_ipfs_id_fkey` FOREIGN KEY (`ipfs_id`) REFERENCES `Ipfs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Rwa_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

-- CreateTable
CREATE TABLE `Ipfs` (
    `id` VARCHAR(191) PRIMARY KEY DEFAULT (UUID()),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `amount` INTEGER NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `company` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `uri` VARCHAR(255) NOT NULL,
    `builder` VARCHAR(255) NOT NULL,
    `weight` INTEGER NOT NULL,
    `expected_date` TIMESTAMP(0) NOT NULL,
    `imo_number` INTEGER NOT NULL,
    `expiration` TIMESTAMP(0) NOT NULL,
    `due_date` TIMESTAMP(0) NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reward` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `business_name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `reward` VARCHAR(191) NOT NULL,
    `rwa_id` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token_amount` INTEGER NOT NULL,
    `rwa_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rwa` ADD CONSTRAINT `Rwa_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rwa` ADD CONSTRAINT `Rwa_ipfs_id_fkey` FOREIGN KEY (`ipfs_id`) REFERENCES `Ipfs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reward` ADD CONSTRAINT `Reward_rwa_id_fkey` FOREIGN KEY (`rwa_id`) REFERENCES `Rwa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_rwa_id_fkey` FOREIGN KEY (`rwa_id`) REFERENCES `Rwa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
