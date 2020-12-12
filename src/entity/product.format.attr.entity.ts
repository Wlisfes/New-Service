import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { ProductFormatEntity } from '@/entity/product.format.entity'

@Entity('product-format-attr')
export class ProductFormatAttrEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '规则值id', nullable: false })
	attrId: number

	@Column({ comment: '规则值', nullable: false })
	name: string

	@Column({ comment: '规则值状态', nullable: false, default: 1 })
	status: number

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@ManyToOne(
		type => ProductFormatEntity,
		productFormat => productFormat.attr
	)
	format: ProductFormatEntity
}
