import { Injectable } from '@nestjs/common'
import { argentinaDayRange } from '../dates'
import { PrismaService } from '../prisma.service'

@Injectable()
export class NoticesService {
  constructor(private readonly prisma: PrismaService) {}

  async todayReminderSummary() {
    const reminderDay = argentinaDayRange().start
    const reminders = await this.prisma.paymentReminderLog.findMany({
      where: { type: 'OVERDUE', reminderDay },
      include: { payment: { include: { member: { include: { scheduleGroup: true } } } } },
      orderBy: { sentAt: 'desc' },
    })
    const people = reminders.map((reminder) => {
      const { payment } = reminder
      const paid = payment.status === 'PAID' && Boolean(payment.paidAt && payment.paidAt >= reminder.sentAt)
      return {
        id: reminder.id,
        paymentId: payment.id,
        memberName: payment.member.name,
        phone: payment.member.phone,
        schedule: payment.member.scheduleGroup
          ? `${payment.member.scheduleGroup.startTime} — ${payment.member.scheduleGroup.endTime}`
          : 'Sin turno',
        dueDate: reminder.dueDate,
        sentAt: reminder.sentAt,
        paid,
        paidAt: paid ? payment.paidAt : null,
      }
    })
    return {
      date: reminderDay,
      total: people.length,
      paid: people.filter((person) => person.paid).length,
      pending: people.filter((person) => !person.paid).length,
      people,
    }
  }

  async findAll() {
    const payments = await this.prisma.payment.findMany({
      where: { status: { in: ['PENDING', 'PAID', 'OVERDUE'] }, dueDate: { not: null } },
      include: { member: { include: { scheduleGroup: true } } },
      orderBy: { dueDate: 'asc' },
    })
    const now = new Date()
    return payments.flatMap((payment) => {
      if (!payment.dueDate) return []
      const daysOverdue = Math.floor((now.getTime() - payment.dueDate.getTime()) / 86400000)
      const base = {
        paymentId: payment.id,
        memberName: payment.member.name,
        phone: payment.member.phone,
        whatsappAllowed: payment.member.whatsappAllowed,
        dueDate: payment.dueDate,
        schedule: payment.member.scheduleGroup
          ? `${payment.member.scheduleGroup.startTime} — ${payment.member.scheduleGroup.endTime}`
          : 'Sin turno',
      }
      if (payment.reminderError) return [{ ...base, id: `failed-${payment.id}`, type: 'MESSAGE_FAILED', severity: 'HIGH', title: 'Mensaje fallido', detail: payment.reminderError }]
      if (payment.upcomingReminderError) return [{ ...base, id: `upcoming-failed-${payment.id}`, type: 'MESSAGE_FAILED', severity: 'HIGH', title: 'Aviso previo fallido', detail: payment.upcomingReminderError }]
      if (daysOverdue >= 5) return [{ ...base, id: `long-${payment.id}`, type: 'LONG_OVERDUE', severity: 'HIGH', title: 'Pago atrasado hace varios días', detail: `${daysOverdue} días de atraso sin registrar el pago.` }]
      if (daysOverdue >= 0 && payment.member.whatsappAllowed && !payment.reminderSentAt) return [{ ...base, id: `pending-${payment.id}`, type: 'REMINDER_PENDING', severity: 'MEDIUM', title: 'Aviso automático pendiente', detail: 'La cuota venció y el recordatorio todavía no fue enviado.' }]
      return []
    })
  }
}
