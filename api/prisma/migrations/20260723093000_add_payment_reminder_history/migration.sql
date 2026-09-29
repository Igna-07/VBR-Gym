CREATE TYPE "ReminderType" AS ENUM ('UPCOMING', 'OVERDUE');

CREATE TABLE "PaymentReminderLog" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "type" "ReminderType" NOT NULL,
    "reminderDay" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "whatsappMessageId" TEXT,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentReminderLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PaymentReminderLog_paymentId_type_reminderDay_key"
ON "PaymentReminderLog"("paymentId", "type", "reminderDay");

CREATE INDEX "PaymentReminderLog_reminderDay_type_idx"
ON "PaymentReminderLog"("reminderDay", "type");

ALTER TABLE "PaymentReminderLog"
ADD CONSTRAINT "PaymentReminderLog_paymentId_fkey"
FOREIGN KEY ("paymentId") REFERENCES "Payment"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
