import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MembersModule } from './members/members.module'
import { PrismaModule } from './prisma.module'
import { ScheduleGroupsModule } from './schedule-groups/schedule-groups.module'
import { PaymentsModule } from './payments/payments.module'
import { NoticesModule } from './notices/notices.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MembersModule,
    ScheduleGroupsModule,
    PaymentsModule,
    NoticesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
