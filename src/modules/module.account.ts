import { Injectable, Module } from '~/helpers/helper.di'
import { UserMetadata } from '~/helpers/helper.userMetadata'
import { AuthMiddleware } from '~/middlewares/middleware.auth'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'

@Module([
  {
    token: 'ValidatorMiddleware',
    useClass: ValidatorMiddleware,
  },
  {
    token: 'AuthMiddleware',
    useClass: AuthMiddleware,
  },
  {
    token: 'UserMetadata',
    useClass: UserMetadata,
  },
])
@Injectable()
export class AccountModule {}
