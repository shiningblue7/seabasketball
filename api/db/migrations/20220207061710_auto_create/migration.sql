-- CreateTable
CREATE TABLE "AutoCreate" (
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "autoCreateAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutoCreate_pkey" PRIMARY KEY ("scheduledAt")
);

-- CreateIndex
CREATE UNIQUE INDEX "AutoCreate_scheduledAt_key" ON "AutoCreate"("scheduledAt");
