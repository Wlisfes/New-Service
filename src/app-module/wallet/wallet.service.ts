import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WalletEntity } from '@/entity/wallet.entity'
import { OrderEntity } from '@/entity/order.entity'
import { compareSync } from 'bcryptjs'
import * as Dto from '@/app-module/wallet/wallet.dto'

@Injectable()
export class WalletService {
	constructor(
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(WalletEntity) public readonly walletModel: Repository<WalletEntity>,
		@InjectRepository(OrderEntity) public readonly orderModel: Repository<OrderEntity>
	) {}

	//验证支付密码
	async authPassword(password: string, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			if (!user.password) {
				throw new HttpException(`未设置支付密码`, HttpStatus.BAD_REQUEST)
			} else if (!compareSync(password, user.password)) {
				throw new HttpException('支付密码错误', HttpStatus.BAD_REQUEST)
			}
			return true
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//验证钱包余额
	async authBalance(balance: number, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			if (user.balance < balance) {
				throw new HttpException(`余额不足`, HttpStatus.BAD_REQUEST)
			}
			return true
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//支付扣除余额
	async authDeduct(params: Dto.AuthDeduct, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			const order = await this.orderModel.findOne({ where: { id: params.order, user } })
			const wallet = await this.walletModel.create({
				order,
				user,
				balance: user.balance - params.consume,
				consume: params.consume,
				context: params.context
			})
			await this.userModel.update({ uid }, { balance: user.balance - params.consume })
			await this.walletModel.save(wallet)
			return true
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
