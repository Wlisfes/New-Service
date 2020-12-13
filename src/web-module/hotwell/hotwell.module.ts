import { Module } from '@nestjs/common'
import { HotwellService } from '@/web-module/hotwell/hotwell.service'
import { HotwellController } from '@/web-module/hotwell/hotwell.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HotwellEntity } from '@/entity/hotwell.entity'
import { ProductEntity } from '@/entity/product.entity'

@Module({
	imports: [TypeOrmModule.forFeature([HotwellEntity, ProductEntity])],
	providers: [HotwellService],
	controllers: [HotwellController]
})
export class HotwellModule {}
