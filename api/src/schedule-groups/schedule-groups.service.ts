import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateScheduleGroupDto } from './dto/create-schedule-group.dto'

@Injectable()
export class ScheduleGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.scheduleGroup.findMany({
      where: { active: true },
      include: {
        members: { orderBy: { name: 'asc' } },
      },
      orderBy: { startTime: 'asc' },
    })
  }

  create(data: CreateScheduleGroupDto) {
    return this.prisma.scheduleGroup.create({
      data,
      include: { members: true },
    })
  }

  async addMember(groupId: string, memberId: string, day: string) {
    const validDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    if (!validDays.includes(day)) throw new BadRequestException('El día seleccionado no es válido.')
    const group = await this.prisma.scheduleGroup.findUnique({
      where: { id: groupId },
      include: { members: { where: { attendanceDays: { has: day } }, select: { id: true } } },
    })
    if (!group) throw new NotFoundException('El turno no existe.')
    if (group.members.length >= group.capacity) throw new BadRequestException(`El turno del ${day.toLowerCase()} ya alcanzó su cupo.`)

    const member = await this.prisma.member.findUnique({ where: { id: memberId }, select: { attendanceDays: true } })
    if (!member) throw new NotFoundException('El socio no existe.')
    if (!member.attendanceDays.includes(day)) throw new BadRequestException(`El socio no tiene ${day.toLowerCase()} entre sus días de asistencia.`)

    await this.prisma.member.update({ where: { id: memberId }, data: { scheduleGroupId: groupId } })
    return this.prisma.scheduleGroup.findUnique({
      where: { id: groupId },
      include: { members: { orderBy: { name: 'asc' } } },
    })
  }

  removeMember(groupId: string, memberId: string) {
    return this.prisma.member.updateMany({
      where: { id: memberId, scheduleGroupId: groupId },
      data: { scheduleGroupId: null },
    })
  }

  async remove(id: string) {
    const group = await this.prisma.scheduleGroup.findUnique({ where: { id } })
    if (!group) throw new NotFoundException('El turno no existe.')

    return this.prisma.$transaction(async (tx) => {
      await tx.member.updateMany({ where: { scheduleGroupId: id }, data: { scheduleGroupId: null } })
      return tx.scheduleGroup.update({ where: { id }, data: { active: false } })
    })
  }
}
