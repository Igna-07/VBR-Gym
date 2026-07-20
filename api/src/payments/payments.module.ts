import { Module } from '@nestjs/common'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'
import { WhatsappService } from './whatsapp.service'

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, WhatsappService],
})
export class PaymentsModule {}
