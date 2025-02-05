import { StatusCodes as status } from 'http-status-codes'

import { Injectable } from '~/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { mock } from '~/database/mocks/database.payment'
import { PaymentACHDTO, PaymentPeionioDTO, PaymentUSDCDTO } from '~/dtos/dto.payment'
import { EPaymentStatus } from '~/constants/cost.payment'

@Injectable()
export class PaymentService {
  constructor() {}

  sendPeionio(body: PaymentPeionioDTO): ApiResponse {
    try {
      const mockCreateData: Record<string, any> = mock.payment.sendPeionio
      mockCreateData.recipient_address = body.email
      mockCreateData.amount = body.amount
      mockCreateData.status = EPaymentStatus.PENDING

      return apiResponse({ stat_code: status.OK, message: `Payment recipient to account ${mockCreateData.recipient_address} success`, data: mockCreateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  sendUSDC(body: PaymentUSDCDTO): ApiResponse {
    try {
      const mockCreateData: Record<string, any> = mock.payment.sendUSDC
      mockCreateData.recipient_address = body.polygon_address
      mockCreateData.amount = body.amount
      mockCreateData.status = EPaymentStatus.PENDING

      return apiResponse({ stat_code: status.OK, message: `Payment recipient to account ${mockCreateData.recipient_address} success`, data: mockCreateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  sendACH(body: PaymentACHDTO): ApiResponse {
    try {
      const mockCreateData: Record<string, any> = mock.payment.sendACH
      mockCreateData.recipient_address = body.recipient_id
      mockCreateData.amount = body.amount
      mockCreateData.status = EPaymentStatus.PENDING

      return apiResponse({ stat_code: status.OK, message: `Payment recipient to account ${mockCreateData.recipient_address} success`, data: mockCreateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
