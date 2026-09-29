import { argentinaDayRange, argentinaMonthStart, argentinaTodayInstants } from './dates'

describe('dates', () => {
  // 01:30 UTC del 1 de octubre = 22:30 del 30 de septiembre en Argentina.
  const lateNight = new Date('2026-10-01T01:30:00Z')

  it('usa el día calendario argentino', () => {
    expect(argentinaDayRange(0, lateNight).start.toISOString()).toBe('2026-09-30T00:00:00.000Z')
    expect(argentinaDayRange(3, lateNight).start.toISOString()).toBe('2026-10-03T00:00:00.000Z')
  })

  it('devuelve los instantes reales del día argentino', () => {
    const { start, end } = argentinaTodayInstants(lateNight)
    expect(start.toISOString()).toBe('2026-09-30T03:00:00.000Z')
    expect(end.toISOString()).toBe('2026-10-01T02:59:59.999Z')
  })

  it('calcula inicios de mes, incluso cruzando el año', () => {
    expect(argentinaMonthStart(0, lateNight).toISOString()).toBe('2026-09-01T03:00:00.000Z')
    expect(argentinaMonthStart(9, lateNight).toISOString()).toBe('2025-12-01T03:00:00.000Z')
  })
})
