import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { ProductEntity } from '@/entity/product.entity'
import * as day from 'dayjs'

@Entity('user-star')
export class UserStarEntity {
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

	@UpdateDateColumn({
		type: 'timestamp',
		comment: '更新时间'
	})
	updateTime: Date

	@ManyToOne(
		type => UserEntity,
		user => user.star
	)
	user: UserEntity

	@ManyToOne(
		type => ProductEntity,
		product => product.star
	)
	product: ProductEntity
}
