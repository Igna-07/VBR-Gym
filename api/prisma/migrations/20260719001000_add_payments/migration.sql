CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "reminderSentAt" TIMESTAMP(3),
    "whatsappMessageId" TEXT,
    "reminderError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Payment_dueDate_status_idx" ON "Payment"("dueDate", "status");
CREATE UNIQUE INDEX "Payment_memberId_dueDate_key" ON "Payment"("memberId", "dueDate");
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "Payment" ("id", "memberId", "dueDate", "updatedAt")
SELECT gen_random_uuid()::text, "id", "dueDate", CURRENT_TIMESTAMP FROM "Member"
ON CONFLICT ("memberId", "dueDate") DO NOTHING;
