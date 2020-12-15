import { Module } from '@nestjs/common'
import { CouponService } from '@/app-module/coupon/coupon.service'
import { CouponController } from '@/app-module/coupon/coupon.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'
import { CouponEntity } from '@/entity/user.coupon.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, CouponEntity])],
	providers: [CouponService],
	controllers: [CouponController]
})
export class CouponModule {}
