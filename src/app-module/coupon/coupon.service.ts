import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { CouponEntity } from '@/entity/coupon.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { SourceEntity } from '@/entity/source.entity'
import * as Dto from '@/app-module/coupon/coupon.dto'

@Injectable()
export class CouponService {
	constructor(
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(CouponEntity) public readonly couponModel: Repository<CouponEntity>,
		@InjectRepository(UserCouponEntity) public readonly userCouponModel: Repository<UserCouponEntity>,
		@InjectRepository(SourceEntity) public readonly sourceModel: Repository<SourceEntity>
	) {}

	//领取优惠卷
	async createCoupon(id: number, uid: number) {
		try {
			const coupon = await this.couponModel.findOne({ where: { id }, relations: ['source'] })
			if (coupon) {
				const user = await this.userModel.findOne({ where: { uid } })
				const userCoupon = await this.userCouponModel.findOne({ where: { receive: id, user } })
				if (userCoupon) {
					throw new HttpException('优惠劵已领取', HttpStatus.BAD_REQUEST)
				}
				if (coupon.status === 1) {
					const newCoupon = await this.userCouponModel.create({
						receive: id,
						satisfy: coupon.satisfy,
						discount: coupon.discount,
						desc: coupon.desc,
						status: coupon.status,
						startTime: coupon.startTime,
						endTime: coupon.endTime,
						source: coupon.source
					})
					return await this.userCouponModel.save({ ...newCoupon, user })
				}
				throw new HttpException(Dto.StatusEnum[`status-${coupon.status}`], HttpStatus.BAD_REQUEST)
			}
			throw new HttpException(`id: ${id} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//我的优惠劵
	async userCoupon(params: Dto.UserCoupon, uid: number) {
		try {
			const offset = params.offset || 0
			const limit = params.limit || 2
			const user = await this.userModel.findOne({ where: { uid } })
			return await this.userCouponModel.find({
				where: {
					user,
					status: 3 //params.status
				},
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

	//优惠劵列表
	async couponList(uid?: number) {
		try {
			const coupon = await this.couponModel.find({
				where: { status: 1 },
				relations: ['source']
			})
			if (uid) {
				const user = await this.userModel.findOne({ where: { uid } })
				const userCoupon = await this.userCouponModel.find({
					where: { user, status: 1 },
					relations: ['user']
				})
				return coupon.map(props => {
					const u = userCoupon.find(k => k.receive === props.id)
					return {
						...props,
						user: u?.user || null
					}
				})
			}
			return coupon
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
