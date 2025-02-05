import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from '~/entities/entity.user'

class DatabaseSchema extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ type: 'text', nullable: false })
	name!: string

	@Column({ type: 'varchar', length: 25, nullable: false })
	mime!: boolean

	@Column({ type: 'citext', unique: true, nullable: false })
	hash!: string

	@Column({ type: 'integer', unsigned: true, nullable: false })
	size!: string

	@Column({ type: 'text', nullable: false })
	url!: string

	@CreateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
	created_at?: Date

	@UpdateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
	updated_at?: Date

	@Column({ type: 'uuid', nullable: true })
	updated_by?: string
}

class RelationSchema extends DatabaseSchema {
	@ManyToOne(() => User, (entity) => entity.files, { onDelete: 'RESTRICT' })
	user?: User
}

@Entity()
export class File extends RelationSchema {}
