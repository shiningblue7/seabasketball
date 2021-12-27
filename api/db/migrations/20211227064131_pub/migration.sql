-- DropIndex
DROP INDEX "User_subject_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subject" DROP DEFAULT;
