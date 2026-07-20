WITH ranked_payments AS (
  SELECT "id",
    ROW_NUMBER() OVER (
      PARTITION BY "memberId"
      ORDER BY CASE WHEN "status" = 'PAID' THEN 0 ELSE 1 END, "updatedAt" DESC
    ) AS row_number
  FROM "Payment"
)
DELETE FROM "Payment"
WHERE "id" IN (SELECT "id" FROM ranked_payments WHERE row_number > 1);

DROP INDEX "Payment_memberId_dueDate_key";
CREATE UNIQUE INDEX "Payment_memberId_key" ON "Payment"("memberId");
