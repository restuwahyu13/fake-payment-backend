import { EntityManager, Repository } from 'typeorm'
import { Inject, Injectable } from '~/helpers/helper.di'
import { File } from '~/entities/entity.file'

@Injectable()
export class FileRepository {
	readonly connection: Repository<File>

	constructor(@Inject('EntityManager') private readonly manager: EntityManager) {
		this.connection = this.manager.getRepository(File)
	}
}
