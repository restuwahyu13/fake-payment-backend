import { DependencyContainer } from 'tsyringe'
import { Injectable, Module } from '~/helpers/helper.di'
import { Database } from '~/configs/config.postgres'

import { RepositoryModule } from '~/module.repository'
import { RouteModule } from '~/module.route'
import { AccountModule } from '~/modules/module.account'
import { AuthModule } from '~/modules/module.auth'
import { PaymentModule } from '~/modules/module.payment'
import { PricingModule } from '~/modules/module.pricing'
import { ReceivingModule } from '~/modules/module.receiving'
import { RecipientModule } from '~/modules/module.recipient'
import { TransactionModule } from '~/modules/module.transaction'

import { User } from '~/entities/entity.user'
import { UserActivity } from '~/entities/entity.userAcivity'
import { Role } from '~/entities/entity.role'
import { UserRole } from '~/entities/entity.userRole'
import { File } from '~/entities/entity.file'

@Module([
	{
		token: 'Connection',
		useFactory: (dc: DependencyContainer) => {
			return dc.resolve(Database).initialize([User, UserActivity, Role, UserRole, File])
		}
	},
	{
		token: 'RepositoryModule',
		useClass: RepositoryModule
	},
	{
		token: 'RouteModule',
		useClass: RouteModule
	},
	{
		token: 'AccountModule',
		useClass: AccountModule
	},
	{
		token: 'AuthModule',
		useClass: AuthModule
	},
	{
		token: 'PaymentModule',
		useClass: PaymentModule
	},
	{
		token: 'PricingModule',
		useClass: PricingModule
	},
	{
		token: 'ReceivingModule',
		useClass: ReceivingModule
	},
	{
		token: 'RecipientModule',
		useClass: RecipientModule
	},
	{
		token: 'TransactionModule',
		useClass: TransactionModule
	}
])
@Injectable()
export class AppModule {}
