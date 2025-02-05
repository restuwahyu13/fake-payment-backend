import { NextFunction, Request, RequestHandler, Response } from 'express'
import { OutgoingMessage } from 'node:http'

import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { Inject, Injectable } from '~/helpers/helper.di'
import { AccountService } from '~/services/service.account'

@Injectable()
export class AccountController {
	constructor(
		@Inject('AccountService')
		private readonly service: AccountService
	) {}

	getProfile(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.getProfile()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	updateProfile(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.updateProfile()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	changePassword(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.changePassword()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	auth2FA(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.auth2FA()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	getAllNotificationSetting(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.getAllNotificationSetting()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	updateNotificationSetting(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.updateNotificationSetting()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	getAllDeviceHistory(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.getAllDeviceHistory()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	closeAccount(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.closeAccount()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	getBalanceOverview(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.getBalanceOverview()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	getCredits(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.getCredits()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}

	buyCredits(): RequestHandler {
		return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
			try {
				const service: ApiResponse = await this.service.buyCredits()
				return apiResponse(service, res)
			} catch (e: any) {
				return apiResponse(e, res)
			}
		}
	}
}
