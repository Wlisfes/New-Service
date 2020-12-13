import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { ProductEntity } from '@/entity/product.entity'

@Entity('hotwell')
export class HotwellEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '热销状态', nullable: false, default: 1 })
	status: number

	@Column({ comment: '热销开始时间 YYYY-MM-DD HH:mm:ss', nullable: false })
	startTime: string

	@Column({ comment: '热销结束时间 YYYY-MM-DD HH:mm:ss', nullable: false })
	endTime: string

	@OneToOne(
		type => ProductEntity,
		product => product.hotwell
	)
	@JoinColumn()
	product: ProductEntity
}
