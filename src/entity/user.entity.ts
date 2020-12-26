import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm'
import { UserStarEntity } from '@/entity/user.star.entity'
import { AddressEntity } from '@/entity/user.address.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { OrderEntity } from '@/entity/order.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { WalletEntity } from '@/entity/wallet.entity'
import { hashSync } from 'bcryptjs'

@Entity('user')
export class UserEntity {
	@BeforeInsert()
	async BeforeCreate() {
		this.uid = Date.now()
	}

	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ type: 'double', comment: 'uid', readonly: true })
	uid: number

	@Column({ type: 'double', comment: '钱包余额', default: 0 })
	balance: number

	@Column({ comment: 'openid', readonly: true })
	openid: string

	@Column({ comment: '昵称', nullable: false })
	nickname: string

	@Column({ comment: '头像', nullable: true })
	avatar: string

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

	@Column({
		comment: '密码',
		nullable: true,
		transformer: {
			from: value => value,
			to: value => (value ? hashSync(value) : null)
		},
		default: null
	})
	password: string

	@Column({
		comment: '手机号',
		length: 11,
		nullable: true,
		default: null,
		transformer: {
			from: value => (value ? Number(value) : null),
			to: value => (value ? String(value) : null)
		}
	})
	mobile: string

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@OneToMany(
		type => UserStarEntity,
		star => star.user,
		{ cascade: true }
	)
	star: UserStarEntity[]

	@OneToMany(
		type => WheeEntity,
		address => address.user,
		{ cascade: true }
	)
	address: AddressEntity[]

	@OneToMany(
		type => AddressEntity,
		whee => whee.user,
		{ cascade: true }
	)
	whee: AddressEntity[]

	@OneToMany(
		type => OrderEntity,
		order => order.user,
		{ cascade: true }
	)
	order: OrderEntity[]

	@OneToMany(
		type => UserCouponEntity,
		order => order.user,
		{ cascade: true }
	)
	coupon: UserCouponEntity[]

	@OneToMany(
		type => WalletEntity,
		wallet => wallet.user,
		{ cascade: true }
	)
	wallet: WalletEntity[]
}
