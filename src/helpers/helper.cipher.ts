import crypto from 'node:crypto'
import { JwtTransform } from 'jwt-transform'
import { apiResponse } from '~/helpers/helper.apiResponse'

export class Cipher {
   static base64Encode(plainText: string): string {
      const buffer: Buffer = Buffer.from(plainText)
      return buffer.toString('base64')
   }

   static base64Decode(cipherText: string): string {
      const buffer: Buffer = Buffer.from(cipherText, 'base64')
      return buffer.toString('utf8')
   }

   static encodeRotation(plainText: string): string {
      const payload: string = `${plainText}:${crypto.randomBytes(16).toString('hex')}`
      const base64Encode: string = Cipher.base64Encode(payload)

      let rotation: number = base64Encode.length + 32
      rotation = rotation % base64Encode.length

      return Cipher.caesarEncrypt(base64Encode.slice(rotation) + base64Encode.slice(0, rotation), 26)
   }

   static decodeRotation(cipherText: string): string {
      const decrypted: string = Cipher.caesarDecrypt(cipherText, 26)

      let rotation: number = cipherText.length + 32
      rotation = rotation % decrypted.length

      return Cipher.base64Decode(decrypted.slice(decrypted.length - rotation) + decrypted.slice(0, decrypted.length - rotation))
   }

   static caesarEncrypt(plainText: string, rotation: number): string {
      let result = ''

      for (let i = 0; i < plainText.length; i++) {
         const charCode: number = plainText.charCodeAt(i)

         if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 + rotation) % 26) + 65)
         } else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 + rotation) % 26) + 97)
         } else {
            result += plainText.charAt(i)
         }
      }

      return result
   }

   static caesarDecrypt(cipherText: string, rotation: number): string {
      let result: string = ''

      for (let i = 0; i < cipherText.length; i++) {
         const charCode: number = cipherText.charCodeAt(i)

         if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 - rotation + 26) % 26) + 65)
         } else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 - rotation + 26) % 26) + 97)
         } else {
            result += cipherText.charAt(i)
         }
      }

      return result
   }

   static transform(secretKey: string, plainText: string, rotate: number): string {
      try {
         return JwtTransform.transform(secretKey, plainText, rotate)
      } catch (e: any) {
         throw apiResponse(e)
      }
   }

   static untransform(secretKey: string, cipherText: string, rotate: number): string {
      try {
         return JwtTransform.untransform(secretKey, cipherText, rotate)
      } catch (e: any) {
         throw apiResponse(e)
      }
   }
}
