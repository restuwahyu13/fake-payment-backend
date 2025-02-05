import { EntityManager, Repository } from 'typeorm'
import { UserActivity } from '~/entities/entity.userAcivity'
import { Inject, Injectable } from '~/helpers/helper.di'

@Injectable()
export class UserActivityRepository {
	readonly connection: Repository<UserActivity>

	constructor(@Inject('EntityManager') private readonly manager: EntityManager) {
		this.connection = this.manager.getRepository(UserActivity)
	}
}
