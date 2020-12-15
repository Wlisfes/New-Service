import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { CouponEntity } from '@/entity/user.coupon.entity'

@Entity('user-order')
export class OrderEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

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

	@OneToMany(
		type => CouponEntity,
		coupon => coupon,
		{ cascade: true }
	)
	coupon: CouponEntity[]
}
