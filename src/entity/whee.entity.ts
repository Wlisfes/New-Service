import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { ProductEntity } from '@/entity/product.entity'

@Entity('user-whee')
export class WheeEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '商品状态', nullable: false, default: 1 })
	status: number

	@Column({ comment: '商品sku-id', nullable: false })
	skuid: number

	@Column({ comment: '商品sku编码', nullable: false })
	skucode: string

	@Column({ comment: '商品数量', nullable: false, default: 1 })
	some: number

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@ManyToOne(
		type => ProductEntity,
		product => product.sku
	)
	product: ProductEntity

	@ManyToOne(
		type => UserEntity,
		user => user.whee
	)
	user: UserEntity
}
