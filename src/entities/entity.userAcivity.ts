import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '~/entities/entity.user'

class DatabaseSchema extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ type: 'uuid', nullable: false })
	user_id!: string

	@Column({ type: 'cidr', nullable: false })
	ip_address!: string

	@Column({ type: 'text', nullable: false })
	user_agent!: string

	@Column({ type: 'timestamptz', nullable: false })
	login_time: Date

	@Column({ type: 'timestamptz', nullable: true })
	logout_time?: Date

	@CreateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
	created_at?: Date

	@Column({ type: 'uuid', nullable: false })
	created_by: string
}

class RelationSchema extends DatabaseSchema {
	@ManyToOne(() => User, (entity) => entity.userActivitys)
	user?: User
}

@Entity()
export class UserActivity extends RelationSchema {}
