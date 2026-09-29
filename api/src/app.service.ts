import { Injectable } from '@nestjs/common'
import { argentinaDayRange, argentinaMonthStart, argentinaTodayInstants } from './dates'
import { PrismaService } from './prisma.service'

const RISK_DAYS = 14

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Profesional Gym API'
  }

  async dashboard() {
    const reminderDay = argentinaDayRange().start
    const today = argentinaTodayInstants()
    const monthStart = argentinaMonthStart()
    const sixMonthsAgo = argentinaMonthStart(5)
    const riskSince = new Date(Date.now() - RISK_DAYS * 24 * 60 * 60 * 1000)

    const [activeMembers, pausedMembers, overduePayments, sentMessages, checkInsToday, newMembers, expected, receipts, atRisk] = await Promise.all([
      this.prisma.member.count({ where: { status: { not: 'SUSPENDED' } } }),
      this.prisma.member.count({ where: { status: 'SUSPENDED' } }),
      this.prisma.payment.count({ where: { status: 'OVERDUE', member: { status: { not: 'SUSPENDED' } } } }),
      this.prisma.paymentReminderLog.count({ where: { type: 'OVERDUE', reminderDay } }),
      this.prisma.checkIn.count({ where: { checkedAt: { gte: today.start, lte: today.end } } }),
      this.prisma.member.count({ where: { createdAt: { gte: monthStart } } }),
      this.prisma.member.aggregate({ _sum: { monthlyFee: true }, where: { status: { not: 'SUSPENDED' } } }),
      this.prisma.paymentReceipt.findMany({ where: { paidAt: { gte: sixMonthsAgo } }, select: { amount: true, method: true, paidAt: true } }),
      // Socios activos, con más de 2 semanas en el gimnasio, que no registran ingreso en 2 semanas.
      this.prisma.member.findMany({
        where: { status: { not: 'SUSPENDED' }, createdAt: { lt: riskSince }, checkIns: { none: { checkedAt: { gte: riskSince } } } },
        select: { id: true, name: true, phone: true, checkIns: { select: { checkedAt: true }, orderBy: { checkedAt: 'desc' }, take: 1 } },
        orderBy: { name: 'asc' },
        take: 20,
      }),
    ])

    const monthly = Array.from({ length: 6 }, (_, index) => {
      const from = argentinaMonthStart(5 - index)
      const to = argentinaMonthStart(4 - index)
      return { month: from.toISOString().slice(0, 7), total: receipts.filter((r) => r.paidAt >= from && r.paidAt < to).reduce((sum, r) => sum + r.amount, 0) }
    })
    const thisMonth = receipts.filter((r) => r.paidAt >= monthStart)
    const byMethod = thisMonth.reduce<Record<string, number>>((acc, r) => ({ ...acc, [r.method]: (acc[r.method] ?? 0) + r.amount }), {})

    return {
      activeMembers,
      pausedMembers,
      overduePayments,
      sentMessages,
      checkInsToday,
      newMembers,
      incomeThisMonth: thisMonth.reduce((sum, r) => sum + r.amount, 0),
      expectedMonthly: expected._sum.monthlyFee ?? 0,
      byMethod,
      monthly,
      atRisk: atRisk.map((member) => ({ id: member.id, name: member.name, phone: member.phone, lastCheckIn: member.checkIns[0]?.checkedAt ?? null })),
    }
  }
}
