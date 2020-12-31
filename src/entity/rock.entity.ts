import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { SourceEntity } from '@/entity/source.entity'
import { ProductEntity } from '@/entity/product.entity'
import { AdminEntity } from '@/entity/admin.entity'

@Entity('rock')
export class RockEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '名称' })
	name: string

	@Column({ comment: '状态', default: 1 })
	status: number

	@ManyToOne(
		type => SourceEntity,
		source => source.rock
	)
	source: SourceEntity

	@OneToMany(
		type => ProductEntity,
		product => product.rock
	)
	product: ProductEntity[]

	@ManyToOne(
		type => AdminEntity,
		admin => admin.rock
	)
	admin: AdminEntity
}
