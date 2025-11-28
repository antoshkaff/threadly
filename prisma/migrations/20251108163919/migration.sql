/*
  Warnings:

  - Added the required column `authorAvatarUrl` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorUsername` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorAvatarUrl" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "authorUsername" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT NOT NULL;
