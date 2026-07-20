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
    const endOfToday = new Date(); endOfToday.setHours(23, 59, 59, 999)
    await this.prisma.payment.updateMany({ where: { dueDate: { lte: endOfToday }, status: { in: ['PENDING', 'PAID'] } }, data: { status: 'OVERDUE' } })
    return this.prisma.payment.findMany({
      include: { member: { include: { scheduleGroup: true } } },
      orderBy: { member: { name: 'asc' } },
    })
  }

  whatsappStatus() { return { configured: this.whatsapp.isConfigured(), senderNumber: this.whatsapp.senderNumber() } }

  async markPaid(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } })
    if (!payment) throw new NotFoundException('El pago no existe.')
    const year = payment.dueDate.getUTCFullYear()
    const month = payment.dueDate.getUTCMonth()
    const originalDay = payment.dueDate.getUTCDate()
    const lastDayNextMonth = new Date(Date.UTC(year, month + 2, 0)).getUTCDate()
    const nextDueDate = new Date(Date.UTC(year, month + 1, Math.min(originalDay, lastDayNextMonth), 12))

    return this.prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id },
        data: {
          dueDate: nextDueDate,
          status: 'PAID',
          paidAt: new Date(),
          reminderSentAt: null,
          whatsappMessageId: null,
          reminderError: null,
        },
        include: { member: true },
      })
      await tx.member.update({ where: { id: payment.memberId }, data: { dueDate: nextDueDate } })
      return updatedPayment
    })
  }

  async sendReminder(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id }, include: { member: true } })
    if (!payment) throw new NotFoundException('El pago no existe.')
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
    if (!this.whatsapp.isConfigured()) return
    const now = new Date()
    const argentinaHour = Number(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit', hour12: false,
    }).format(now))
    if (argentinaHour < 9) return
    const endOfToday = new Date(now); endOfToday.setUTCHours(23, 59, 59, 999)
    await this.prisma.payment.updateMany({
      where: { dueDate: { lte: endOfToday }, status: { in: ['PENDING', 'PAID'] } },
      data: { status: 'OVERDUE' },
    })
    const duePayments = await this.prisma.payment.findMany({
      where: { dueDate: { lte: endOfToday }, status: { in: ['PENDING', 'OVERDUE'] }, reminderSentAt: null, member: { whatsappAllowed: true } },
      select: { id: true },
    })
    for (const payment of duePayments) {
      try { await this.sendReminder(payment.id) } catch { /* se registra el error para reintentar luego */ }
    }
  }
}
