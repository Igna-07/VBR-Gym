export const GYM_TIME_ZONE = 'America/Argentina/Buenos_Aires'
const DAY_MS = 24 * 60 * 60 * 1000
// ponytail: Argentina es UTC-3 fijo (sin horario de verano desde 2009); usar Intl si cambia.
const AR_OFFSET_MS = 3 * 60 * 60 * 1000

// Día calendario en Argentina como etiqueta UTC [00:00Z, 23:59Z]. Se usa para fechas de vencimiento y claves de día.
export function argentinaDayRange(offsetDays = 0, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: GYM_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value)
  const start = new Date(Date.UTC(value('year'), value('month') - 1, value('day') + offsetDays))
  return { start, end: new Date(start.getTime() + DAY_MS - 1) }
}

// Instantes reales en que empieza/termina el día en Argentina. Se usa para timestamps (check-ins, cobros).
export function argentinaTodayInstants(now = new Date()) {
  const start = new Date(argentinaDayRange(0, now).start.getTime() + AR_OFFSET_MS)
  return { start, end: new Date(start.getTime() + DAY_MS - 1) }
}

// Instante real del comienzo del mes en Argentina (monthsAgo = 0 es el mes actual).
export function argentinaMonthStart(monthsAgo = 0, now = new Date()) {
  const { start } = argentinaDayRange(0, now)
  return new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() - monthsAgo, 1) + AR_OFFSET_MS)
}
