import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PaymentPeionioDTO {
  @IsEmail()
  email: string

  @IsNumber({ allowInfinity: false, allowNaN: false })
  amount: number
}

export class PaymentUSDCDTO {
  @IsNotEmpty()
  @IsString()
  polygon_address: string

  @IsNumber({ allowInfinity: false, allowNaN: false })
  amount: number
}

export class PaymentACHDTO {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  recipient_id: number

  @IsNumber({ allowInfinity: false, allowNaN: false })
  amount: number
}
