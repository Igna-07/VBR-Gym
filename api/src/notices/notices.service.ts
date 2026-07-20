import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class NoticesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const payments = await this.prisma.payment.findMany({
      where: { status: { not: 'PAID' } },
      include: { member: { include: { scheduleGroup: true } } },
      orderBy: { dueDate: 'asc' },
    })
    const now = new Date()
    return payments.flatMap((payment) => {
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
      if (daysOverdue >= 5) return [{ ...base, id: `long-${payment.id}`, type: 'LONG_OVERDUE', severity: 'HIGH', title: 'Pago atrasado hace varios días', detail: `${daysOverdue} días de atraso sin registrar el pago.` }]
      if (daysOverdue >= 0 && payment.member.whatsappAllowed && !payment.reminderSentAt) return [{ ...base, id: `pending-${payment.id}`, type: 'REMINDER_PENDING', severity: 'MEDIUM', title: 'Aviso automático pendiente', detail: 'La cuota venció y el recordatorio todavía no fue enviado.' }]
      return []
    })
  }
}
