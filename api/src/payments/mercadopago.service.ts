import { BadRequestException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma.service'
import { validMpSignature } from './mp-signature'
import { PaymentsService } from './payments.service'

type MpPayment = { id: number; status: string; external_reference?: string; transaction_amount: number }

const API = 'https://api.mercadopago.com'

@Injectable()
export class MercadoPagoService {
  private readonly logger = new Logger(MercadoPagoService.name)
  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService, private readonly payments: PaymentsService) {}

  isConfigured() { return Boolean(this.config.get('MP_ACCESS_TOKEN')) }

  portalUrl(token: string) { return `${this.config.get('PUBLIC_WEB_URL') || 'http://localhost:5173'}/portal/${token}` }

  // Crea un link de Checkout Pro para la cuota actual del socio.
  async createCheckout(paymentId: string) {
    if (!this.isConfigured()) throw new ServiceUnavailableException('Mercado Pago todavía no está configurado.')
    const payment = await this.prisma.payment.findUnique({ where: { id: paymentId }, include: { member: true } })
    if (!payment?.dueDate || !this.payments.canCharge(payment)) throw new BadRequestException('Esta cuota no tiene saldo para pagar.')
    if (payment.member.monthlyFee <= 0) throw new BadRequestException('La cuota no tiene un monto cargado. Consultá en recepción.')

    const back = this.portalUrl(payment.member.portalToken)
    const apiUrl = this.config.get<string>('PUBLIC_API_URL')
    const dueLabel = payment.dueDate.toLocaleDateString('es-AR', { timeZone: 'UTC' })
    const preference = await this.request<{ init_point: string }>('/checkout/preferences', {
      method: 'POST',
      body: JSON.stringify({
        items: [{ id: payment.id, title: `Cuota ${payment.member.plan} · vence ${dueLabel}`, quantity: 1, unit_price: payment.member.monthlyFee, currency_id: 'ARS' }],
        payer: payment.member.email ? { email: payment.member.email } : undefined,
        // El período viaja en la referencia para no acreditar un pago viejo a una cuota nueva.
        external_reference: `${payment.id}|${payment.dueDate.toISOString()}`,
        back_urls: { success: back, pending: back, failure: back },
        // Mercado Pago sólo acepta auto_return y notificaciones con URLs públicas (https).
        ...(back.startsWith('https://') ? { auto_return: 'approved' } : {}),
        ...(apiUrl?.startsWith('https://') ? { notification_url: `${apiUrl}/mercadopago/webhook` } : {}),
        statement_descriptor: 'PROFESIONAL GYM',
      }),
    })
    return { url: preference.init_point }
  }

  // Consulta el pago a Mercado Pago (nunca confiamos en el contenido de la notificación) y lo acredita una sola vez.
  async processPayment(mpPaymentId: string) {
    if (!/^\d+$/.test(mpPaymentId)) throw new BadRequestException('Identificador de pago inválido.')
    const mp = await this.request<MpPayment>(`/v1/payments/${mpPaymentId}`)
    if (mp.status !== 'approved') return { status: mp.status }
    if (await this.prisma.paymentReceipt.findUnique({ where: { mpPaymentId } })) return { status: 'approved' }

    const [paymentId, period] = (mp.external_reference ?? '').split('|')
    const payment = paymentId ? await this.prisma.payment.findUnique({ where: { id: paymentId } }) : null
    if (!payment) {
      this.logger.warn(`Pago ${mpPaymentId} aprobado sin cuota asociada (${mp.external_reference}).`)
      return { status: 'approved' }
    }
    const amount = Math.round(mp.transaction_amount)
    try {
      if (payment.dueDate?.toISOString() === period && this.payments.canCharge(payment)) {
        await this.payments.markPaid(payment.id, { amount, method: 'MERCADOPAGO' }, mpPaymentId)
      } else {
        // La cuota ya se había cobrado por otro medio: se registra el ingreso igual para que la caja cuadre.
        await this.prisma.paymentReceipt.create({ data: { memberId: payment.memberId, amount, method: 'MERCADOPAGO', period: new Date(period || Date.now()), mpPaymentId } })
        this.logger.warn(`Pago ${mpPaymentId} acreditado a un período ya cobrado del socio ${payment.memberId}.`)
      }
    } catch (error) {
      // Webhook y regreso del socio pueden llegar a la vez: el índice único evita el doble registro.
      if ((error as { code?: string }).code !== 'P2002') throw error
    }
    return { status: 'approved' }
  }

  verifySignature(signature: string | undefined, requestId: string | undefined, dataId: string) {
    const secret = this.config.get<string>('MP_WEBHOOK_SECRET')
    return !secret || validMpSignature(secret, signature, requestId, dataId)
  }

  private async request<T>(path: string, init: RequestInit = {}) {
    const response = await fetch(`${API}${path}`, {
      ...init,
      headers: { Authorization: `Bearer ${this.config.getOrThrow<string>('MP_ACCESS_TOKEN')}`, 'Content-Type': 'application/json' },
    })
    const body = await response.json() as T & { message?: string }
    if (!response.ok) throw new ServiceUnavailableException(`Mercado Pago: ${body.message ?? response.statusText}`)
    return body
  }
}
