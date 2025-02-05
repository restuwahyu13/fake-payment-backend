import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Matches } from 'class-validator'

export class CreateReceivingUsdDTO {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  account_number: number

  @IsNumber({ allowInfinity: false, allowNaN: false })
  routing_number: number
}

export class ReceivingIdDTO {
  @IsUUID()
  id: string
}
