import { Module } from '@nestjs/common'
import { WheeService } from '@/app-module/whee/whee.service'
import { WheeController } from '@/app-module/whee/whee.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WheeEntity } from '@/entity/whee.entity'
import { ProductEntity } from '@/entity/product.entity'
import { ProductSkuEntity } from '@/entity/product.sku.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, WheeEntity, ProductEntity, ProductSkuEntity])],
	providers: [WheeService],
	controllers: [WheeController]
})
export class WheeModule {}
