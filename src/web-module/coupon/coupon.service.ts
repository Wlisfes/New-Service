import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RedisService } from '@/common/redis/redis.service'
import { UtilsService } from '@/common/utils/utils.service'
import { AdminEntity } from '@/entity/admin.entity'
import { SourceEntity } from '@/entity/source.entity'
import { CouponEntity } from '@/entity/coupon.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import * as Dto from '@/web-module/coupon/coupon.dto'

@Injectable()
export class CouponService {
	constructor(
		private readonly redisService: RedisService,
		private readonly utilsService: UtilsService,
		@InjectRepository(AdminEntity) private readonly adminModel: Repository<AdminEntity>,
		@InjectRepository(SourceEntity) private readonly sourceModel: Repository<SourceEntity>,
		@InjectRepository(CouponEntity) private readonly couponModel: Repository<CouponEntity>,
		@InjectRepository(UserCouponEntity) private readonly userCouponModel: Repository<UserCouponEntity>
	) {
		this.redisService.observer(async key => {
			const [coupon, id] = key.split('_')
			if ('coupon' === coupon) {
				await this.couponInvalid(id)
			}
		})
	}

	//创建优惠劵
	async createCoupon(params: Dto.CreateCoupon, uid: number) {
		try {
			const source = await this.sourceModel.findOne({ where: { id: params.source } })
			const admin = await this.adminModel.findOne({ where: { uid } })
			const coupon = await this.couponModel.create({
				satisfy: params.satisfy,
				discount: params.discount,
				desc: params.desc,
				status: params.status,
				startTime: params.startTime,
				endTime: params.endTime
			})
			const save = await this.couponModel.save({
				...coupon,
				admin,
				source
			})
			const seconds = this.utilsService.currentTimediff(params.endTime)
			await this.redisService.setStore(`coupon_${save.id}`, save.id, seconds)
			return save
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//优惠劵失效处理
	async couponInvalid(id: number) {
		try {
			await this.couponModel.update({ id }, { status: 3 })
			return await this.userCouponModel.update(
				{
					receive: id,
					status: 1
				},
				{ status: 3 }
			)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//所有优惠劵
	async couponList(params: Dto.CouponList) {
		try {
			const offset = params.offset || 0
			const limit = params.limit || 10
			const where = {}
			if (typeof params.status === 'number') {
				where['status'] = params.status
			}
			return await this.couponModel.find({
				where,
				relations: ['source'],
				order: {
					id: 'DESC',
					endTime: 'DESC'
				},
				skip: offset,
				take: limit
			})
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
