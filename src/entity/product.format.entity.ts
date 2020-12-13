import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { ProductEntity } from '@/entity/product.entity'

interface Attr {
	attrId: number
	name: string
	status: number
}

@Entity('product-format')
export class ProductFormatEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '规则值id', nullable: false })
	formatId: number

	@Column({ comment: '规则值', nullable: false })
	name: string

	@Column('simple-array', {
		comment: '规则子列表',
		nullable: false,
		transformer: {
			from: value => JSON.parse(value),
			to: value => JSON.stringify(value)
		}
	})
	attr: Attr[]

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@ManyToOne(
		type => ProductEntity,
		product => product.format
	)
	product: ProductEntity
}
