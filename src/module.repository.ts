import { DependencyContainer } from 'tsyringe'
import { Injectable, Module } from '~/helpers/helper.di'

import { UserRepository } from '~/repositories/repository.user'
import { UserActivityRepository } from '~/repositories/repository.userAcivity'
import { RoleRepository } from '~/repositories/repository.role'
import { UserRoleRepository } from '~/repositories/repository.userRole'
import { FileRepository } from '~/repositories/repository.file'

@Module([
	{
		token: 'UserRepository',
		useFactory(dc: DependencyContainer) {
			return dc.resolve(UserRepository)
		}
	},
	{
		token: 'UserActivityRepository',
		useFactory(dc: DependencyContainer) {
			return dc.resolve(UserActivityRepository)
		}
	},
	{
		token: 'RoleRepository',
		useFactory(dc: DependencyContainer) {
			return dc.resolve(RoleRepository)
		}
	},
	{
		token: 'UserRoleRepository',
		useFactory(dc: DependencyContainer) {
			return dc.resolve(UserRoleRepository)
		}
	},
	{
		token: 'FileRepository',
		useFactory(dc: DependencyContainer) {
			return dc.resolve(FileRepository)
		}
	}
])
@Injectable()
export class RepositoryModule {}
