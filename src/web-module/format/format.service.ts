import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { FormatEntity } from '@/entity/format.entity'
import { FormatAttrEntity } from '@/entity/format.attr.entity'
import * as Dto from '@/web-module/format/format.dto'

@Injectable()
export class FormatService {
	constructor(
		@InjectRepository(AdminEntity) private readonly adminModel: Repository<AdminEntity>,
		@InjectRepository(FormatEntity) public readonly formatModel: Repository<FormatEntity>,
		@InjectRepository(FormatAttrEntity) private readonly formatAttrModel: Repository<FormatAttrEntity>
	) {}

	//创建规则名称
	async createFormat(params: Dto.CreateFormat) {
		try {
			if (await this.formatModel.findOne({ where: { name: params.name } })) {
				throw new HttpException(`规则名称: ${params.name} 已存在`, HttpStatus.BAD_REQUEST)
			}
			const format = await this.formatModel.create(params)
			return await this.formatModel.save(format)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//创建规则值
	async createFormatAttr(params: Dto.CreateFormatAttr) {
		try {
			if (await this.formatAttrModel.findOne({ where: { name: params.name } })) {
				throw new HttpException(`规则值: ${params.name} 已存在`, HttpStatus.BAD_REQUEST)
			}
			const formatAttr = await this.formatAttrModel.create(params)
			const format = await this.formatModel.findOne({ where: { id: params.formatId } })
			return await this.formatAttrModel.save({ ...formatAttr, format })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//获取规则列表
	async formatList() {
		try {
			return await this.formatModel.find()
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//获取规则值列表
	async formatAttrList(id: number) {
		try {
			const format = await this.formatModel.findOne({ where: { id } })
			if (format) {
				return await this.formatAttrModel.find({ where: { format } })
			}
			throw new HttpException(`id: ${id} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
