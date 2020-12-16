import { Module } from '@nestjs/common'
import { CouponService } from '@/web-module/coupon/coupon.service'
import { CouponController } from '@/web-module/coupon/coupon.controller'
import { RedisModule } from '@/common/redis/redis.module'
import { UtilsModule } from '@/common/utils/utils.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { CouponEntity } from '@/entity/coupon.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { SourceEntity } from '@/entity/source.entity'

@Module({
	imports: [
		RedisModule,
		UtilsModule,
		TypeOrmModule.forFeature([AdminEntity, CouponEntity, UserCouponEntity, SourceEntity])
	],
	providers: [CouponService],
	controllers: [CouponController]
})
export class CouponModule {}
