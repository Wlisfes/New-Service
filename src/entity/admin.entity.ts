import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm'
import { hashSync } from 'bcryptjs'
import { BannerEntity } from '@/entity/banner.entity'

@Entity('admin')
export class AdminEntity {
	@BeforeInsert()
	async BeforeCreate() {
		this.uid = Date.now()
	}

	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({
		type: 'double',
		comment: 'uid',
		readonly: true
	})
	uid: number

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
		comment: '昵称',
		nullable: false
	})
	nickname: string

	@Column({
		comment: '头像',
		nullable: true
	})
	avatar: string | null

	@Column({
		type: 'enum',
		comment: '状态',
		default: 1,
		enum: [0, 1],
		nullable: false
	})
	status: 0 | 1

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
}
