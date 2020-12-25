import { Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm'
import { Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { AddressEntity } from '@/entity/user.address.entity'

@Entity('user-order')
export class OrderEntity {
	@BeforeInsert()
	async BeforeCreate() {
		const date = new Date()
		const y = date.getFullYear()
		const m = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
		const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
		const t = date.getTime()

		this.order = `${y}${m}${d}${t}`
	}

	@Column({ comment: '订单号', readonly: true })
	order: string

	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '合计金额', nullable: false, default: 0 })
	total: number

	@Column({ comment: '优惠金额', nullable: false, default: 0 })
	discount: number

	@Column({ comment: '买家留言' })
	leave: string

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

	@Column({ comment: '状态', nullable: true })
	coupid: number

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
		whee => whee.order
	)
	whee: WheeEntity[]

	@OneToOne(
		type => UserCouponEntity,
		coupon => coupon.order
	)
	@JoinColumn()
	coupon: UserCouponEntity

	@ManyToOne(
		type => AddressEntity,
		address => address.order
	)
	address: AddressEntity
}
