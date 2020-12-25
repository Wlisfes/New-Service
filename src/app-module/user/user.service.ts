import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { OssService } from '@/common/oss/oss.service'
import { UtilsService } from '@/common/utils/utils.service'
import { WechatService } from '@/common/wechat/wechat.service'
import { AuthService } from '@/common/auth/auth.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { UserStarEntity } from '@/entity/user.star.entity'
import { OrderEntity } from '@/entity/order.entity'
import * as Dto from '@/app-module/user/user.dto'

@Injectable()
export class UserService {
	constructor(
		private readonly authService: AuthService,
		private readonly wechatService: WechatService,
		private readonly utilsService: UtilsService,
		private readonly ossService: OssService,
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(UserCouponEntity) public readonly couponModel: Repository<UserCouponEntity>,
		@InjectRepository(UserStarEntity) public readonly starModel: Repository<UserStarEntity>,
		@InjectRepository(OrderEntity) public readonly orderModel: Repository<OrderEntity>
	) {}

	//创建用户
	async createUser(params: Dto.CreateUser) {
		try {
			const { openid } = await this.wechatService.login(params.code)
			const user = await this.userModel.findOne({ where: { openid } })
			if (user) {
				const token = await this.authService.sign({ uid: user.uid })
				return { ...user, token }
			} else {
				const dataBuffer = await this.utilsService.downloadFile(params.avatar)
				const target = `store/avatar/${this.ossService.getRename('name.jpg')}`
				const buffer = await this.ossService.createStream(dataBuffer)
				const response = await this.ossService.putStream(target, buffer)
				if (response.res.status === 200) {
					const avatar = this.ossService.options.domain + '/' + response.name
					const newUser = await this.userModel.create({
						avatar,
						openid,
						nickname: params.nickname
					})
					const saveUser = await this.userModel.save(newUser)
					const token = await this.authService.sign({ uid: saveUser.uid })
					return { ...saveUser, token }
				}
				throw new HttpException('oss上传失败', HttpStatus.BAD_REQUEST)
			}
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//根据uid拉取用户信息
	async findOneUid(uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			if (user) {
				const token = await this.authService.sign({ uid })
				return { ...user, token }
			}
			throw new HttpException(`uid: ${uid} 不存在`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//根据openid拉取用户信息
	async findOneOpenid(openid: string) {
		try {
			const user = await this.userModel.findOne({ where: { openid } })
			if (user) {
				const token = await this.authService.sign({ uid: user.uid })
				return { ...user, token }
			}
			throw new HttpException(`openid: ${openid} 不存在`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//统计信息
	async userCount(uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			const coupon = await this.couponModel.find({ where: { user, status: 1 } })
			const star = await this.starModel.find({ where: { user, status: 1 } })
			const haven = await this.orderModel.find({ where: { user, status: 1 } })
			const issue = await this.orderModel.find({ where: { user, status: 2 } })
			const income = await this.orderModel.find({ where: { user, status: 3 } })
			const conter = await this.orderModel.find({ where: { user, status: 4 } })
			return {
				balance: user.balance,
				coupon: coupon.length,
				star: star.length,
				haven: haven.length,
				issue: issue.length,
				income: income.length,
				conter: conter.length
			}
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//设置、修改支付密码
	async usePay(password: string, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			await this.userModel.update(user, { password })
			return '设置成功'
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
