import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async dashboard() {
    const [activeMembers, activeScheduleGroups, overduePayments, sentMessages] = await Promise.all([
      this.prisma.member.count({ where: { status: 'ACTIVE' } }),
      this.prisma.scheduleGroup.count({ where: { active: true } }),
      this.prisma.payment.count({ where: { status: 'OVERDUE' } }),
      this.prisma.payment.count({ where: { reminderSentAt: { not: null } } }),
    ])
    return { activeMembers, activeScheduleGroups, overduePayments, sentMessages }
  }
}
