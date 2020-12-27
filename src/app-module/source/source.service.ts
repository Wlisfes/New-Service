import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SourceEntity } from '@/entity/source.entity'
import { ProductEntity } from '@/entity/product.entity'
import * as Dto from '@/app-module/source/source.dto'

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
	async sourceProduct(params: Dto.SourceProduct) {
		try {
			const offset = params.offset || 0
			const limit = params.limit || 10
			const order: any = (() => {
				switch (params.sort) {
					case 1:
						return { createTime: 'DESC' }
					case 2:
						return { sales: 'DESC' }
					case 3:
						return { price: 'ASC' }
				}
			})()
			const source = await this.sourceModel.findOne({ where: { id: params.source } })
			const total = (
				await this.productModel.find({
					where: {
						source,
						status: 1
					},
					order
				})
			).length
			const list = await this.productModel.find({
				where: {
					source,
					status: 1
				},
				relations: ['source', 'source.coupon'],
				order,
				skip: offset,
				take: limit
			})
			return { list, total }
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
