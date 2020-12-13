import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BannerEntity } from '@/entity/banner.entity'
import { AdminEntity } from '@/entity/admin.entity'
import { ProductEntity } from '@/entity/product.entity'
import * as Face from '@/web-module/banner/banner.dto'

@Injectable()
export class BannerService {
	constructor(
		@InjectRepository(BannerEntity) private readonly bannerModel: Repository<BannerEntity>,
		@InjectRepository(AdminEntity) private readonly adminModel: Repository<AdminEntity>,
		@InjectRepository(ProductEntity) private readonly productModel: Repository<ProductEntity>
	) {}

	//创建轮播图
	async createBanner(params: Face.CreateBannerDto, uid: number) {
		try {
			if (!(await this.productModel.findOne({ where: { id: params.proid } }))) {
				throw new HttpException(`proid: ${params.proid} 不存在`, HttpStatus.BAD_REQUEST)
			}

			if (await this.bannerModel.findOne({ where: { proid: params.proid } })) {
				throw new HttpException(`proid: ${params.proid} 已存在`, HttpStatus.BAD_REQUEST)
			}

			const banner = await this.bannerModel.create(params)
			const admin = await this.adminModel.findOne({ where: { uid } })
			return await this.bannerModel.save({ ...banner, admin })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
