import { IsBoolean, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Matches } from 'class-validator'
import { EBuyCreditPayment } from '~/constants/const.account'

export class ProfileById {
	@IsUUID()
	id: string
}

export class UpdateProfileById {
	@IsOptional()
	@Matches(/^[a-z\s]+$/gi, { message: 'First name must be contain alpha character' })
	first_name?: string

	@IsOptional()
	@Matches(/^[a-z\s]+$/gi, { message: 'Last name must be contain alpha character' })
	last_name?: string

	@IsOptional()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsMobilePhone('en-US')
	mobile?: string
}

export class BuyCreditDTO {
	@IsUUID()
	user_id: string

	@IsEnum(EBuyCreditPayment)
	payment: number

	@IsNumber({ allowInfinity: false, allowNaN: false })
	qty: number

	@IsEnum(EBuyCreditPayment)
	@IsNumber({ allowInfinity: false, allowNaN: false })
	amount: number
}

export class Enable2FaDTO {
	@IsUUID()
	user_id: string

	@IsBoolean()
	enable: boolean

	@IsNotEmpty()
	@IsString()
	token: boolean
}

export class CloseAccountDTO {
	@IsUUID()
	user_id: string
}
