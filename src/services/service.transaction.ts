import { StatusCodes as status } from 'http-status-codes'
import { randomUUID } from 'node:crypto'

import { Injectable } from '~/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { mock } from '~/database/mocks/database.transaction'
import { CreateTransactionDTO } from '~/dtos/dto.transaction'
import { ETransactionStatus } from '~/constants/const.transaction'

@Injectable()
export class TransactionService {
  constructor() {}

  createTransaction(body: CreateTransactionDTO): ApiResponse {
    try {
      const mockCreateData: Record<string, any> = mock.transaction.getTransactionById
      mockCreateData.transaction_type = body.transaction_type
      mockCreateData.amount = body.amount
      mockCreateData.notes = body.notes
      mockCreateData.status = ETransactionStatus.PENDING

      return apiResponse({ stat_code: status.OK, message: `Create transaction for ${mockCreateData.transaction_type} success`, data: mockCreateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getAllTransaction(): ApiResponse {
    try {
      const mockGetAllData: Record<string, any>[] = mock.transaction.getAllTransaction

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetAllData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
