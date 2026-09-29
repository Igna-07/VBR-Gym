import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CheckInDto, CreateMemberDto } from './dto/create-member.dto'
import { MembersService } from './members.service'

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get() findAll() { return this.membersService.findAll() }
  @Get(':id') detail(@Param('id') id: string) { return this.membersService.detail(id) }
  @Post() create(@Body() data: CreateMemberDto) { return this.membersService.create(data) }
  @Post('check-in') checkIn(@Body() data: CheckInDto) { return this.membersService.checkIn(data.query) }
  @Put(':id') update(@Param('id') id: string, @Body() data: CreateMemberDto) { return this.membersService.update(id, data) }
  @Post(':id/pause') pause(@Param('id') id: string) { return this.membersService.pause(id) }
  @Post(':id/portal-link') regeneratePortalLink(@Param('id') id: string) { return this.membersService.regeneratePortalLink(id) }
  @Post(':id/resume') resume(@Param('id') id: string) { return this.membersService.resume(id) }
  @Delete(':id') remove(@Param('id') id: string) { return this.membersService.remove(id) }
}
