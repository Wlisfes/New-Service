import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { ProductEntity } from '@/entity/product.entity'
import { UserStarEntity } from '@/entity/user.star.entity'
import { CouponEntity } from '@/entity/coupon.entity'
import * as Dto from '@/app-module/product/product.dto'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(UserEntity) private readonly userModel: Repository<UserEntity>,
		@InjectRepository(ProductEntity) private readonly productModel: Repository<ProductEntity>,
		@InjectRepository(UserStarEntity) private readonly userStarModel: Repository<UserStarEntity>,
		@InjectRepository(CouponEntity) private readonly couponModel: Repository<CouponEntity>
	) {}

	//商品详情
	async productInfo(id: number, uid?: number) {
		try {
			const product = await this.productModel.findOne({
				where: { id },
				relations: ['source', 'format', 'sku']
			})
			if (product) {
				if (uid) {
					const user = await this.userModel.findOne({ where: { uid } })
					const star = await this.userStarModel.findOne({ where: { product, user, status: 1 } })
					return { ...product, star: star || null }
				}
				return { ...product, star: null }
			}
			throw new HttpException(`id: ${id} 不存在`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//新品推荐
	async productLove(params: Dto.ProductLove) {
		try {
			const offset = params.offset || 0
			const limit = params.limit || 10
			const total = await this.productModel
				.createQueryBuilder('product')
				.where('product.status = :status', { status: 1 })
				.orderBy('product.createTime', 'DESC')
				.getCount()

			const list = await this.productModel.find({
				where: { status: 1 },
				order: {
					createTime: 'DESC'
				},
				relations: ['source', 'source.coupon'],
				skip: offset,
				take: limit
			})
			return { list, total }
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
