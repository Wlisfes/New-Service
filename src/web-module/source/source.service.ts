import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { SourceEntity } from '@/entity/source.entity'
import * as Dto from '@/web-module/source/source.dto'

@Injectable()
export class SourceService {
	constructor(
		@InjectRepository(AdminEntity) private readonly adminModel: Repository<AdminEntity>,
		@InjectRepository(SourceEntity) private readonly sourceModel: Repository<SourceEntity>
	) {}

	//创建分类
	async createSource(params: Dto.CreateSourceDto, uid: number) {
		try {
			if (await this.sourceModel.findOne({ where: { name: params.name } })) {
				throw new HttpException(`类型名称: ${params.name} 已存在`, HttpStatus.BAD_REQUEST)
			}
			const source = await this.sourceModel.create(params)
			const admin = await this.adminModel.findOne({ where: { uid } })
			const { id } = await this.sourceModel.save({ ...source, admin })
			return await this.sourceModel.findOne({ where: { id } })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
