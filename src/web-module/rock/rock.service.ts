import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { RockEntity } from '@/entity/rock.entity'
import { SourceEntity } from '@/entity/source.entity'
import * as Dto from '@/web-module/rock/rock.dto'

@Injectable()
export class RockService {
	constructor(
		@InjectRepository(RockEntity) public readonly rockModel: Repository<RockEntity>,
		@InjectRepository(AdminEntity) public readonly adminModel: Repository<AdminEntity>,
		@InjectRepository(SourceEntity) public readonly sourceModel: Repository<SourceEntity>
	) {}

	//创建类型
	async createRock(params: Dto.CreateRock, uid: number) {
		try {
			if (await this.rockModel.findOne({ where: { name: params.name, status: 1 } })) {
				throw new HttpException(`${params.name} 已存在`, HttpStatus.BAD_REQUEST)
			}

			const source = await this.sourceModel.findOne({ where: { id: params.source, status: 1 } })
			if (!source) {
				throw new HttpException(`source: ${params.source}错误`, HttpStatus.BAD_REQUEST)
			}

			const admin = await this.adminModel.findOne({ where: { uid } })
			const rock = await this.rockModel.create({
				name: params.name,
				status: params.status,
				source,
				admin
			})
			return await this.rockModel.save(rock)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//获取类型
	async sourceRock(id: number) {
		try {
			const source = await this.sourceModel.findOne({ where: { id } })
			return await this.rockModel.find({ where: { source, status: 1 } })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
