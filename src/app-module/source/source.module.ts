import { Module } from '@nestjs/common'
import { SourceService } from '@/app-module/source/source.service'
import { SourceController } from '@/app-module/source/source.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SourceEntity } from '@/entity/source.entity'
import { ProductEntity } from '@/entity/product.entity'

@Module({
	imports: [TypeOrmModule.forFeature([SourceEntity, ProductEntity])],
	providers: [SourceService],
	controllers: [SourceController]
})
export class SourceModule {}
