import { EntityManager, Repository } from 'typeorm'
import { Inject, Injectable } from '~/helpers/helper.di'
import { Role } from '~/entities/entity.role'

@Injectable()
export class RoleRepository {
	readonly connection: Repository<Role>

	constructor(@Inject('EntityManager') private readonly manager: EntityManager) {
		this.connection = this.manager.getRepository(Role)
	}
}
