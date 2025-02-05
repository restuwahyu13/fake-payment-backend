import { StatusCodes as status } from 'http-status-codes'
import { randomUUID } from 'node:crypto'
import { IsNull, UpdateResult } from 'typeorm'
import { Request } from 'express'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import validator from 'validator'
import moment from 'moment-timezone'

import { Inject, Service } from '~/helpers/helper.di'
import { apiResponse, ApiResponse } from '~/helpers/helper.apiResponse'
import { UserRepository } from '~/repositories/repository.user'
import { UserActivityRepository } from '~/repositories/repository.userAcivity'
import { User } from '~/entities/entity.user'
import { ForgotPasswordDTO, HealthTokenDTO, RefreshTokenDTO, ResendEmailDTO, ResetPassword, UserLoginDTO, UserRegisterDTO, VerifiedEmailDTO } from '~/dtos/dto.auth'
import { Argon } from '~/libs/lib.argon'
import { EUserStatus } from '~/constants/const.user'
import { JsonWebToken } from '~/libs/lib.jwt'
import { Redis } from '~/libs/lib.redis'
import { Cipher } from '~/helpers/helper.cipher'
import { randomString } from '~/helpers/helper.random'
import { Encryption } from '~/helpers/helper.encryption'
import { Environment } from '~/configs/config.env'

@Service()
export class AuthService {
  private readonly jwt: InstanceType<typeof JsonWebToken> = new JsonWebToken()

  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('UserActivityRepository')
    private readonly userActivityRepository: UserActivityRepository,
    @Inject('Redis')
    private readonly redis: Redis,
  ) {}

  async login(req: Request, body: UserLoginDTO): Promise<ApiResponse> {
    try {
      const checkUserAccountExist: User = await this.userRepository.connection.findOne({
        select: ['id', 'email', 'password', 'verified_time'],
        where: { email: body.email, status: EUserStatus.ACTIVE },
      })
      if (!checkUserAccountExist) {
        throw apiResponse({ stat_code: status.NOT_FOUND, error: 'Account is not registered' })
      } else if (!checkUserAccountExist.verified_time) {
        throw apiResponse({ stat_code: status.FORBIDDEN, error: 'Account is not verified' })
      }

      const isVerifyPassword: boolean = await Argon.verify(body.password, checkUserAccountExist.password)
      if (!isVerifyPassword) {
        throw apiResponse({ stat_code: status.PRECONDITION_FAILED, error: 'Incorrect password or email' })
      }

      const jwtPayload: Record<string, any> = {
        id: checkUserAccountExist.id,
        email: checkUserAccountExist.email,
      }
      const jwtAccessToken: string = await this.jwt.sign(checkUserAccountExist.id, jwtPayload)

      delete jwtPayload.id
      jwtPayload.token = jwtAccessToken

      const ipAddress: string = req.ip ?? req.socket.remoteAddress ?? req.header('x-real-ip') ?? req.header('x-forwarded-host') ?? req.header('x-client-ip')
      const userAgent: string = req.header('user-agent')
      const loginTime: Date = new Date()

      this.userActivityRepository.connection.create({
        ip_address: ipAddress,
        user_agent: userAgent,
        login_time: loginTime,
        created_by: checkUserAccountExist.id,
      })

      return apiResponse({ stat_code: status.OK, message: 'Login successfully', data: jwtPayload })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async register(body: UserRegisterDTO) {
    try {
      const checkUserAccountExist: User = await this.userRepository.connection.findOne({
        select: ['id'],
        where: [{ email: body.email }, { mobile: body.mobile }],
      })
      if (checkUserAccountExist) {
        throw apiResponse({ stat_code: status.CONFLICT, error: 'Email or Phone Number already taken' })
      }

      const hashPassword: string = await Argon.hash(body.password)
      body.password = hashPassword

      const createNewUserAccount: User = await this.userRepository.connection.save(body)
      if (!createNewUserAccount) {
        throw apiResponse({ stat_code: status.PRECONDITION_FAILED, error: 'Registered new account failed' })
      }

      const cipherText: string = Cipher.encodeRotation(randomString(32))
      const cipherKey: string = `verified:${cipherText.substring(0, 5)}`
      const cipherExpired: number = 500

      this.redis.setEx(cipherKey, cipherExpired, `${body.email}:${cipherText}`)

      return apiResponse({ stat_code: status.OK, message: 'Registered new account successfully' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async verifyEmail(param: VerifiedEmailDTO): Promise<ApiResponse> {
    try {
      const cipherKey: string = `verifiedemail:${param.token.substring(0, 5)}`
      const cipherResult: string = await this.redis.get(cipherKey)

      if (!cipherResult) {
        throw apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: 'Invalid verified token' })
      }

      const email: string = cipherResult.split(':')[0]
      const checkUserAccountExist: User = await this.userRepository.connection.findOne({
        select: ['id', 'verified_time'],
        where: { email: email, status: EUserStatus.ACTIVE },
      })

      if (!checkUserAccountExist.verified_time) {
        Promise.all([this.userRepository.connection.update(checkUserAccountExist.id, { verified_time: new Date() }), this.redis.del(cipherKey)])
      }

      return apiResponse({ stat_code: status.OK, message: 'Verified account successfully, please login!' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async resendEmail(body: ResendEmailDTO): Promise<ApiResponse> {
    try {
      const checkUserAccountExist: User = await this.userRepository.connection.findOne({
        select: ['id'],
        where: { email: body.email, status: EUserStatus.ACTIVE, verified_time: IsNull() },
      })
      if (!checkUserAccountExist) {
        throw apiResponse({ stat_code: status.NOT_FOUND, error: 'Account is not registered' })
      }

      const cipherText: string = Cipher.encodeRotation(randomString(32))
      const cipherKey: string = `verifiedemail:${cipherText.substring(0, 5)}`
      const cipherExpired: number = 500

      const cipherKeyExist: number = await this.redis.exists(cipherKey)
      if (!cipherKeyExist) {
        this.redis.setEx(cipherKey, cipherExpired, `${body.email}:${cipherText}`)
      }

      return apiResponse({ stat_code: status.OK, message: `Resend email successfully, please check your email ${body.email}` })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async forgotPassword(body: ForgotPasswordDTO): Promise<ApiResponse> {
    try {
      const checkUserAccountExist: User = await this.userRepository.connection.findOne({
        select: ['verified_time'],
        where: { email: body.email, status: EUserStatus.ACTIVE },
      })
      if (!checkUserAccountExist) {
        throw apiResponse({ stat_code: status.NOT_FOUND, error: 'Account is not registered' })
      } else if (!checkUserAccountExist.verified_time) {
        throw apiResponse({ stat_code: status.FORBIDDEN, error: 'Account is not verified' })
      }

      const cipherText: string = Cipher.encodeRotation(randomString(32))
      const cipherKey: string = `resetpassword:${cipherText.substring(0, 5)}`
      const cipherExpired: number = 500

      const cipherKeyExist: number = await this.redis.exists(cipherKey)
      if (!cipherKeyExist) {
        this.redis.setEx(cipherKey, cipherExpired, `${body.email}:${cipherText}`)
      }

      return apiResponse({ stat_code: status.OK, message: `Forgot password successfully, please check your email ${body.email}` })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async resetPassword(body: ResetPassword, param: ResetPassword): Promise<ApiResponse> {
    try {
      const cipherKey: string = `resetpassword:${param.token.substring(0, 5)}`
      const cipherResult: string = await this.redis.get(cipherKey)

      if (!cipherResult) {
        throw apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: 'Invalid verified token' })
      }

      const email: string = cipherResult.split(':')[0]
      const checkUserAccountExist: User = await this.userRepository.connection.findOne({
        select: ['id'],
        where: { email: email, status: EUserStatus.ACTIVE },
      })

      if (!checkUserAccountExist) {
        throw apiResponse({ stat_code: status.NOT_FOUND, error: 'Account is not registered' })
      } else if (body.cpassword !== body.password) {
        throw apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: 'Confirm password must be match with password' })
      }

      const hashPassword: string = await Argon.hash(body.password)
      body.password = hashPassword

      const createNewUserAccount: UpdateResult = await this.userRepository.connection.update(checkUserAccountExist.id, { password: body.password })
      if (!createNewUserAccount.affected) {
        throw apiResponse({ stat_code: status.PRECONDITION_FAILED, error: 'Reset password failed' })
      }

      return apiResponse({ stat_code: status.OK, message: 'Reset password successfully' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async healthToken(body: HealthTokenDTO): Promise<ApiResponse> {
    try {
      const jwtDecode: JwtPayload = jsonwebtoken.decode(body.token) as any
      if (!jwtDecode) {
        throw apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: 'Unhealth token' })
      }

      const secretKey: string = Buffer.from(`${jwtDecode.aud}:${jwtDecode.iss}:${jwtDecode.sub}:${Environment.JWT_EXPIRED}`).toString('hex')
      const secretData: Buffer = Buffer.from(jwtDecode.jti, 'hex')
      const userId: string = Encryption.AES256Decrypt(secretKey, secretData).toString()

      if (!validator.isUUID(userId)) {
        throw apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: 'Unhealth token' })
      }

      const cipherKey: string = `${userId}:token`
      const cipherKeyExist: number = await this.redis.exists(cipherKey)

      if (!cipherKeyExist) {
        throw apiResponse({ stat_code: status.OK, message: 'Unhealth token' })
      }

      return apiResponse({ stat_code: status.OK, message: 'Health token' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async refreshToken(body: RefreshTokenDTO): Promise<ApiResponse> {
    try {
      const jwtDecode: JwtPayload = jsonwebtoken.decode(body.token) as any
      if (!jwtDecode) {
        throw apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: 'Invalid access token' })
      }

      const secretKey: string = Buffer.from(`${jwtDecode.aud}:${jwtDecode.iss}:${jwtDecode.sub}:${Environment.JWT_EXPIRED}`).toString('hex')
      const secretData: Buffer = Buffer.from(jwtDecode.jti, 'hex')
      const userId: string = Encryption.AES256Decrypt(secretKey, secretData).toString()

      if (!validator.isUUID(userId)) {
        throw apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: 'Invalid access token' })
      }

      const checkUserAccountExist: User = await this.userRepository.connection.findOne({
        select: ['id', 'email'],
        where: { id: userId },
      })
      if (!checkUserAccountExist) {
        throw apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: 'Invalid access token' })
      }

      const cipherKey: string = `${checkUserAccountExist.id}:token`
      const cipherResult: string = await this.redis.get(cipherKey)

      const jwtPayload: Record<string, any> = {
        id: checkUserAccountExist.id,
        email: checkUserAccountExist.email,
        expired: 0,
      }

      if (!cipherResult) {
        const jwtAccessToken: string = await this.jwt.sign(checkUserAccountExist.id, jwtPayload)
        jwtPayload.token = jwtAccessToken
      } else {
        jwtPayload.token = cipherResult
      }

      const jwtExpired: number = await await this.redis.ttl(cipherKey)
      const jwtExpiredDate: Date = new Date()

      jwtExpiredDate.setSeconds(jwtExpired)
      jwtPayload.expired = moment(jwtExpiredDate).format('YYYY-MM-DD HH:mm:ss')

      delete jwtPayload.id

      return apiResponse({ stat_code: status.OK, message: 'Refresh token successfully', data: jwtPayload })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
