import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { HotwellEntity } from '@/entity/hotwell.entity'
import { AdminEntity } from '@/entity/admin.entity'
import { SourceEntity } from '@/entity/source.entity'
import { ProductFormatEntity } from '@/entity/product.format.entity'
import { ProductSkuEntity } from '@/entity/product.sku.entity'
import { UserStarEntity } from '@/entity/user.star.entity'
import { WheeEntity } from '@/entity/whee.entity'

@Entity('product')
export class ProductEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '封面图', nullable: false })
	picUrl: string

	@Column({ type: 'simple-array', nullable: false, comment: 'banner图片' })
	banner: string[]

	@Column({ type: 'simple-array', nullable: false, comment: '详情图片图片' })
	content: string[]

	@Column({ nullable: false, comment: '标题' })
	title: string

	@Column({ nullable: false, comment: '详情描述' })
	desc: string

	@Column({ default: 0, comment: '浏览量' })
	browse: number

	@Column({ default: 0, comment: '优惠价' })
	price: number

	@Column({ default: 0, comment: '原价' })
	suprice: number

	@Column({ comment: '规则状态', nullable: false, default: 1 })
	status: number

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@OneToOne(
		type => HotwellEntity,
		hotwell => hotwell.product
	)
	hotwell: HotwellEntity

	@ManyToOne(
		type => AdminEntity,
		admin => admin.product
	)
	admin: AdminEntity

	@ManyToOne(
		type => SourceEntity,
		source => source.product
	)
	source: SourceEntity

	@OneToMany(
		type => ProductFormatEntity,
		format => format.product,
		{ cascade: true }
	)
	format: ProductFormatEntity[]

	@OneToMany(
		type => ProductSkuEntity,
		sku => sku.product,
		{ cascade: true }
	)
	sku: ProductSkuEntity[]

	@OneToMany(
		type => UserStarEntity,
		star => star.product,
		{ cascade: true }
	)
	star: UserStarEntity[]

	@OneToMany(
		type => WheeEntity,
		whee => whee.product,
		{ cascade: true }
	)
	whee: WheeEntity[]
}
