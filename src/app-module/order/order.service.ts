import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getConnection, In } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { OrderEntity } from '@/entity/order.entity'
import { AddressEntity } from '@/entity/user.address.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import * as Dto from '@/app-module/order/order.dto'

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(WheeEntity) public readonly wheeModel: Repository<WheeEntity>,
		@InjectRepository(OrderEntity) public readonly orderModel: Repository<OrderEntity>,
		@InjectRepository(AddressEntity) public readonly addressModel: Repository<AddressEntity>,
		@InjectRepository(UserCouponEntity) public readonly couponModel: Repository<UserCouponEntity>
	) {}

	//创建订单
	async createOrder(params: Dto.CreateOrder, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			const whee = await this.wheeModel.find({
				where: {
					user,
					id: In(params.ids),
					status: In([1, 2])
				},
				relations: ['sku']
			})

			if (whee.length === params.ids.length) {
				const address = await this.addressModel.findOne({
					id: In([params.address]),
					checked: In([1, 2])
				})
				if (!address) {
					throw new HttpException(`address: ${params.address} 错误`, HttpStatus.BAD_REQUEST)
				}

				const coupon = await this.couponModel.findOne({ where: { id: params.coupon, user, status: 1 } })
				if (params.coupon && !coupon) {
					throw new HttpException(`coupon: ${params.coupon} 错误`, HttpStatus.BAD_REQUEST)
				}

				//合计金额
				const total = whee.map(k => k.sku.price * k.some).reduce((prev, curr) => prev + curr, 0)
				const order = await this.orderModel.create({
					user,
					whee,
					coupon,
					address,
					total,
					leave: params.leave,
					discount: coupon?.discount || 0
				})
				const saveOrder = await this.orderModel.save(order)

				for (const w of whee) {
					await this.wheeModel.update(w, { status: 3 })
				}
				return saveOrder
			}
			throw new HttpException(`ids: ${params.ids} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
