import IORedis from 'ioredis'
import { Environment } from '~/configs/config.env'
import { apiResponse } from '~/helpers/helper.apiResponse'
import { Injectable } from '~/helpers/helper.di'

@Injectable()
export class Redis {
  constructor() {}

  private config(): IORedis {
    return new IORedis(Environment.REDIS_URL)
  }

  ttl(key: string): Promise<number> {
    try {
      return this.config().ttl(key)
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  exists(key: string): Promise<number> {
    try {
      return this.config().exists(key)
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  del(key: string): Promise<number> {
    try {
      return this.config().del(key)
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  setEx(key: string, expired: number, data: string | number): Promise<string> {
    try {
      return this.config().setex(key, expired, data)
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  set(key: string, data: string | number): Promise<string> {
    try {
      return this.config().set(key, data)
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  get(key: string): Promise<string> {
    try {
      return this.config().get(key)
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  hset(key: string, field: string, data: Record<string, any>): Promise<number> {
    try {
      return this.config().hset(key, { [field]: JSON.stringify(data) })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  hsetEx(key: string, field: string, exp: number, data: Record<string, any>): Promise<number> {
    try {
      return this.config()
        .hset(key, { [field]: JSON.stringify(data) })
        .then(() => this.config().expire(key, exp))
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  hget(key: string, field: string): Promise<any> {
    try {
      return this.config()
        .hget(key, field)
        .then((val: string) => JSON.parse(val))
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  hexists(key: string, field: string): Promise<number> {
    try {
      return this.config().hexists(key, field)
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
