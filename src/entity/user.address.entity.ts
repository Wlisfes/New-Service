import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'

@Entity('user-address')
export class AddressEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '收货人', nullable: true })
	name: string

	@Column({ comment: '所在地区', nullable: true })
	region: string

	@Column({ comment: '详细地址', nullable: true })
	address: string

	@Column({ comment: '是否默认地址', nullable: true, default: 0 })
	checked: number

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

	@ManyToOne(
		type => UserEntity,
		user => user.star
	)
	user: UserEntity
}
