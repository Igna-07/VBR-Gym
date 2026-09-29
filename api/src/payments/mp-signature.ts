import { createHmac, timingSafeEqual } from 'crypto'

// Valida el header x-signature de Mercado Pago: HMAC-SHA256 de "id:<data.id>;request-id:<x-request-id>;ts:<ts>;".
export function validMpSignature(secret: string, signature: string | undefined, requestId: string | undefined, dataId: string) {
  const parts = Object.fromEntries((signature ?? '').split(',').map((part) => part.split('=', 2).map((value) => value.trim())))
  if (!parts.ts || !parts.v1) return false
  const manifest = [dataId && `id:${dataId.toLowerCase()}`, requestId && `request-id:${requestId}`, `ts:${parts.ts}`].filter(Boolean).join(';') + ';'
  const expected = Buffer.from(createHmac('sha256', secret).update(manifest).digest('hex'))
  const received = Buffer.from(parts.v1)
  return expected.length === received.length && timingSafeEqual(expected, received)
}
