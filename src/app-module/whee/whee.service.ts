import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { ProductEntity } from '@/entity/product.entity'
import { ProductSkuEntity } from '@/entity/product.sku.entity'
import * as Dto from '@/app-module/whee/whee.dto'

@Injectable()
export class WheeService {
	constructor(
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(WheeEntity) public readonly wheeModel: Repository<WheeEntity>,
		@InjectRepository(ProductEntity) public readonly productModel: Repository<ProductEntity>,
		@InjectRepository(ProductSkuEntity) public readonly skuModel: Repository<ProductSkuEntity>
	) {}

	//加入购物车
	async createWhee(params: Dto.CreateWhee, uid: number) {
		try {
			const product = await this.productModel.findOne({ where: { id: params.id } })
			if (product) {
				const sku = await this.skuModel.findOne({ where: { id: params.sku } })
				if (sku) {
					const user = await this.userModel.findOne({ where: { uid } })
					const whee = await this.wheeModel.findOne({
						where: {
							product,
							user,
							sku: sku,
							status: 1
						}
					})
					if (whee) {
						//购物车里面已经有一模一样的商品
						await this.wheeModel.update({ id: whee.id }, { some: whee.some + params.some })
						return '添加成功'
					} else {
						const newWhee = await this.wheeModel.create({
							sku,
							some: params.some,
							product,
							user
						})
						await this.wheeModel.save(newWhee)
						return '添加成功'
					}
				}
				throw new HttpException(`sku: ${params.sku} 错误`, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(`id: ${params.id} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//购物车临时缓存
	async createCacheWhee(params: Dto.CreateWhee, uid: number) {
		try {
			const product = await this.productModel.findOne({ where: { id: params.id } })
			if (product) {
				const sku = await this.skuModel.findOne({ where: { id: params.sku } })
				if (sku) {
					const user = await this.userModel.findOne({ where: { uid } })
					const whee = await this.wheeModel.create({
						sku,
						product,
						user,
						some: params.some,
						status: 2
					})
					return await this.wheeModel.save(whee)
				}
				throw new HttpException(`sku: ${params.sku} 错误`, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(`id: ${params.id} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//删除购物车
	async deleteWhee(id: number, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			const whee = await this.wheeModel.findOne({ where: { id, user, status: 1 } })
			if (whee) {
				await this.wheeModel.update(whee, { status: 0 })
				return '删除成功'
			}
			throw new HttpException(`id: ${id} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//批量获取购物车
	async wheeIds(params: Dto.WheeIds, uid: number) {
		try {
			return await this.wheeModel.find({
				where: {
					id: In(params.ids),
					status: In([1, 2])
				},
				relations: ['product', 'sku']
			})
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//获取购物车列表
	async wheeList(uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			return await this.wheeModel.find({
				where: { user, status: 1 },
				relations: ['product', 'sku'],
				order: {
					createTime: 'DESC'
				}
			})
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
