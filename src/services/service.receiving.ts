import { StatusCodes as status } from 'http-status-codes'

import { Injectable } from '~/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { mock } from '~/database/mocks/database.receiving'
import { CreateReceivingUsdDTO, ReceivingIdDTO } from '~/dtos/dto.receiving'

@Injectable()
export class ReceivingService {
  constructor() {}

  createUSDAccount(body: CreateReceivingUsdDTO): ApiResponse {
    try {
      const mockCreateData: Record<string, any> = mock.receiving.createUSDAccount
      mockCreateData.account_number = body.account_number
      mockCreateData.routing_number = body.routing_number

      return apiResponse({ stat_code: status.OK, message: 'Create new USD account success', data: mockCreateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getAllUSDAccount(): ApiResponse {
    try {
      const mockAllData: Record<string, any> = mock.receiving.getAllUSDAccount

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockAllData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getUSDAccountById(param: ReceivingIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.receiving.getUSDAccountById
      mockGetData.bank_id = param.id

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  deleteUSDAccountById(param: ReceivingIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.receiving.getUSDAccountById
      mockGetData.bank_id = param.id
      const accountId: string = mockGetData.bank_id

      return apiResponse({ stat_code: status.OK, message: `Deleted usd account by id ${accountId} success` })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
