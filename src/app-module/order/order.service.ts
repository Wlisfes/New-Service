import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { OrderEntity } from '@/entity/order.entity'
import { AddressEntity } from '@/entity/user.address.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { UtilsService } from '@/common/utils/utils.service'
import { compareSync } from 'bcryptjs'
import * as Dto from '@/app-module/order/order.dto'

@Injectable()
export class OrderService {
	constructor(
		private readonly utilsService: UtilsService,
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
					address,
					total,
					leave: params.leave,
					coupid: coupon?.id,
					discount: coupon?.discount || 0,
					order: this.utilsService.createOrder()
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

	//支付订单
	async payOrder(params: Dto.PayOrder, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			if (!user.password) {
				throw new HttpException(`未设置支付密码`, HttpStatus.BAD_REQUEST)
			} else if (!compareSync(params.password, user.password)) {
				throw new HttpException('支付密码错误', HttpStatus.BAD_REQUEST)
			}

			const order = await this.orderModel.findOne({
				where: {
					id: params.order,
					status: 1,
					user
				}
			})
			if (order) {
				if (order.coupid) {
					const coupon = await this.couponModel.findOne({ where: { id: order.coupid, status: 1 } })
					if (coupon) {
						//优惠劵有效
						await this.orderModel.update(order, {
							status: 2,
							coupon
						})
						return '支付成功'
					} else {
						await this.orderModel.update(order, {
							status: 2,
							coupid: null,
							discount: 0
						})
						return '支付成功'
					}
				}
				await this.orderModel.update(order, { status: 2 })
				return '支付成功'
			}
			throw new HttpException(`order: ${params.order} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//订单列表
	async orderList(params: Dto.OrderList, uid: number) {
		try {
			const offset = params.offset || 0
			const limit = params.limit || 10
			let where = {}
			if (params.status) {
				where = {
					status: params.status
				}
			}
			const user = await this.userModel.findOne({ where: { uid } })
			const total = await this.orderModel
				.createQueryBuilder('order')
				.leftJoin('order.user', 'u')
				.where(where)
				.andWhere('u.uid = :uid', { uid })
				.getCount()
			const list = await this.orderModel.find({
				where: { user, ...where },
				order: { createTime: 'DESC' },
				relations: ['whee', 'coupon', 'address', 'whee.product', 'whee.sku'],
				skip: offset,
				take: limit
			})

			return { total, list }
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//删除订单
	async deleteOrder(params: Dto.DecOrder, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			const order = await this.orderModel.findOne({ where: { id: params.id, user } })
			if (order) {
				await this.orderModel.update(order, { status: 0 })
				return '删除成功'
			}
			throw new HttpException(`id: ${params.id} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//确认收货
	async incomeOrder(params: Dto.DecOrder, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			const order = await this.orderModel.findOne({ where: { id: params.id, user } })
			if (order) {
				await this.orderModel.update(order, { status: 4 })
				return '收货成功'
			}
			throw new HttpException(`id: ${params.id} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
