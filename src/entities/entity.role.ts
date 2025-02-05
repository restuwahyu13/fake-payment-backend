import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ERoleName, ERoleStatus } from '~/constants/const.role'

class DatabaseSchema extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ type: 'varchar', length: 50, unique: true, nullable: false })
	name!: ERoleName

	@Column({ type: 'varchar', nullable: false, default: ERoleStatus.ACTIVE })
	status!: ERoleStatus

	@CreateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
	created_at?: Date

	@UpdateDateColumn({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
	updated_at?: Date

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at?: Date

	@Column({ type: 'uuid', nullable: false })
	created_by: string

	@Column({ type: 'uuid', nullable: true })
	updated_by?: string

	@Column({ type: 'uuid', nullable: true })
	deleted_by?: string
}

@Entity()
export class Role extends DatabaseSchema {}
