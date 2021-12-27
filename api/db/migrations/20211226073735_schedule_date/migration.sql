/*
  Warnings:

  - Added the required column `scheduleDate` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "scheduleDate" TIMESTAMP(3) NOT NULL;
