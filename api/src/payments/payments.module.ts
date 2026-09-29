import { Module } from '@nestjs/common'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'
import { WhatsappService } from './whatsapp.service'
import { MercadoPagoService } from './mercadopago.service'
import { PortalController } from './portal.controller'

@Module({
  controllers: [PaymentsController, PortalController],
  providers: [PaymentsService, WhatsappService, MercadoPagoService],
})
export class PaymentsModule {}
