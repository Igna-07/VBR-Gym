import { Module } from '@nestjs/common'
import { ScheduleGroupsController } from './schedule-groups.controller'
import { ScheduleGroupsService } from './schedule-groups.service'

@Module({
  controllers: [ScheduleGroupsController],
  providers: [ScheduleGroupsService],
})
export class ScheduleGroupsModule {}
