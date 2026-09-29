import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
} from 'class-validator'

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @Matches(/^\d{7,9}$/, { message: 'El DNI debe tener entre 7 y 9 números, sin puntos.' })
  dni?: string

  @IsString()
  @IsNotEmpty()
  plan: string

  // Si no se envía, se usa el precio del plan.
  @IsOptional()
  @IsInt()
  @Min(0)
  monthlyFee?: number

  @IsOptional()
  @IsDateString()
  dueDate?: string

  @IsBoolean()
  whatsappAllowed: boolean

  @IsOptional()
  @IsString()
  attendanceFrequency?: 'TWO_DAYS' | 'THREE_DAYS' | 'DAILY'

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attendanceDays?: string[]

  @IsOptional()
  @IsUUID()
  scheduleGroupId?: string
}

export class CheckInDto {
  @IsString()
  @IsNotEmpty()
  query: string
}
