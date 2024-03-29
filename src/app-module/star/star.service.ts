import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { UserStarEntity } from '@/entity/user.star.entity'
import { ProductEntity } from '@/entity/product.entity'
import * as Dto from '@/app-module/star/star.dto'

@Injectable()
export class StarService {
	constructor(
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(UserStarEntity) public readonly starModel: Repository<UserStarEntity>,
		@InjectRepository(ProductEntity) public readonly productModel: Repository<ProductEntity>
	) {}

	//添加收藏
	async createStar(id: number, uid: number) {
		try {
			const product = await this.productModel.findOne({ where: { id } })
			if (!product) {
				throw new HttpException(`id: ${id} 错误`, HttpStatus.BAD_REQUEST)
			}
			const user = await this.userModel.findOne({ where: { uid } })
			const star = await this.starModel.findOne({ where: { product, user } })
			if (star) {
				if (star.status === 1) {
					return '收藏成功'
				}
				await this.starModel.update(star, { status: 1 })
				return '收藏成功'
			} else {
				//没有收藏数据
				const userStar = await this.starModel.create({ product, user })
				await this.starModel.save(userStar)
				return '收藏成功'
			}
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//取消收藏
	async delStar(id: number, uid: number) {
		try {
			const product = await this.productModel.findOne({ where: { id } })
			if (!product) {
				throw new HttpException(`id: ${id} 错误`, HttpStatus.BAD_REQUEST)
			}
			const user = await this.userModel.findOne({ where: { uid } })
			const star = await this.starModel.findOne({ where: { product, user } })
			if (star) {
				if (star.status === 0) {
					return '取消成功'
				}
				await this.starModel.update(star, { status: 0 })
				return '取消成功'
			}
			return '该商品未收藏'
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//我的收藏列表
	async userStar(params: Dto.UserStar, uid: number) {
		try {
			const offset = params.offset || 0
			const limit = params.limit || 10
			const user = await this.userModel.findOne({ where: { uid } })
			const total = (await this.starModel.find({ where: { status: 1, user } })).length
			const list = await this.starModel.find({
				where: { user, status: 1 },
				relations: ['product'],
				order: { updateTime: 'DESC' },
				skip: offset,
				take: limit
			})
			return { total, list }
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
