import { NextFunction, Request, RequestHandler, Response } from 'express'
import { OutgoingMessage } from 'node:http'

import { Controller, Inject } from '~/helpers/helper.di'
import { apiResponse, ApiResponse } from '~/helpers/helper.apiResponse'
import { rawParser } from '~/helpers/helper.rawParser'
import { AuthService } from '~/services/service.auth'

@Controller()
export class AuthController {
  constructor(
    @Inject('AuthService')
    private readonly service: AuthService,
  ) {}

  login(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.login(req, rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  register(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.register(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  verifyEmail(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.verifyEmail(rawParser(req.params))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  resendEmail(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.resendEmail(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  forgotPassword(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.forgotPassword(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  resetPassword(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.resetPassword(rawParser(req.body), rawParser(req.params))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  healthToken(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.healthToken(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  refreshToken(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.refreshToken(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }
}
