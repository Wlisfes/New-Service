import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SourceEntity } from '@/entity/source.entity'
import { ProductEntity } from '@/entity/product.entity'

@Injectable()
export class SourceService {
	constructor(
		@InjectRepository(SourceEntity) public readonly sourceModel: Repository<SourceEntity>,
		@InjectRepository(ProductEntity) public readonly productModel: Repository<ProductEntity>
	) {}

	//分类列表
	async sourceList() {
		try {
			return await this.sourceModel.find({ where: { status: 1 } })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//根据分类筛选商品
	async sourceProduct() {}
}
