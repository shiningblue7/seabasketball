/*
  Warnings:

  - The primary key for the `AutoCreate` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "AutoCreate" DROP CONSTRAINT "AutoCreate_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AutoCreate_pkey" PRIMARY KEY ("id");
