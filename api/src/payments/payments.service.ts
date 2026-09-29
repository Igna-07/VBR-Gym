import { BadRequestException, Injectable, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { argentinaDayRange } from '../dates'
import { PrismaService } from '../prisma.service'
import { MarkPaidDto } from './dto/mark-paid.dto'
import { WhatsappService } from './whatsapp.service'

@Injectable()
export class PaymentsService implements OnModuleInit, OnModuleDestroy {
  private reminderTimer?: ReturnType<typeof setInterval>
  private processingReminders = false
  constructor(private readonly prisma: PrismaService, private readonly whatsapp: WhatsappService) {}

  onModuleInit() {
    this.reminderTimer = setInterval(() => void this.processDueReminders(), 60 * 60 * 1000)
    setTimeout(() => void this.processDueReminders(), 5000)
  }

  onModuleDestroy() { if (this.reminderTimer) clearInterval(this.reminderTimer) }

  async findAll() {
    await this.refreshPaymentStatuses()
    return this.prisma.payment.findMany({
      include: { member: { include: { scheduleGroup: true } } },
      orderBy: { member: { name: 'asc' } },
    })
  }

  receipts(from?: string, to?: string) {
    return this.prisma.paymentReceipt.findMany({
      where: { paidAt: { gte: from ? new Date(from) : undefined, lte: to ? new Date(to) : undefined } },
      include: { member: { select: { name: true, phone: true, plan: true } } },
      orderBy: { paidAt: 'desc' },
      take: 500,
    })
  }

  whatsappStatus() { return { configured: this.whatsapp.isConfigured(), senderNumber: this.whatsapp.senderNumber() } }

  // Una cuota se puede cobrar si está impaga o si vence dentro de la próxima semana (pago anticipado).
  canCharge(payment: { status: string; dueDate: Date | null }) {
    if (payment.status === 'EXEMPT' || !payment.dueDate) return false
    return payment.status !== 'PAID' || payment.dueDate <= argentinaDayRange(7).end
  }

  async markPaid(id: string, data: MarkPaidDto, mpPaymentId?: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } })
    if (!payment) throw new NotFoundException('El pago no existe.')
    if (payment.status === 'EXEMPT' || !payment.dueDate) {
      throw new BadRequestException('Los socios promocionados no tienen cuotas para marcar como pagadas.')
    }
    if (!this.canCharge(payment)) throw new BadRequestException('Esta cuota ya fue pagada. La próxima se puede cobrar desde 7 días antes del vencimiento.')

    const nextDueDate = this.nextFutureMonthlyDueDate(payment.dueDate)
    const period = payment.dueDate
    return this.prisma.$transaction(async (tx) => {
      await tx.member.update({ where: { id: payment.memberId }, data: { dueDate: nextDueDate } })
      await tx.paymentReceipt.create({ data: { memberId: payment.memberId, amount: data.amount, method: data.method, period, mpPaymentId } })
      return tx.payment.update({
        where: { id },
        data: {
          dueDate: nextDueDate,
          status: 'PAID',
          paidAt: new Date(),
          upcomingReminderSentAt: null,
          upcomingWhatsappMessageId: null,
          upcomingReminderError: null,
          reminderSentAt: null,
          whatsappMessageId: null,
          reminderError: null,
        },
        include: { member: true },
      })
    })
  }

  async sendReminder(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id }, include: { member: true } })
    if (!payment) throw new NotFoundException('El pago no existe.')
    if (payment.status === 'EXEMPT' || !payment.dueDate) {
      throw new BadRequestException('Los socios promocionados no reciben avisos de deuda.')
    }
    if (!payment.member.whatsappAllowed) throw new BadRequestException('El socio no autorizó mensajes por WhatsApp.')
    if (payment.member.status === 'SUSPENDED') throw new BadRequestException('El socio tiene la cuota pausada.')
    const { start: startOfToday, end: endOfToday } = argentinaDayRange()
    if (payment.dueDate > endOfToday) throw new BadRequestException('El aviso se habilita el día del vencimiento.')
    const alreadySentToday = await this.prisma.paymentReminderLog.findUnique({
      where: {
        paymentId_type_reminderDay: {
          paymentId: payment.id,
          type: 'OVERDUE',
          reminderDay: startOfToday,
        },
      },
    })
    if (alreadySentToday) throw new BadRequestException('El aviso de vencimiento ya fue enviado hoy.')
    try {
      const messageId = await this.whatsapp.sendPaymentReminder(payment.member.phone, payment.member.name, payment.dueDate, payment.member.portalToken)
      return await this.prisma.$transaction(async (tx) => {
        await tx.paymentReminderLog.create({
          data: {
            paymentId: payment.id,
            type: 'OVERDUE',
            reminderDay: startOfToday,
            dueDate: payment.dueDate!,
            whatsappMessageId: messageId,
          },
        })
        return tx.payment.update({
          where: { id },
          data: {
            reminderSentAt: new Date(),
            whatsappMessageId: messageId,
            reminderError: null,
            upcomingReminderError: null,
          },
          include: { member: true },
        })
      })
    } catch (error) {
      await this.prisma.payment.update({ where: { id }, data: { reminderError: error instanceof Error ? error.message : 'No se pudo enviar.' } })
      throw error
    }
  }

  private async processDueReminders() {
    if (this.processingReminders) return
    this.processingReminders = true
    try {
      await this.refreshPaymentStatuses()
      if (!this.whatsapp.isConfigured()) return
      const now = new Date()
      const argentinaHour = Number(new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit', hour12: false,
      }).format(now))
      if (argentinaHour < 9) return

      const today = argentinaDayRange()
      const inThreeDays = argentinaDayRange(3)
      const upcomingPayments = await this.prisma.payment.findMany({
        where: {
          dueDate: { gte: inThreeDays.start, lte: inThreeDays.end },
          status: { in: ['PENDING', 'PAID'] },
          upcomingReminderSentAt: null,
          member: { whatsappAllowed: true, status: { not: 'SUSPENDED' } },
        },
        include: { member: true },
      })
      for (const payment of upcomingPayments) {
        if (!payment.dueDate) continue
        try {
          const messageId = await this.whatsapp.sendUpcomingPaymentReminder(
            payment.member.phone,
            payment.member.name,
            payment.dueDate,
            payment.member.portalToken,
          )
          await this.prisma.$transaction([
            this.prisma.paymentReminderLog.create({
              data: {
                paymentId: payment.id,
                type: 'UPCOMING',
                reminderDay: today.start,
                dueDate: payment.dueDate,
                whatsappMessageId: messageId,
              },
            }),
            this.prisma.payment.update({
              where: { id: payment.id },
              data: {
                upcomingReminderSentAt: new Date(),
                upcomingWhatsappMessageId: messageId,
                upcomingReminderError: null,
              },
            }),
          ])
        } catch (error) {
          await this.prisma.payment.update({
            where: { id: payment.id },
            data: {
              upcomingReminderError: error instanceof Error ? error.message : 'No se pudo enviar el aviso previo.',
            },
          })
        }
      }

      const duePayments = await this.prisma.payment.findMany({
        where: {
          dueDate: { lte: today.end },
          status: { in: ['PENDING', 'OVERDUE'] },
          reminderLogs: { none: { type: 'OVERDUE', reminderDay: today.start } },
          member: { whatsappAllowed: true, status: { not: 'SUSPENDED' } },
        },
        select: { id: true },
      })
      for (const payment of duePayments) {
        try { await this.sendReminder(payment.id) } catch { /* se registra el error para reintentar luego */ }
      }
    } finally {
      this.processingReminders = false
    }
  }

  private async refreshPaymentStatuses() {
    const { end: endOfToday } = argentinaDayRange()
    await this.prisma.payment.updateMany({
      where: { dueDate: { lte: endOfToday }, status: { in: ['PENDING', 'PAID'] }, member: { status: { not: 'SUSPENDED' } } },
      data: { status: 'OVERDUE' },
    })
  }

  private nextMonthlyDueDate(dueDate: Date) {
    const year = dueDate.getUTCFullYear()
    const month = dueDate.getUTCMonth()
    const originalDay = dueDate.getUTCDate()
    const lastDayNextMonth = new Date(Date.UTC(year, month + 2, 0)).getUTCDate()
    return new Date(Date.UTC(year, month + 1, Math.min(originalDay, lastDayNextMonth), 12))
  }

  private nextFutureMonthlyDueDate(dueDate: Date) {
    const { end: endOfToday } = argentinaDayRange()
    let nextDueDate = this.nextMonthlyDueDate(dueDate)
    while (nextDueDate <= endOfToday) nextDueDate = this.nextMonthlyDueDate(nextDueDate)
    return nextDueDate
  }
}
