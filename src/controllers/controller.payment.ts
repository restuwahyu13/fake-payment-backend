import { NextFunction, Request, RequestHandler, Response } from 'express'
import { OutgoingMessage } from 'node:http'

import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { Inject, Injectable } from '~/helpers/helper.di'
import { rawParser } from '~/helpers/helper.rawParser'
import { PaymentService } from '~/services/service.payment'

@Injectable()
export class PaymentController {
  constructor(
    @Inject('PaymentService')
    private readonly service: PaymentService,
  ) {}

  sendPeionio(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.sendPeionio(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  sendUSDC(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.sendUSDC(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  sendACH(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.sendACH(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }
}
