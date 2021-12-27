/*
  Warnings:

  - A unique constraint covering the columns `[subject]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subject" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_subject_key" ON "User"("subject");
