import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { EUserStatus } from '~/constants/const.user'
import { UserActivity } from '~/entities/entity.userAcivity'
import { File } from '~/entities/entity.file'

class DatabaseSchema extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ type: 'varchar', length: 100, nullable: false })
	first_name: string

	@Column({ type: 'varchar', length: 100, nullable: false })
	last_name: string

	@Column({ type: 'varchar', length: 50, unique: true, nullable: false })
	email!: string

	@Column({ type: 'varchar', length: 50, unique: true, nullable: false })
	mobile!: string

	@Column({ type: 'text', nullable: false })
	password!: string

	@Column({ type: 'varchar', length: 50, nullable: true, default: EUserStatus.ACTIVE })
	status?: EUserStatus

	@Column({ type: 'timestamptz', nullable: true })
	verified_time?: Date

	@Column({ type: 'uuid', nullable: true })
	avatar_id?: string

	@CreateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
	created_at?: Date

	@UpdateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
	updated_at?: Date

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at?: Date
}

class RelationSchema extends DatabaseSchema {
	@OneToMany(() => UserActivity, (entity) => entity.user)
	userActivitys?: UserActivity[]

	@OneToMany(() => UserActivity, (entity) => entity.user)
	files?: File[]
}

@Entity()
export class User extends RelationSchema {}
