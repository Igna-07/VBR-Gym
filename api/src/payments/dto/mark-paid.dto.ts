import { IsIn, IsInt, Min } from 'class-validator'

export class MarkPaidDto {
  @IsInt({ message: 'Ingresá un monto válido.' })
  @Min(0, { message: 'El monto no puede ser negativo.' })
  amount: number

  @IsIn(['CASH', 'TRANSFER', 'MERCADOPAGO', 'CARD'], { message: 'Elegí un medio de pago.' })
  method: 'CASH' | 'TRANSFER' | 'MERCADOPAGO' | 'CARD'
}
