import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { FormatAttrEntity } from '@/entity/format.attr.entity'

@Entity('format')
export class FormatEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '规则名称', nullable: false })
	name: string

	@Column({ comment: '规则状态', nullable: false, default: 1 })
	status: number

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@OneToMany(
		type => FormatAttrEntity,
		product => product.format,
		{ cascade: true }
	)
	attr: FormatAttrEntity[]
}
