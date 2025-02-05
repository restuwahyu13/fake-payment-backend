import crypto from 'node:crypto'
import * as jose from 'jose'
import moment from 'moment-timezone'

import { Redis } from '~/libs/lib.redis'
import { Encryption } from '~/helpers/helper.encryption'
import { Jose } from '~/libs/lib.jose'
import { Environment } from '~/configs/config.env'
import { apiResponse } from '~/helpers/helper.apiResponse'

export interface ISecretMetadata {
  privKeyRaw: string
  pubKeyRaw: string
  cipherKey: string
}

export interface ISignatureMetadata {
  privKey?: crypto.KeyObject
  privKeyRaw: string
  sigKey: string
  cipherKey: string
  jweKey: jose.FlattenedJWE
}

export class JsonWebToken {
  private redis: InstanceType<typeof Redis> = new Redis()
  private keyLength: number = 4096
  private jwtExpired: number = Environment.JWT_EXPIRED
  private certMetadata: ISecretMetadata = {
    privKeyRaw: '',
    pubKeyRaw: '',
    cipherKey: '',
  }
  private sigMetadata: ISignatureMetadata = {
    privKeyRaw: '',
    privKey: {} as any,
    sigKey: '',
    cipherKey: '',
    jweKey: {} as any,
  }

  private createSecret(prefix: string, body: string): ISecretMetadata {
    try {
      const randomString: string = crypto.randomBytes(16).toString('hex')

      const cipherTextRandom: string = `${prefix}:${body}:${randomString}:${this.jwtExpired}`
      const cipherTextData: string = Buffer.from(cipherTextRandom).toString('hex')

      const cipherSecretKey: string = crypto.createHash('SHA512').update(cipherTextData).digest().toString('hex')
      const cipherText: string = crypto.createHash('SHA512').update(randomString).digest().toString('hex')
      const cipherKey: string = Encryption.AES256Encrypt(cipherSecretKey, cipherText).toString('hex')

      const genCert: crypto.KeyPairSyncResult<string, string> = crypto.generateKeyPairSync('rsa', {
        modulusLength: this.keyLength,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: cipherKey,
        },
      })

      this.certMetadata = {
        privKeyRaw: genCert.privateKey,
        pubKeyRaw: genCert.publicKey,
        cipherKey: cipherKey,
      }

      return this.certMetadata
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  private async createSignature(prefix: string, body: any): Promise<ISignatureMetadata> {
    try {
      const signatureKey: string = `${prefix}:credential`
      const signatureField: string = 'signature_metadata'

      body = Buffer.from(JSON.stringify(body))
      const secretKey: ISecretMetadata = this.createSecret(prefix, body)

      const rsaPrivateKey: crypto.KeyObject = crypto.createPrivateKey({
        key: Buffer.from(secretKey.privKeyRaw),
        type: 'pkcs8',
        format: 'pem',
        passphrase: secretKey.cipherKey,
      })

      const rsaPublicKey: crypto.KeyObject = crypto.createPublicKey({
        key: Buffer.from(secretKey.pubKeyRaw),
        type: 'pkcs1',
        format: 'pem',
      })

      const cipherHash512: Buffer = crypto.sign('RSA-SHA512', body, rsaPrivateKey)
      const signatureOutput: string = cipherHash512.toString('hex')

      const verifiedSignature = crypto.verify('RSA-SHA512', body, rsaPublicKey, cipherHash512)
      if (!verifiedSignature) throw new Error('Invalid signature')

      const jweKey: jose.FlattenedJWE = await Jose.JweEncrypt(rsaPrivateKey, signatureOutput)
      if (!jweKey) throw new Error('Invalid encrypt')

      this.sigMetadata = {
        privKeyRaw: secretKey.privKeyRaw,
        sigKey: signatureOutput,
        cipherKey: secretKey.cipherKey,
        jweKey: jweKey,
      }

      await this.redis.hsetEx(signatureKey, signatureField, this.jwtExpired, this.sigMetadata)
      this.sigMetadata.privKey = rsaPrivateKey

      return this.sigMetadata
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async sign(prefix: string, body: any): Promise<string> {
    try {
      const tokenKey: string = `${prefix}:token`
      const tokenExist: number = await this.redis.exists(tokenKey)

      if (tokenExist < 1) {
        const signature: ISignatureMetadata = await this.createSignature(prefix, body)
        const timestamp: string = moment().format('YYYY/MM/DD HH:mm:ss')

        const aud: string = signature.sigKey.substring(10, 25)
        const iss: string = signature.sigKey.substring(20, 35)
        const sub: string = signature.sigKey.substring(40, 55)

        const secretKey: string = `${aud}:${iss}:${sub}:${this.jwtExpired}`
        const secretData: string = Buffer.from(secretKey).toString('hex')

        const jti: string = Encryption.AES256Encrypt(secretData, prefix).toString('hex')

        const iat: number = Math.floor(Date.now() / 1000) + 60 * 60
        const exp: number = iat + this.jwtExpired

        const tokenData: string = await Jose.JwtSign(
          signature.privKey,
          signature.jweKey.ciphertext,
          { timestamp: timestamp },
          {
            jti: jti,
            aud: aud,
            iss: iss,
            sub: sub,
            iat: iat,
            exp: exp,
          },
        )

        this.redis.setEx(tokenKey, this.jwtExpired, tokenData)

        return tokenData
      } else {
        return this.redis.get(tokenKey)
      }
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  verify(prefix: string, token: string): Promise<jose.JWTVerifyResult<jose.JWTPayload>> {
    try {
      return new Jose().JwtVerify(prefix, token)
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
