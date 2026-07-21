import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
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

  @IsString()
  @IsNotEmpty()
  @IsIn(['Tres veces por semana', 'Todos los días', 'Plan libre'])
  plan: string

  @ValidateIf((member: CreateMemberDto) => member.plan !== 'Plan libre')
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
