import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { OrderEntity } from '@/entity/order.entity'

@Entity('user-wallet')
export class WalletEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ type: 'double', comment: '钱包余额', default: 0 })
	balance: number

	@Column({ type: 'double', comment: '消费金额', default: 0 })
	consume: number

	@Column({ comment: '文字说明', nullable: false })
	context: string

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@OneToOne(type => OrderEntity)
	@JoinColumn()
	order: OrderEntity

	@ManyToOne(
		type => UserEntity,
		user => user.wallet
	)
	user: UserEntity
}
