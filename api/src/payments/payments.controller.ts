import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { MarkPaidDto } from './dto/mark-paid.dto'
import { PaymentsService } from './payments.service'
import { MercadoPagoService } from './mercadopago.service'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService, private readonly mercadoPago: MercadoPagoService) {}

  @Get()
  findAll() { return this.paymentsService.findAll() }

  @Get('receipts')
  receipts(@Query('from') from?: string, @Query('to') to?: string) { return this.paymentsService.receipts(from, to) }

  @Get('whatsapp-status')
  whatsappStatus() { return { ...this.paymentsService.whatsappStatus(), mercadoPago: this.mercadoPago.isConfigured() } }

  @Post(':id/checkout')
  checkout(@Param('id') id: string) { return this.mercadoPago.createCheckout(id) }

  @Patch(':id/paid')
  markPaid(@Param('id') id: string, @Body() data: MarkPaidDto) { return this.paymentsService.markPaid(id, data) }

  @Post(':id/send-reminder')
  sendReminder(@Param('id') id: string) { return this.paymentsService.sendReminder(id) }
}
