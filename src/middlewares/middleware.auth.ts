import { NextFunction, Request, Response } from 'express'
import { OutgoingMessage } from 'node:http'
import { StatusCodes as status } from 'http-status-codes'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import validator from 'validator'
import { JWTPayload, JWTVerifyResult } from 'jose'

import { apiResponse } from '~/helpers/helper.apiResponse'
import { Container, Injectable } from '~/helpers/helper.di'
import { Encryption } from '~/helpers/helper.encryption'
import { JsonWebToken } from '~/libs/lib.jwt'

@Injectable()
export class AuthMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> {
    try {
      const jwt: InstanceType<typeof JsonWebToken> = new JsonWebToken()
      const headers: Record<string, any> = req.headers

      if (!headers.hasOwnProperty('authorization')) {
        throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Authorization required' })
      } else if (!Array.isArray(headers.authorization.match('Bearer'))) {
        throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
      }

      let authToken: string = headers.authorization.split('Bearer ')[1]
      if (!validator.isJWT(authToken)) {
        throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
      }

      const jwtDecode: JwtPayload = jsonwebtoken.decode(authToken) as any
      if (!jwtDecode) {
        throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
      }

      const secretKey: string = Buffer.from(`${jwtDecode.aud}:${jwtDecode.iss}:${jwtDecode.sub}:${process.env.JWT_EXPIRED}`).toString('hex')
      const secretData: Buffer = Buffer.from(jwtDecode.jti, 'hex')
      const jti: string = Encryption.AES256Decrypt(secretKey, secretData).toString()

      const verifyRes: JWTVerifyResult<JWTPayload> = await jwt.verify(jti, authToken)
      if (!verifyRes) {
        throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
      }

      const userId: string = jti
      Container.register('User', { useValue: userId })
      Container.register('Req', { useValue: req })

      next()
    } catch (e: any) {
      return apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' }, res)
    }
  }
}
