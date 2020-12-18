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

	//商品添加收藏、取消收藏
	async productStar(id: number, uid: number) {
		try {
			const product = await this.productModel.findOne({ where: { id } })
			if (!product) {
				throw new HttpException(`id: ${id} 不存在`, HttpStatus.BAD_REQUEST)
			}

			const user = await this.userModel.findOne({ where: { uid } })
			const star = await this.userStarModel.findOne({ where: { product, user } })
			if (star) {
				await this.userStarModel.update(star, { status: star.status ? 0 : 1 })
				return star.status ? '取消成功' : '收藏成功'
			} else {
				//没有收藏数据
				const userStar = await this.userStarModel.create({ product, user })
				await this.userStarModel.save(userStar)
				return '收藏成功'
			}
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

			const list = await this.productModel
				.find({
					where: { status: 1 },
					order: {
						createTime: 'DESC'
					},
					relations: ['source'],
					skip: offset,
					take: limit
				})
				.then(async res => {
					const coupon = await this.couponModel.find({
						where: { status: 1 },
						relations: ['source'],
						order: {
							satisfy: 'DESC'
						}
					})
					return res.map(k => {
						const c = coupon.filter(v => v.source.some(item => item.id == k.source.id))
						return { ...k, coupon: c }
					})
				})
			return { list, total }
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
