-- CreateTable
CREATE TABLE `User` (
    `uuid` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191),
    `studyDateCount` INTEGER DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User.email_unique`(`email`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardGroup` (
    `guid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `uuid` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`guid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `cuid` INTEGER NOT NULL AUTO_INCREMENT,
    `guid` INTEGER,
    `uuid` INTEGER NOT NULL,
    `text1` VARCHAR(191) NOT NULL,
    `text2` VARCHAR(191) NOT NULL,
    `reviewStage` INTEGER NOT NULL DEFAULT 0,
    `lastReviewResult` INTEGER NOT NULL DEFAULT 0,
    `dateOfReview` INTEGER,
    `dateForNextReview` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CardGroup` ADD FOREIGN KEY (`uuid`) REFERENCES `User`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD FOREIGN KEY (`uuid`) REFERENCES `User`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD FOREIGN KEY (`guid`) REFERENCES `CardGroup`(`guid`) ON DELETE SET NULL ON UPDATE CASCADE;