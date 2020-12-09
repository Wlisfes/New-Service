import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { AdminEntity } from '@/entity/admin.entity'

@Entity('banner')
export class BannerEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({
		comment: '图片',
		default: '',
		nullable: false
	})
	picUrl: string

	@Column({
		comment: '状态',
		default: () => 1,
		nullable: false
	})
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
		admin => admin.banner
	)
	admin: AdminEntity
}
