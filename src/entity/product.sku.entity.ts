import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { ProductEntity } from '@/entity/product.entity'

@Entity('product-sku')
export class ProductSkuEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ nullable: false, comment: 'suk组合id' })
	skukey: string

	@Column({ nullable: false, comment: 'suk组合名称' })
	skuname: string

	@Column({ nullable: false, default: 0, comment: '价格' })
	price: number

	@Column({ nullable: false, default: 0, comment: '成本价' })
	costprice: number

	@Column({ nullable: false, default: 0, comment: '库存' })
	stock: number

	@Column({ nullable: false, default: 0, comment: '销量' })
	sales: number

	@Column({ nullable: false, comment: '规格编码' })
	coding: string

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
}
