import { Injectable, Module } from '~/helpers/helper.di'
import { AuthMiddleware } from '~/middlewares/middleware.auth'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'

@Module([
	{
		token: 'ValidatorMiddleware',
		useClass: ValidatorMiddleware
	},
	{
		token: 'AuthMiddleware',
		useClass: AuthMiddleware
	}
])
@Injectable()
export class RecipientModule {}
