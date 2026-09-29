import { Body, Controller, Get, Headers, HttpCode, NotFoundException, Param, Post, Query, UnauthorizedException } from '@nestjs/common'
import { argentinaMonthStart } from '../dates'
import { Public } from '../auth/public.decorator'
import { PrismaService } from '../prisma.service'
import { MercadoPagoService } from './mercadopago.service'
import { PaymentsService } from './payments.service'

// Endpoints públicos: el socio entra con su enlace privado (portalToken) y Mercado Pago avisa los pagos.
@Public()
@Controller()
export class PortalController {
  constructor(private readonly prisma: PrismaService, private readonly payments: PaymentsService, private readonly mercadoPago: MercadoPagoService) {}

  @Get('portal/:token')
  async summary(@Param('token') token: string) {
    const member = await this.findMember(token)
    const payment = member.payments[0]
    const visitsThisMonth = await this.prisma.checkIn.count({ where: { memberId: member.id, checkedAt: { gte: argentinaMonthStart() } } })
    return {
      name: member.name,
      plan: member.plan,
      dni: member.dni,
      checkInCode: `PG:${member.id}`,
      monthlyFee: member.monthlyFee,
      dueDate: member.dueDate,
      paused: member.status === 'SUSPENDED',
      paymentStatus: payment?.status ?? 'EXEMPT',
      canPay: Boolean(payment && member.status !== 'SUSPENDED' && this.payments.canCharge(payment)),
      onlinePayment: this.mercadoPago.isConfigured() && member.monthlyFee > 0,
      schedule: member.scheduleGroup ? `${member.scheduleGroup.startTime} — ${member.scheduleGroup.endTime}` : null,
      attendanceDays: member.attendanceDays,
      visitsThisMonth,
      receipts: member.receipts.map(({ amount, method, period, paidAt }) => ({ amount, method, period, paidAt })),
    }
  }

  @Post('portal/:token/checkout')
  async checkout(@Param('token') token: string) {
    const member = await this.findMember(token)
    if (!member.payments[0] || member.status === 'SUSPENDED') throw new NotFoundException('No hay cuotas para pagar.')
    return this.mercadoPago.createCheckout(member.payments[0].id)
  }

  // Al volver de Mercado Pago confirmamos el pago sin esperar el webhook (y funciona en desarrollo local).
  @Post('portal/:token/confirm')
  async confirm(@Param('token') token: string, @Body('paymentId') paymentId: string) {
    await this.findMember(token)
    return this.mercadoPago.processPayment(String(paymentId ?? ''))
  }

  @Post('mercadopago/webhook')
  @HttpCode(200)
  async webhook(
    @Query('data.id') queryId: string | undefined,
    @Query('type') queryType: string | undefined,
    @Body() body: { type?: string; data?: { id?: string | number } },
    @Headers('x-signature') signature?: string,
    @Headers('x-request-id') requestId?: string,
  ) {
    const type = queryType ?? body?.type
    const id = String(queryId ?? body?.data?.id ?? '')
    if (type !== 'payment' || !id) return { ignored: true }
    if (!this.mercadoPago.verifySignature(signature, requestId, id)) throw new UnauthorizedException('Firma inválida.')
    return this.mercadoPago.processPayment(id)
  }

  private async findMember(token: string) {
    const member = await this.prisma.member.findUnique({
      where: { portalToken: token },
      include: { payments: true, scheduleGroup: true, receipts: { orderBy: { paidAt: 'desc' }, take: 6 } },
    })
    if (!member) throw new NotFoundException('El enlace no es válido. Pedí uno nuevo en recepción.')
    return member
  }
}
