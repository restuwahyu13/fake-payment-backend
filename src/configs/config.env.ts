import 'dotenv/config'

export class Environment {
  static readonly NODE_ENV: string = process.env.NODE_ENV
  static readonly SINGLE_THREAD: boolean = JSON.parse(process.env.SINGLE_THREAD || 'true')
  static readonly PORT: number = +process.env.PORT! || 3000
  static readonly REDIS_URL: string = process.env.REDIS_URL
  static readonly POSTGRES_HOST: string = process.env.POSTGRES_HOST
  static readonly POSTGRES_PORT: number = +process.env.POSTGRES_PORT || 5432
  static readonly POSTGRES_USERNAME: string = process.env.POSTGRES_USERNAME
  static readonly POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD
  static readonly POSTGRES_DB: string = process.env.POSTGRES_DB
  static readonly POSTGRES_SYNC: boolean = JSON.parse(process.env.POSTGRES_SYNC || 'false')
  static readonly JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY
  static readonly JWT_EXPIRED: number = +process.env.JWT_EXPIRED || 3600
  static readonly ARGON_SECRET_KEY: string = process.env.ARGON_SECRET_KEY
}
