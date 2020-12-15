import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm'
import { UserStarEntity } from '@/entity/user.star.entity'
import { AddressEntity } from '@/entity/user.address.entity'
import { WheeEntity } from '@/entity/whee.entity'

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

	@Column({ comment: 'openid', readonly: true })
	openid: string

	@Column({ comment: '昵称', nullable: false })
	nickname: string

	@Column({ comment: '头像', nullable: true })
	avatar: string

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

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
}
