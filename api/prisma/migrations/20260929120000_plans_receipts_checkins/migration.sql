-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'TRANSFER', 'MERCADOPAGO', 'CARD');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN "dni" TEXT,
ADD COLUMN "monthlyFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "pausedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX "Member_dni_key" ON "Member"("dni");

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "frequency" "AttendanceFrequency" NOT NULL,
    "exempt" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

CREATE TABLE "PaymentReceipt" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "period" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PaymentReceipt_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PaymentReceipt_paidAt_idx" ON "PaymentReceipt"("paidAt");
ALTER TABLE "PaymentReceipt" ADD CONSTRAINT "PaymentReceipt_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "CheckIn" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "CheckIn_checkedAt_idx" ON "CheckIn"("checkedAt");
CREATE INDEX "CheckIn_memberId_checkedAt_idx" ON "CheckIn"("memberId", "checkedAt");
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed existing plans (prices editable from the panel)
INSERT INTO "Plan" ("id", "name", "price", "frequency", "exempt", "updatedAt") VALUES
  (gen_random_uuid()::text, 'Tres veces por semana', 0, 'THREE_DAYS', false, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'Todos los días', 0, 'DAILY', false, CURRENT_TIMESTAMP),
  (gen_random_uuid()::text, 'Plan libre', 0, 'DAILY', true, CURRENT_TIMESTAMP)
ON CONFLICT ("name") DO NOTHING;
