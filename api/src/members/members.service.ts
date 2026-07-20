import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateMemberDto } from './dto/create-member.dto'

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.member.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async create(data: CreateMemberDto) {
    const dueDate = new Date(`${data.dueDate}T12:00:00.000Z`)
    try {
      return await this.prisma.member.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          plan: data.plan,
          dueDate,
          whatsappAllowed: data.whatsappAllowed,
          attendanceFrequency: data.attendanceFrequency,
          attendanceDays: data.attendanceDays,
          scheduleGroupId: data.scheduleGroupId || null,
          payments: {
            create: { dueDate },
          },
        },
      })
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') {
        throw new ConflictException('Ya existe un socio con ese teléfono o correo electrónico.')
      }
      throw error
    }
  }
}
