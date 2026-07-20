import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class WhatsappService {
  constructor(private readonly config: ConfigService) {}

  isConfigured() {
    return Boolean(this.config.get('WHATSAPP_PHONE_NUMBER_ID') && this.config.get('WHATSAPP_ACCESS_TOKEN'))
  }

  senderNumber() { return this.config.get<string>('WHATSAPP_SENDER_NUMBER') || '' }

  async sendPaymentReminder(phone: string, memberName: string, dueDate: Date) {
    if (!this.isConfigured()) {
      throw new ServiceUnavailableException('WhatsApp todavía no está configurado.')
    }
    const phoneNumberId = this.config.getOrThrow<string>('WHATSAPP_PHONE_NUMBER_ID')
    const token = this.config.getOrThrow<string>('WHATSAPP_ACCESS_TOKEN')
    const graphVersion = this.config.get<string>('WHATSAPP_GRAPH_VERSION') || 'v23.0'
    const template = this.config.get<string>('WHATSAPP_PAYMENT_TEMPLATE') || 'recordatorio_cuota_gimnasio'
    const response = await fetch(`https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone.replace(/\D/g, ''),
        type: 'template',
        template: {
          name: template,
          language: { code: 'es_AR' },
          components: [{
            type: 'body',
            parameters: [
              { type: 'text', text: memberName },
              { type: 'text', text: dueDate.toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }) },
            ],
          }],
        },
      }),
    })
    const body = await response.json() as { messages?: { id: string }[]; error?: { message?: string } }
    if (!response.ok) throw new Error(body.error?.message || 'WhatsApp rechazó el mensaje.')
    return body.messages?.[0]?.id || null
  }
}
