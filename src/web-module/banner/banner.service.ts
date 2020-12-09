import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BannerEntity } from '@/entity/banner.entity'

@Injectable()
export class BannerService {
	constructor(@InjectRepository(BannerEntity) private readonly bannerModel: Repository<BannerEntity>) {}

	//创建轮播图
	async createBanner() {
		try {
			const banner = await this.bannerModel.create({
				picUrl: ''
			})
			return await this.bannerModel.save(banner)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
