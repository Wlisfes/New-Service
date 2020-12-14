import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, BeforeInsert } from 'typeorm'

@Entity('user')
export class UserEntity {
	@BeforeInsert()
	async BeforeCreate() {
		this.uid = Date.now()
	}

	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ type: 'double', comment: 'uid', readonly: true })
	uid: number

	@Column({ comment: 'openid', readonly: true })
	openid: string

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
		default: null,
		transformer: {
			from: value => (value ? Number(value) : null),
			to: value => (value ? String(value) : null)
		}
	})
	mobile: string

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string
}
