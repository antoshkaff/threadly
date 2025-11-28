/*
  Warnings:

  - You are about to drop the column `authorAvatarUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorUsername` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorAvatarUrl",
DROP COLUMN "authorName",
DROP COLUMN "authorUsername";
