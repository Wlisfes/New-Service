import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { ProductEntity } from '@/entity/product.entity'
import { ProductFormatAttrEntity } from '@/entity/product.format.attr.entity'

@Entity('product-format')
export class ProductFormatEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '规则值id', nullable: false })
	format_id: string

	@ManyToOne(
		type => ProductEntity,
		product => product.format
	)
	product: ProductEntity

	@OneToMany(
		type => ProductFormatAttrEntity,
		product => product.format,
		{ cascade: true }
	)
	attr: ProductFormatAttrEntity[]
}
