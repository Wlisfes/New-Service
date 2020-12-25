import { Module } from '@nestjs/common'
import { OssModule } from '@/common/oss/oss.module'
import { WechatModule } from '@/common/wechat/wechat.module'
import { UserService } from '@/app-module/user/user.service'
import { UserController } from '@/app-module/user/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { UserStarEntity } from '@/entity/user.star.entity'
import { OrderEntity } from '@/entity/order.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, UserCouponEntity, UserStarEntity, OrderEntity]),
		WechatModule,
		OssModule
	],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService]
})
export class UserModule {}
