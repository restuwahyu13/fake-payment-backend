import { Injectable, Container } from './helper.di'
import { Request } from 'express'

@Injectable()
export class RequestMetadata {
  req(): Request {
    return Container.resolve<Request>('Req')
  }
}
