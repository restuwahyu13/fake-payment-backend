import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Matches } from 'class-validator'

export class CreateRecipientPeionioDTO {
  @Matches(/^[\w\s]+$/gi, { message: 'Nick name should contain alpha character or alpha numeric' })
  nick_name: string

  @Matches(/^[a-z\s]+$/gi, { message: 'Account name should contain alpha character' })
  account_name: string

  @IsEmail()
  user_email: string
}

export class CreateRecipientUsdcDTO {
  @Matches(/^[\w\s]+$/gi, { message: 'Nick name should contain alpha character or alpha numeric' })
  nick_name: string

  @Matches(/^[a-z\s]+$/gi, { message: 'Account name should contain alpha character' })
  account_name: string

  @IsNotEmpty()
  @IsString()
  wallet_address: string
}

export class CreateRecipientAchDTO {
  @Matches(/^[\w\s]+$/gi, { message: 'Nick name should contain alpha character or alpha numeric' })
  nick_name: string

  @Matches(/^[a-z\s]+$/gi, { message: 'Account name should contain alpha character' })
  account_name: string

  @Matches(/^[a-z\s]+$/gi, { message: 'Beneficiary name should contain alpha character' })
  beneficiary_name: string

  @IsNumber({ allowInfinity: false, allowNaN: false })
  account_number: number

  @IsNumber({ allowInfinity: false, allowNaN: false })
  routing_number: number
}

export class RecipientIdDTO {
  @IsUUID()
  id: string
}

export class UpdateRecipientById {
  @Matches(/^[a-z\s]+$/gi, { message: 'Recipient name should contain alpha character' })
  recipient_name: string

  @IsOptional()
  @IsString()
  recipient_bank?: string

  @IsOptional()
  @IsString()
  recipient_address: string

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  recipient_address_number?: number
}
