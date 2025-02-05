import { EntityManager, Repository } from 'typeorm'
import { UserRole } from '~/entities/entity.userRole'
import { Inject, Injectable } from '~/helpers/helper.di'

@Injectable()
export class UserRoleRepository {
	readonly connection: Repository<UserRole>

	constructor(@Inject('EntityManager') private readonly manager: EntityManager) {
		this.connection = this.manager.getRepository(UserRole)
	}
}
