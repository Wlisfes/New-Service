import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BannerEntity } from '@/entity/banner.entity'

@Injectable()
export class BannerService {
	constructor(@InjectRepository(BannerEntity) public readonly bannerModel: Repository<BannerEntity>) {}

	//获取banner图
	async bannerList() {
		try {
			return await this.bannerModel.find({ where: { status: 1 } })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
