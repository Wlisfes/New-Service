import { Module } from '@nestjs/common'
import { StarService } from '@/app-module/star/star.service'
import { StarController } from '@/app-module/star/star.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'
import { UserStarEntity } from '@/entity/user.star.entity'
import { ProductEntity } from '@/entity/product.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, UserStarEntity, ProductEntity])],
	providers: [StarService],
	controllers: [StarController]
})
export class StarModule {}
