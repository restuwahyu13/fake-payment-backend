import * as argon2 from 'argon2'
import { Environment } from '~/configs/config.env'

export class Argon {
	private static secretKey: Buffer = Buffer.from(Environment.ARGON_SECRET_KEY)

	static hash(password: string): Promise<string> {
		return argon2.hash(password, {
			secret: Argon.secretKey,
			salt: Argon.secretKey,
			hashLength: Argon.secretKey.length * 2,
			type: argon2.argon2id
		})
	}

	static verify(password: string, hashPassword: string): Promise<boolean> {
		return argon2.verify(hashPassword, password, { secret: Argon.secretKey })
	}
}
