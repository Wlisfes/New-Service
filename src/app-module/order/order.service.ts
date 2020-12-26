import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In, Not } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { OrderEntity } from '@/entity/order.entity'
import { AddressEntity } from '@/entity/user.address.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { UtilsService } from '@/common/utils/utils.service'
import { WalletService } from '@/app-module/wallet/wallet.service'
import { RedisService } from '@/common/redis/redis.service'
import * as Dto from '@/app-module/order/order.dto'

@Injectable()
export class OrderService {
	private seconds: number = 7200 //自动发货时间两小时

	constructor(
		private readonly utilsService: UtilsService,
		private readonly walletService: WalletService,
		private readonly redisService: RedisService,
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(WheeEntity) public readonly wheeModel: Repository<WheeEntity>,
		@InjectRepository(OrderEntity) public readonly orderModel: Repository<OrderEntity>,
		@InjectRepository(AddressEntity) public readonly addressModel: Repository<AddressEntity>,
		@InjectRepository(UserCouponEntity) public readonly couponModel: Repository<UserCouponEntity>
	) {
		this.redisService.observer(async key => {
			const [order, id] = key.split('_')
			if ('order' === order) {
				await this.automAticShip(id)
			}
		})
	}

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
			await this.walletService.authPassword(params.password, uid)
			const user = await this.userModel.findOne({ where: { uid } })
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
						await this.walletService.authBalance(order.total - order.discount, uid)
						await this.walletService.authDeduct(
							{
								consume: order.total - order.discount,
								order: order.id,
								context: '支付订单消费'
							},
							uid
						)
						await this.orderModel.update(order, {
							status: 2,
							coupon
						})

						//redis支付2小时后自动发货
						await this.redisService.setStore(`order_${order.id}`, order.id, this.seconds)
						return '支付成功'
					} else {
						await this.walletService.authBalance(order.total - order.discount, uid)
						await this.walletService.authDeduct(
							{
								consume: order.total - order.discount,
								order: order.id,
								context: '支付订单消费'
							},
							uid
						)
						await this.orderModel.update(order, {
							status: 2,
							coupid: null,
							discount: 0
						})

						//redis支付2小时后自动发货
						await this.redisService.setStore(`order_${order.id}`, order.id, this.seconds)
						return '支付成功'
					}
				} else {
					await this.walletService.authBalance(order.total, uid)
					await this.walletService.authDeduct(
						{
							consume: order.total - order.discount,
							order: order.id,
							context: '支付订单消费'
						},
						uid
					)
					await this.orderModel.update(order, { status: 2 })

					//redis支付2小时后自动发货
					await this.redisService.setStore(`order_${order.id}`, order.id, this.seconds)
					return '支付成功'
				}
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
			const where = {}
			if (params.status) {
				where['status'] = In([params.status])
			} else {
				where['status'] = Not(params.status)
			}
			const user = await this.userModel.findOne({ where: { uid } })
			const total = (
				await this.orderModel.find({
					where: { user, ...where }
				})
			).length

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

	//自动发货
	async automAticShip(id: number) {
		try {
			const order = await this.orderModel.findOne({ where: { id } })
			if (order.status === 2) {
				await this.orderModel.update({ id }, { status: 3 })
				return '发货成功'
			}
			return '已发货'
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
