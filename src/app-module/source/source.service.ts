import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SourceEntity } from '@/entity/source.entity'

@Injectable()
export class SourceService {
	constructor(@InjectRepository(SourceEntity) public readonly sourceModel: Repository<SourceEntity>) {}

	//分类列表
	async sourceList() {
		try {
			return await this.sourceModel.find({ where: { status: 1 } })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
