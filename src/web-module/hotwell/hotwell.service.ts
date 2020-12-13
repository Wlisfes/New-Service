import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HotwellEntity } from '@/entity/hotwell.entity'
import { ProductEntity } from '@/entity/product.entity'
import * as Dto from '@/web-module/hotwell/hotwell.dto'

@Injectable()
export class HotwellService {
	constructor(
		@InjectRepository(HotwellEntity) private readonly hotwellModel: Repository<HotwellEntity>,
		@InjectRepository(ProductEntity) private readonly productModel: Repository<ProductEntity>
	) {}

	//创建热销商品
	async createHotwell(params: Dto.CreateHotwell) {
		try {
			const product = await this.productModel.findOne({ where: { id: params.proid } })
			if (product) {
				const hotwell = await this.hotwellModel.findOne({ where: { product } })
				if (hotwell) {
					throw new HttpException(`proid: ${params.proid} 已经存在热销榜`, HttpStatus.BAD_REQUEST)
				}

				const newHotwell = await this.hotwellModel.create(params)
				return await this.hotwellModel.save({
					...newHotwell,
					product
				})
			}
			throw new HttpException(`proid: ${params.proid} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
