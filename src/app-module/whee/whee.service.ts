import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
			const product = await this.productModel.findOne({ where: { id: params.proid } })
			if (product) {
				const sku = await this.skuModel.findOne({ where: { product, coding: params.skucode } })
				if (sku) {
					const user = await this.userModel.findOne({ where: { uid } })
					const whee = await this.wheeModel.findOne({
						where: {
							product,
							skuid: params.skuid,
							skucode: params.skucode,
							status: 1
						}
					})
					if (whee) {
						//购物车里面已经有一模一样的商品
						await this.wheeModel.update({ id: whee.id }, { some: whee.some + 1 })
						return await this.wheeModel.findOne({
							where: { id: whee.id },
							relations: ['product', 'user']
						})
					} else {
						const newWhee = await this.wheeModel.create({
							skuid: params.skuid,
							skucode: params.skucode,
							some: params.some,
							product,
							user
						})
						return this.wheeModel.save(newWhee)
					}
				}
				throw new HttpException(`skucode: ${params.skucode} 错误`, HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(`proid: ${params.proid} 错误`, HttpStatus.BAD_REQUEST)
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
				relations: ['product'],
				order: {
					id: 'DESC'
				}
			})
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
