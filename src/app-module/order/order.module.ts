import { Module } from '@nestjs/common'
import { OrderService } from '@/app-module/order/order.service'
import { OrderController } from '@/app-module/order/order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'
import { OrderEntity } from '@/entity/order.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { UserCouponEntity } from '@/entity/user.coupon.entity'
import { AddressEntity } from '@/entity/user.address.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity, WheeEntity, UserCouponEntity, AddressEntity])],
	providers: [OrderService],
	controllers: [OrderController]
})
export class OrderModule {}
