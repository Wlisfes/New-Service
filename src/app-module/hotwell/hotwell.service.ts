import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HotwellEntity } from '@/entity/hotwell.entity'

@Injectable()
export class HotwellService {
	constructor(@InjectRepository(HotwellEntity) public readonly hotwellModel: Repository<HotwellEntity>) {}

	//热销列表
	async hotwellList() {
		try {
			return await this.hotwellModel.find({
				where: { status: 1 },
				relations: ['product']
			})
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
