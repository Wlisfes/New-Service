import { Module } from '@nestjs/common'
import { CouponService } from '@/app-module/coupon/coupon.service'
import { CouponController } from '@/app-module/coupon/coupon.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'
import { CouponEntity } from '@/entity/coupon.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { SourceEntity } from '@/entity/source.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, CouponEntity, UserCouponEntity, SourceEntity])],
	providers: [CouponService],
	controllers: [CouponController]
})
export class CouponModule {}
