import { StatusCodes as status } from 'http-status-codes'

import { Injectable } from '~/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { CreatePricingDTO, PricingByIdDTO, UpdatePricingDTO } from '~/dtos/dto.pricing'
import { mock } from '~/database/mocks/database.pricing'

@Injectable()
export class PricingService {
  constructor() {}

  createPricing(body: CreatePricingDTO): ApiResponse {
    try {
      const mockCreateData: Record<string, any> = mock.pricing.createPricing
      mockCreateData.package = body.package
      mockCreateData.price = body.price
      mockCreateData.period = body.period
      mockCreateData.currency = body.currency
      mockCreateData.limit = body.limit

      return apiResponse({ stat_code: status.OK, message: 'Create new pricing package success', data: mockCreateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getAllPricing(): ApiResponse {
    try {
      const mockGetAllData: Record<string, any> = mock.pricing.getAllPricing

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetAllData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getPricingById(param: PricingByIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.pricing.getPricingById
      mockGetData.id = param.id

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  updatePricingById(body: UpdatePricingDTO, param: PricingByIdDTO): ApiResponse {
    try {
      const mockUpdateData: Record<string, any> = mock.pricing.updatePricingById
      mockUpdateData.id = param.id
      mockUpdateData.package = body.package
      mockUpdateData.price = body.price
      mockUpdateData.period = body.period
      mockUpdateData.currency = body.currency
      mockUpdateData.limit = body.limit

      return apiResponse({ stat_code: status.OK, message: `Updated pricing package ${mockUpdateData.package} success`, data: mockUpdateData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  deletePricingById(param: PricingByIdDTO): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.pricing.getPricingById
      mockGetData.id = param.id
      const packageType: string = mockGetData.package

      return apiResponse({ stat_code: status.OK, message: `Deleted pricing package ${packageType} success` })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
