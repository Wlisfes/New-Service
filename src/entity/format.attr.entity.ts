import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { FormatEntity } from '@/entity/format.entity'

@Entity('format-attr')
export class FormatAttrEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '规则值', nullable: false })
	name: string

	@Column({ comment: '规则值状态', nullable: false, default: 1 })
	status: number

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@ManyToOne(
		type => FormatEntity,
		admin => admin.attr
	)
	format: FormatEntity
}
