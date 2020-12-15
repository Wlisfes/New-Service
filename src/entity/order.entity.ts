import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WheeEntity } from '@/entity/whee.entity'

@Entity('user-order')
export class OrderEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

	@ManyToOne(
		type => UserEntity,
		user => user.order
	)
	user: UserEntity

	@OneToMany(
		type => WheeEntity,
		whee => whee.order,
		{ cascade: true }
	)
	whee: WheeEntity[]

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string
}
