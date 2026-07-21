import { BadRequestException, Injectable, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { WhatsappService } from './whatsapp.service'

@Injectable()
export class PaymentsService implements OnModuleInit, OnModuleDestroy {
  private reminderTimer?: ReturnType<typeof setInterval>
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

  whatsappStatus() { return { configured: this.whatsapp.isConfigured(), senderNumber: this.whatsapp.senderNumber() } }

  async markPaid(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } })
    if (!payment) throw new NotFoundException('El pago no existe.')
    if (payment.status === 'EXEMPT' || !payment.dueDate) {
      throw new BadRequestException('Los socios promocionados no tienen cuotas para marcar como pagadas.')
    }
    if (payment.status === 'PAID') throw new BadRequestException('Esta cuota ya fue marcada como pagada.')

    return this.prisma.payment.update({
      where: { id },
      data: {
        status: 'PAID',
        paidAt: new Date(),
        reminderSentAt: null,
        whatsappMessageId: null,
        reminderError: null,
      },
      include: { member: true },
    })
  }

  async sendReminder(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id }, include: { member: true } })
    if (!payment) throw new NotFoundException('El pago no existe.')
    if (payment.status === 'EXEMPT' || !payment.dueDate) {
      throw new BadRequestException('Los socios promocionados no reciben avisos de deuda.')
    }
    if (!payment.member.whatsappAllowed) throw new BadRequestException('El socio no autorizó mensajes por WhatsApp.')
    const endOfToday = new Date(); endOfToday.setHours(23, 59, 59, 999)
    if (payment.dueDate > endOfToday) throw new BadRequestException('El aviso se habilita el día del vencimiento.')
    try {
      const messageId = await this.whatsapp.sendPaymentReminder(payment.member.phone, payment.member.name, payment.dueDate)
      return await this.prisma.payment.update({ where: { id }, data: { reminderSentAt: new Date(), whatsappMessageId: messageId, reminderError: null }, include: { member: true } })
    } catch (error) {
      await this.prisma.payment.update({ where: { id }, data: { reminderError: error instanceof Error ? error.message : 'No se pudo enviar.' } })
      throw error
    }
  }

  private async processDueReminders() {
    await this.refreshPaymentStatuses()
    if (!this.whatsapp.isConfigured()) return
    const now = new Date()
    const argentinaHour = Number(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit', hour12: false,
    }).format(now))
    if (argentinaHour < 9) return
    const endOfToday = new Date(now); endOfToday.setHours(23, 59, 59, 999)
    const duePayments = await this.prisma.payment.findMany({
      where: { dueDate: { lte: endOfToday }, status: { in: ['PENDING', 'OVERDUE'] }, reminderSentAt: null, member: { whatsappAllowed: true } },
      select: { id: true },
    })
    for (const payment of duePayments) {
      try { await this.sendReminder(payment.id) } catch { /* se registra el error para reintentar luego */ }
    }
  }

  private async refreshPaymentStatuses() {
    const now = new Date()
    const paidRetentionCutoff = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)
    const paidPayments = await this.prisma.payment.findMany({
      where: { status: 'PAID', paidAt: { lte: paidRetentionCutoff }, dueDate: { not: null } },
      select: { id: true, memberId: true, dueDate: true },
    })

    for (const payment of paidPayments) {
      if (!payment.dueDate) continue
      const nextDueDate = this.nextMonthlyDueDate(payment.dueDate)
      await this.prisma.$transaction(async (tx) => {
        const updated = await tx.payment.updateMany({
          where: { id: payment.id, status: 'PAID', paidAt: { lte: paidRetentionCutoff } },
          data: {
            dueDate: nextDueDate,
            status: 'PENDING',
            paidAt: null,
            reminderSentAt: null,
            whatsappMessageId: null,
            reminderError: null,
          },
        })
        if (updated.count) {
          await tx.member.update({ where: { id: payment.memberId }, data: { dueDate: nextDueDate } })
        }
      })
    }

    const endOfToday = new Date(now); endOfToday.setHours(23, 59, 59, 999)
    await this.prisma.payment.updateMany({
      where: { dueDate: { lte: endOfToday }, status: 'PENDING' },
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
}
