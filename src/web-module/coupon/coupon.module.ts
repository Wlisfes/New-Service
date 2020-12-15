import { Module } from '@nestjs/common'
import { CouponService } from '@/web-module/coupon/coupon.service'
import { CouponController } from '@/web-module/coupon/coupon.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { CouponEntity } from '@/entity/user.coupon.entity'
import { SourceEntity } from '@/entity/source.entity'

@Module({
	imports: [TypeOrmModule.forFeature([AdminEntity, CouponEntity, SourceEntity])],
	providers: [CouponService],
	controllers: [CouponController]
})
export class CouponModule {}
