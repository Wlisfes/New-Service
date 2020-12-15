import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { ProductEntity } from '@/entity/product.entity'
import { UserStarEntity } from '@/entity/user.star.entity'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(UserEntity) private readonly userModel: Repository<UserEntity>,
		@InjectRepository(ProductEntity) private readonly productModel: Repository<ProductEntity>,
		@InjectRepository(UserStarEntity) private readonly userStarModel: Repository<UserStarEntity>
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
}
