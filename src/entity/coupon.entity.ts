import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { SourceEntity } from '@/entity/source.entity'
import { AdminEntity } from '@/entity/admin.entity'

@Entity('coupon')
export class CouponEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '最低满足金额', nullable: false, default: 1 })
	satisfy: number

	@Column({ comment: '折扣金额', nullable: false, default: 1 })
	discount: number

	@Column({ comment: '优惠劵说明', nullable: false })
	desc: string

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

	@Column({ comment: '优惠劵开始时间 YYYY-MM-DD HH:mm:ss', nullable: false })
	startTime: string

	@Column({ comment: '优惠劵结束时间 YYYY-MM-DD HH:mm:ss', nullable: false })
	endTime: string

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@ManyToMany(
		type => SourceEntity,
		source => source.coupon,
		{ cascade: true }
	)
	@JoinTable()
	source: SourceEntity[]

	@ManyToOne(
		type => AdminEntity,
		admin => admin.coupon
	)
	admin: AdminEntity
}
