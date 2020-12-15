import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { OrderEntity } from '@/entity/order.entity'

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(WheeEntity) public readonly wheeModel: Repository<WheeEntity>,
		@InjectRepository(OrderEntity) public readonly orderModel: Repository<OrderEntity>
	) {}

	//创建订单
	async createOrder() {}
}
