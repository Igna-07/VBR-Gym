export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export function apiFetch(path: string, init?: RequestInit) {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`
  return fetch(url, { ...init, credentials: 'include' })
}

// Envía JSON y devuelve el cuerpo, o lanza un Error con el mensaje de la API.
export async function apiSend<T = unknown>(path: string, method: string, body?: unknown): Promise<T> {
  const response = await apiFetch(path, { method, headers: body === undefined ? undefined : { 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(Array.isArray(data.message) ? data.message.join(', ') : data.message || 'No se pudo completar la acción.')
  return data as T
}

export const money = (amount: number) => amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
export const shortDate = (date: string | null) => date ? new Date(date).toLocaleDateString('es-AR', { timeZone: 'UTC' }) : '—'
export const METHODS = { CASH: 'Efectivo', TRANSFER: 'Transferencia', MERCADOPAGO: 'Mercado Pago', CARD: 'Tarjeta' } as const
export type Method = keyof typeof METHODS
