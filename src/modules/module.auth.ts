import { Injectable, Module } from '~/helpers/helper.di'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'
import { Redis } from '~/libs/lib.redis'

@Module([
   {
      token: 'ValidatorMiddleware',
      useClass: ValidatorMiddleware,
   },
   {
      token: 'Redis',
      useClass: Redis,
   },
])
@Injectable()
export class AuthModule {}
