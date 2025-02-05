import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

class DatabaseSchema extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ type: 'uuid', unique: true, nullable: false })
	role_id!: string

	@Column({ type: 'uuid', nullable: false })
	user_id!: string

	@CreateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
	created_at?: Date
}

@Entity()
export class UserRole extends DatabaseSchema {}
