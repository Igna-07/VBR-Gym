import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateScheduleGroupDto } from './dto/create-schedule-group.dto'
import { ScheduleGroupsService } from './schedule-groups.service'

@Controller('schedule-groups')
export class ScheduleGroupsController {
  constructor(
    private readonly scheduleGroupsService: ScheduleGroupsService,
  ) {}

  @Get()
  findAll() {
    return this.scheduleGroupsService.findAll()
  }

  @Post()
  create(@Body() data: CreateScheduleGroupDto) {
    return this.scheduleGroupsService.create(data)
  }

  @Patch(':groupId/members/:memberId')
  addMember(@Param('groupId') groupId: string, @Param('memberId') memberId: string, @Body('day') day: string) {
    return this.scheduleGroupsService.addMember(groupId, memberId, day)
  }

  @Delete(':groupId/members/:memberId')
  removeMember(@Param('groupId') groupId: string, @Param('memberId') memberId: string) {
    return this.scheduleGroupsService.removeMember(groupId, memberId)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleGroupsService.remove(id)
  }
}
