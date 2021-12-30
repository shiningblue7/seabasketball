/*
  Warnings:

  - You are about to drop the column `schedule` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `date` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "schedule",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
