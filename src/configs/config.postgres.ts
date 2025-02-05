import { DataSource, EntitySchema, MixedList } from 'typeorm'

import { Environment } from '~/configs/config.env'
import { Injectable } from '~/helpers/helper.di'

@Injectable()
export class Database {
  initialize(entities: MixedList<Function | string | EntitySchema>): DataSource {
    return new DataSource({
      type: 'postgres',
      host: Environment.POSTGRES_HOST,
      port: Environment.POSTGRES_PORT,
      username: Environment.POSTGRES_USERNAME,
      password: Environment.POSTGRES_PASSWORD,
      database: Environment.POSTGRES_DB,
      entities: entities,
      synchronize: Environment.POSTGRES_SYNC,
      logger: !['production', 'staging'].includes(Environment.NODE_ENV) ? 'advanced-console' : undefined,
      logging: !['production', 'staging'].includes(Environment.NODE_ENV) ? true : false,
      ssl: !['production', 'staging'].includes(Environment.NODE_ENV) ? false : { rejectUnauthorized: false, noDelay: true },
    })
  }
}
