import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { IsInt, Max, Min } from 'class-validator'
import { PrismaService } from '../prisma.service'

class UpdatePlanDto {
  @IsInt()
  @Min(0)
  @Max(100_000_000)
  price: number
}

@Controller('plans')
export class PlansController {
  constructor(private readonly prisma: PrismaService) {}

  @Get() findAll() { return this.prisma.plan.findMany({ orderBy: [{ exempt: 'asc' }, { price: 'asc' }, { name: 'asc' }] }) }

  @Patch(':id') update(@Param('id') id: string, @Body() data: UpdatePlanDto) {
    return this.prisma.plan.update({ where: { id }, data: { price: data.price } })
  }
}
