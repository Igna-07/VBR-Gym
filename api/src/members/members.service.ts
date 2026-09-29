import { randomUUID } from 'crypto'
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { argentinaDayRange, argentinaMonthStart, argentinaTodayInstants } from '../dates'
import { PrismaService } from '../prisma.service'
import { CreateMemberDto } from './dto/create-member.dto'

const DAY_MS = 24 * 60 * 60 * 1000

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.member.findMany({
      include: {
        payments: { select: { id: true, status: true } },
        checkIns: { select: { checkedAt: true }, orderBy: { checkedAt: 'desc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async detail(id: string) {
    const member = await this.prisma.member.findUnique({
      where: { id },
      include: {
        scheduleGroup: true,
        payments: true,
        receipts: { orderBy: { paidAt: 'desc' }, take: 24 },
        checkIns: { orderBy: { checkedAt: 'desc' }, take: 30 },
      },
    })
    if (!member) throw new NotFoundException('El socio no existe.')
    return member
  }

  async create(data: CreateMemberDto) {
    const { plan, dueDate, monthlyFee } = await this.resolvePlan(data)
    try {
      return await this.prisma.member.create({
        data: {
          ...this.memberFields(data),
          monthlyFee,
          dueDate,
          payments: { create: { dueDate, status: plan.exempt ? 'EXEMPT' : 'PENDING' } },
        },
      })
    } catch (error) { this.handleUnique(error) }
  }

  async update(id: string, data: CreateMemberDto) {
    const current = await this.prisma.member.findUnique({ where: { id }, include: { payments: true } })
    if (!current) throw new NotFoundException('El socio no existe.')
    const { plan, dueDate, monthlyFee } = await this.resolvePlan(data)
    const payment = current.payments[0]
    const dueChanged = dueDate?.getTime() !== current.dueDate?.getTime()
    const wasExempt = payment?.status === 'EXEMPT'
    try {
      return await this.prisma.$transaction(async (tx) => {
        if (payment && (dueChanged || plan.exempt !== wasExempt)) {
          await tx.payment.update({
            where: { id: payment.id },
            data: { dueDate, status: plan.exempt ? 'EXEMPT' : wasExempt || dueChanged ? 'PENDING' : payment.status },
          })
        }
        return tx.member.update({ where: { id }, data: { ...this.memberFields(data), monthlyFee, dueDate } })
      })
    } catch (error) { this.handleUnique(error) }
  }

  async pause(id: string) {
    const member = await this.prisma.member.findUnique({ where: { id } })
    if (!member) throw new NotFoundException('El socio no existe.')
    if (member.status === 'SUSPENDED') throw new BadRequestException('La cuota ya está pausada.')
    return this.prisma.member.update({ where: { id }, data: { status: 'SUSPENDED', pausedAt: new Date() } })
  }

  // Al reactivar, el vencimiento se corre la misma cantidad de días que estuvo pausado.
  async resume(id: string) {
    const member = await this.prisma.member.findUnique({ where: { id }, include: { payments: true } })
    if (!member) throw new NotFoundException('El socio no existe.')
    if (member.status !== 'SUSPENDED' || !member.pausedAt) throw new BadRequestException('La cuota no está pausada.')
    const pausedDays = Math.floor((Date.now() - member.pausedAt.getTime()) / DAY_MS)
    const dueDate = member.dueDate ? new Date(member.dueDate.getTime() + pausedDays * DAY_MS) : null
    const payment = member.payments[0]
    return this.prisma.$transaction(async (tx) => {
      if (payment && payment.status !== 'EXEMPT') {
        await tx.payment.update({ where: { id: payment.id }, data: { dueDate, status: dueDate && dueDate > argentinaDayRange().end ? 'PENDING' : 'OVERDUE' } })
      }
      return tx.member.update({ where: { id }, data: { status: 'ACTIVE', pausedAt: null, dueDate } })
    })
  }

  // Invalida el enlace anterior del portal (por ejemplo, si el socio lo compartió).
  async regeneratePortalLink(id: string) {
    try {
      return await this.prisma.member.update({ where: { id }, data: { portalToken: randomUUID() }, select: { portalToken: true } })
    } catch (error) {
      if ((error as { code?: string }).code === 'P2025') throw new NotFoundException('El socio no existe.')
      throw error
    }
  }

  // Acepta el QR del portal ("PG:<id>"), un DNI o los últimos dígitos del teléfono.
  async checkIn(query: string) {
    const qrId = query.trim().match(/^PG:([0-9a-f-]{36})$/i)?.[1]
    const digits = query.replace(/\D/g, '')
    if (!qrId && digits.length < 6) throw new BadRequestException('Ingresá un DNI o teléfono válido.')
    const matches = await this.prisma.member.findMany({
      where: qrId ? { id: qrId } : { OR: [{ dni: digits }, { phone: { endsWith: digits.slice(-8) } }] },
      include: { payments: true },
      take: 2,
    })
    if (matches.length === 0) throw new NotFoundException(qrId ? 'El código QR no corresponde a ningún socio.' : 'No encontramos un socio con ese DNI o teléfono.')
    if (matches.length > 1) throw new ConflictException('Hay más de un socio con ese dato. Usá el DNI.')
    const member = matches[0]
    const today = argentinaTodayInstants()
    const alreadyToday = await this.prisma.checkIn.findFirst({ where: { memberId: member.id, checkedAt: { gte: today.start, lte: today.end } } })
    if (!alreadyToday) await this.prisma.checkIn.create({ data: { memberId: member.id } })
    const visitsThisMonth = await this.prisma.checkIn.count({ where: { memberId: member.id, checkedAt: { gte: argentinaMonthStart() } } })
    const access = member.status === 'SUSPENDED' ? 'PAUSED' : member.payments[0]?.status === 'OVERDUE' ? 'OVERDUE' : 'OK'
    return { name: member.name, plan: member.plan, dueDate: member.dueDate, access, alreadyToday: Boolean(alreadyToday), visitsThisMonth }
  }

  async remove(id: string) {
    try {
      return await this.prisma.member.delete({ where: { id } })
    } catch (error) {
      if ((error as { code?: string }).code === 'P2025') throw new NotFoundException('El socio no existe.')
      throw error
    }
  }

  private async resolvePlan(data: CreateMemberDto) {
    const plan = await this.prisma.plan.findUnique({ where: { name: data.plan } })
    if (!plan) throw new BadRequestException('El plan seleccionado no existe.')
    if (!plan.exempt && !data.dueDate) throw new BadRequestException('Indicá la fecha de vencimiento.')
    return {
      plan,
      dueDate: plan.exempt ? null : new Date(`${data.dueDate!.slice(0, 10)}T12:00:00.000Z`),
      monthlyFee: plan.exempt ? 0 : data.monthlyFee ?? plan.price,
    }
  }

  private memberFields(data: CreateMemberDto) {
    return {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email || null,
      dni: data.dni || null,
      plan: data.plan,
      whatsappAllowed: data.whatsappAllowed,
      attendanceFrequency: data.attendanceFrequency,
      attendanceDays: data.attendanceDays,
      scheduleGroupId: data.scheduleGroupId || null,
    }
  }

  private handleUnique(error: unknown): never {
    if ((error as { code?: string }).code === 'P2002') throw new ConflictException('Ya existe un socio con ese teléfono, correo o DNI.')
    throw error
  }
}
