ALTER TABLE "Payment"
ADD COLUMN "upcomingReminderSentAt" TIMESTAMP(3),
ADD COLUMN "upcomingWhatsappMessageId" TEXT,
ADD COLUMN "upcomingReminderError" TEXT;
