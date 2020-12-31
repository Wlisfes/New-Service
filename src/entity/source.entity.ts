import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { ProductEntity } from '@/entity/product.entity'
import { CouponEntity } from '@/entity/coupon.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { RockEntity } from '@/entity/rock.entity'

@Entity('source')
export class SourceEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '类型名称', nullable: false })
	name: string

	@Column({ comment: '图片', nullable: false })
	picUrl: string

	@Column({ comment: '说明', nullable: false })
	comment: string

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@ManyToOne(
		type => AdminEntity,
		admin => admin.source
	)
	admin: AdminEntity

	@OneToMany(
		type => ProductEntity,
		product => product.source
	)
	product: ProductEntity[]

	@OneToMany(
		type => UserCouponEntity,
		coupon => coupon.source
	)
	userCoupon: UserCouponEntity[]

	@OneToMany(
		type => CouponEntity,
		coupon => coupon.source
	)
	coupon: CouponEntity[]

	@OneToMany(
		type => RockEntity,
		rock => rock.source
	)
	rock: RockEntity[]
}
