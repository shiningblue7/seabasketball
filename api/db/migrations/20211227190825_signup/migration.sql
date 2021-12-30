-- CreateTable
CREATE TABLE "SignUp" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SignUp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SignUp" ADD CONSTRAINT "SignUp_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignUp" ADD CONSTRAINT "SignUp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
