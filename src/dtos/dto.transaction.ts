import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { ETransactionType } from '~/constants/const.transaction'

export class CreateTransactionDTO {
  @IsEnum(ETransactionType)
  transaction_type: ETransactionType

  @IsNumber({ allowInfinity: false, allowNaN: false })
  amount: string

  @IsOptional()
  @IsString()
  notes?: string
}
