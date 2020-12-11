import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm'
import { hashSync } from 'bcryptjs'
import { BannerEntity } from '@/entity/banner.entity'
import { SourceEntity } from '@/entity/source.entity'
import { ProductEntity } from '@/entity/product.entity'

@Entity('admin')
export class AdminEntity {
	@BeforeInsert()
	async BeforeCreate() {
		this.uid = Date.now()
	}

	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ type: 'double', comment: 'uid', readonly: true })
	uid: number

	@Column({ comment: '昵称', nullable: false })
	nickname: string

	@Column({ comment: '头像', nullable: true })
	avatar: string

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

	@Column({
		comment: '手机号',
		length: 11,
		nullable: true,
		transformer: {
			from: value => (value ? Number(value) : null),
			to: value => String(value)
		}
	})
	mobile: string

	@Column({
		comment: '密码',
		nullable: false,
		transformer: {
			from: value => value,
			to: value => hashSync(value)
		}
	})
	password: string

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@OneToMany(
		type => BannerEntity,
		article => article.admin,
		{ cascade: true }
	)
	banner: BannerEntity[]

	@OneToMany(
		type => SourceEntity,
		article => article.admin,
		{ cascade: true }
	)
	source: SourceEntity[]

	@OneToMany(
		type => ProductEntity,
		product => product.admin,
		{ cascade: true }
	)
	product: ProductEntity[]
}
