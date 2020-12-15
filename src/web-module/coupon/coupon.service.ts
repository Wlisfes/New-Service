import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { CouponEntity } from '@/entity/user.coupon.entity'
import { SourceEntity } from '@/entity/source.entity'
import * as Dto from '@/web-module/coupon/coupon.dto'

@Injectable()
export class CouponService {
	constructor(
		@InjectRepository(AdminEntity) private readonly adminModel: Repository<AdminEntity>,
		@InjectRepository(CouponEntity) private readonly couponModel: Repository<CouponEntity>,
		@InjectRepository(SourceEntity) private readonly sourceModel: Repository<SourceEntity>
	) {}

	//创建优惠劵
	async createCoupon(params: Dto.CreateCoupon, uid: number) {
		try {
			const source = await this.sourceModel
				.createQueryBuilder('source')
				.where('source.id IN (:id)', { id: params.source })
				.getMany()
			const admin = await this.adminModel.findOne({ where: { uid } })
			const coupon = await this.couponModel.create({
				admin,
				source,
				satisfy: params.satisfy,
				discount: params.discount,
				desc: params.desc,
				status: params.status,
				startTime: params.startTime,
				endTime: params.endTime
			})
			return await this.couponModel.save(coupon)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//所有优惠劵
	async couponList() {
		try {
			return await this.couponModel.find({ relations: ['source'] })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
