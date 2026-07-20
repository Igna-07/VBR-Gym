import { Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { PaymentsService } from './payments.service'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll() { return this.paymentsService.findAll() }

  @Get('whatsapp-status')
  whatsappStatus() { return this.paymentsService.whatsappStatus() }

  @Patch(':id/paid')
  markPaid(@Param('id') id: string) { return this.paymentsService.markPaid(id) }

  @Post(':id/send-reminder')
  sendReminder(@Param('id') id: string) { return this.paymentsService.sendReminder(id) }
}
