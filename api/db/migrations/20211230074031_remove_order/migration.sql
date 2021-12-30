/*
  Warnings:

  - You are about to drop the column `order` on the `SignUp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `SignUp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SignUp" DROP COLUMN "order";

-- CreateIndex
CREATE UNIQUE INDEX "SignUp_userId_key" ON "SignUp"("userId");
