import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateMemberDto } from './dto/create-member.dto'
import { MembersService } from './members.service'

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll() {
    return this.membersService.findAll()
  }

  @Post()
  create(@Body() data: CreateMemberDto) {
    return this.membersService.create(data)
  }
}