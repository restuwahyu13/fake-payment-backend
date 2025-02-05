import { EntityManager, Repository } from 'typeorm'
import { Inject, Injectable } from '~/helpers/helper.di'
import { User } from '~/entities/entity.user'

@Injectable()
export class UserRepository {
	readonly connection: Repository<User>

	constructor(@Inject('EntityManager') private readonly manager: EntityManager) {
		this.connection = this.manager.getRepository(User)
	}
}
