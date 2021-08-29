/*
  Warnings:

  - You are about to drop the column `uid` on the `CardGroup` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `User` table. All the data in the column will be lost.
  - Added the required column `uuid` to the `CardGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CardGroup` DROP FOREIGN KEY `CardGroup_ibfk_1`;

-- AlterTable
ALTER TABLE `CardGroup` DROP COLUMN `uid`,
    ADD COLUMN `uuid` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `uid`,
    ADD COLUMN `uuid` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`uuid`);

-- AddForeignKey
ALTER TABLE `CardGroup` ADD FOREIGN KEY (`uuid`) REFERENCES `User`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
