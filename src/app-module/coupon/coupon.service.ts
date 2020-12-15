import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { CouponEntity } from '@/entity/user.coupon.entity'

@Injectable()
export class CouponService {
	constructor(
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(CouponEntity) public readonly couponModel: Repository<CouponEntity>
	) {}

	//领取优惠卷
	async createCoupon(id: number, uid: number) {}
}
