-- Enlace privado del portal del socio (se genera para socios existentes)
ALTER TABLE "Member" ADD COLUMN "portalToken" TEXT NOT NULL DEFAULT gen_random_uuid()::text;
CREATE UNIQUE INDEX "Member_portalToken_key" ON "Member"("portalToken");

-- Pago de Mercado Pago que originó el cobro (evita acreditarlo dos veces)
ALTER TABLE "PaymentReceipt" ADD COLUMN "mpPaymentId" TEXT;
CREATE UNIQUE INDEX "PaymentReceipt_mpPaymentId_key" ON "PaymentReceipt"("mpPaymentId");
