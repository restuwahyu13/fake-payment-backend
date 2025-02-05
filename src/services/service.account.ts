import { StatusCodes as status } from 'http-status-codes'

import { Inject, Injectable } from '~/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { UserRepository } from '~/repositories/repository.user'
import { mock } from '~/database/mocks/database.account'
import { UserMetadata } from '~/helpers/helper.userMetadata'
import { User } from '~/entities/entity.user'

@Injectable()
export class AccountService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('UserMetadata')
    private readonly userMetadata: UserMetadata,
  ) {}

  async getProfile(): Promise<ApiResponse> {
    try {
      const userId: string = this.userMetadata.user()

      const getUserDetail: User = await this.userRepository.connection.findOne({
        select: ['id', 'first_name', 'last_name', 'email', 'mobile', 'status', 'verified_time'],
        where: { id: userId },
      })
      if (!getUserDetail) {
        throw apiResponse({ stat_code: status.NOT_FOUND, error: 'User account not found' })
      }

      return apiResponse({ stat_code: status.OK, message: 'Success', data: getUserDetail })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  updateProfile(): ApiResponse {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  changePassword(): ApiResponse {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  auth2FA(): ApiResponse {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getAllNotificationSetting(): ApiResponse {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  updateNotificationSetting(): ApiResponse {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getAllDeviceHistory(): ApiResponse {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  closeAccount(): ApiResponse {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getBalanceOverview(): ApiResponse {
    try {
      const mockGetData: Record<string, any> = mock.account.balance

      return apiResponse({ stat_code: status.OK, message: 'Success', data: mockGetData })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  getCredits(): ApiResponse {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  buyCredits(): ApiResponse {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
