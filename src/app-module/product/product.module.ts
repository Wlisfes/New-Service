import { Module } from '@nestjs/common'
import { ProductService } from '@/app-module/product/product.service'
import { ProductController } from '@/app-module/product/product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'
import { ProductEntity } from '@/entity/product.entity'
import { UserStarEntity } from '@/entity/user.star.entity'
import { CouponEntity } from '@/entity/coupon.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity, UserStarEntity, CouponEntity])],
	providers: [ProductService],
	controllers: [ProductController]
})
export class ProductModule {}
