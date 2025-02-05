import { IsEnum, IsNumber, IsUUID, Length, MinLength } from 'class-validator'
import { ECurrencyType, EpackageType, EPeriodType } from '~/constants/const.pricing'

export class CreatePricingDTO {
  @IsEnum(EpackageType)
  package: EpackageType

  @IsNumber({ allowInfinity: false, allowNaN: false })
  price: number

  @IsEnum(EPeriodType)
  period: EPeriodType

  @IsEnum(ECurrencyType)
  currency: ECurrencyType

  @IsNumber({ allowInfinity: false, allowNaN: false })
  limit: number
}

export class PricingByIdDTO {
  @IsUUID()
  id: string
}

export class UpdatePricingDTO {
  @IsEnum(EpackageType)
  package: EpackageType

  @IsNumber({ allowInfinity: false, allowNaN: false })
  price: number

  @IsEnum(EPeriodType)
  period: EPeriodType

  @IsEnum(ECurrencyType)
  currency: ECurrencyType

  @IsNumber({ allowInfinity: false, allowNaN: false })
  limit: number
}
