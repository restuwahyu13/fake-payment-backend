import { StatusCodes as status } from 'http-status-codes'

import { Injectable } from '~/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { mock } from '~/database/mocks/database.recipient'
import { CreateRecipientAchDTO, CreateRecipientPeionioDTO, CreateRecipientUsdcDTO, RecipientIdDTO, UpdateRecipientById } from '~/dtos/dto.recipient'

@Injectable()
export class RecipientService {
  constructor() {}

  createdPeionioRecipient(body: CreateRecipientPeionioDTO): ApiResponse {
    try {
      const mockCreateData: Record<string, any> = mock.recipient.createdPeionioRecipient
      mockCreateData.nick_name = body.nick_name
      mockCreateData.account_name = body.account_name
      mockCreateData.user_email = body.user_email

      return apiResponse({ stat_code: status.OK, message: 'Create new recipient account success', data: mockCreateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getAllPeionioRecipient(): ApiResponse {
    try {
      const mockGetAllData: Record<string, any>[] = mock.recipient.getAllPeionioRecipient

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetAllData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getPeioinoRecipientById(param: RecipientIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.recipient.getPeioinoRecipientById
      mockGetData.id = param.id

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  updatedPeionioRecipient(body: UpdateRecipientById, param: RecipientIdDTO): ApiResponse {
    try {
      const mockUpdateData: Record<string, any> = mock.recipient.updatedPeionioRecipient
      mockUpdateData.id = param.id
      mockUpdateData.recipient_name = body.recipient_name
      mockUpdateData.recipient_bank = body.recipient_bank
      mockUpdateData.recipient_address = body.recipient_address

      return apiResponse({ stat_code: status.OK, message: `Updated recipient for peionio account ${mockUpdateData.recipient_name} success`, data: mockUpdateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  deletedPeionioRecipientById(param: RecipientIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.recipient.getPeioinoRecipientById
      mockGetData.id = param.id
      const accountName: string = mockGetData.account_name

      return apiResponse({ stat_code: status.OK, message: `Deleted ${accountName} peionio account success` })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  createdUSDCRecipient(body: CreateRecipientUsdcDTO): ApiResponse {
    try {
      const mockCreateData: Record<string, any> = mock.recipient.createdUSDCRecipient
      mockCreateData.nick_name = body.nick_name
      mockCreateData.account_name = body.account_name
      mockCreateData.wallet_address = body.wallet_address

      return apiResponse({ stat_code: status.OK, message: 'Create new recipient usdc account success', data: mockCreateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getAllUSDCRecipient(): ApiResponse {
    try {
      const mockGetAllData: Record<string, any>[] = mock.recipient.getAllUSDCRecipient

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetAllData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getUSDCRecipientById(param: RecipientIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.recipient.getUSDCRecipientById
      mockGetData.id = param.id

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  updatedUSDCRecipient(body: UpdateRecipientById, param: RecipientIdDTO): ApiResponse {
    try {
      const mockUpdateData: Record<string, any> = mock.recipient.updatedUSDCRecipient
      mockUpdateData.id = param.id
      mockUpdateData.recipient_name = body.recipient_name
      mockUpdateData.recipient_address = body.recipient_address

      return apiResponse({ stat_code: status.OK, message: `Updated recipient for usdc account ${mockUpdateData.recipient_name} success`, data: mockUpdateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  deletedUSDCRecipientById(param: RecipientIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.recipient.getUSDCRecipientById
      mockGetData.id = param.id
      const accountName: string = mockGetData.account_name

      return apiResponse({ stat_code: status.OK, message: `Deleted ${accountName} usdc account success` })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  createdACHRecipient(body: CreateRecipientAchDTO): ApiResponse {
    try {
      const mockCreateData: Record<string, any> = mock.recipient.createdACHRecipient
      mockCreateData.nick_name = body.nick_name
      mockCreateData.account_name = body.account_name
      mockCreateData.beneficiary_name = body.beneficiary_name
      mockCreateData.account_number = body.account_number
      mockCreateData.routing_number = body.routing_number

      return apiResponse({ stat_code: status.OK, message: 'Create new recipient ach account success', data: mockCreateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getAllACHRecipient(): ApiResponse {
    try {
      const mockGetAllData: Record<string, any>[] = mock.recipient.getAllACHRecipient

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetAllData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getACHRecipientById(param: RecipientIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.recipient.getACHRecipientById
      mockGetData.id = param.id

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  updatedACHRecipient(body: UpdateRecipientById, param: RecipientIdDTO): ApiResponse {
    try {
      const mockUpdateData: Record<string, any> = mock.recipient.updatedACHRecipient
      mockUpdateData.id = param.id
      mockUpdateData.recipient_name = body.recipient_name
      mockUpdateData.recipient_bank = body.recipient_bank
      mockUpdateData.recipient_address = body.recipient_address
      mockUpdateData.recipient_address_number = body.recipient_address_number

      return apiResponse({ stat_code: status.OK, message: `Updated recipient for ach account ${mockUpdateData.recipient_name} success`, data: mockUpdateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  deletedACHRecipientById(param: RecipientIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.recipient.getACHRecipientById
      mockGetData.id = param.id
      const accountName: string = mockGetData.account_name

      return apiResponse({ stat_code: status.OK, message: `Deleted ${accountName} ach account success` })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
