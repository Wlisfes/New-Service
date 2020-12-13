import { Module } from '@nestjs/common'
import { ProductService } from '@/web-module/product/product.service'
import { ProductController } from '@/web-module/product/product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { SourceEntity } from '@/entity/source.entity'
import { FormatEntity } from '@/entity/format.entity'
import { FormatAttrEntity } from '@/entity/format.attr.entity'
import { ProductEntity } from '@/entity/product.entity'
import { ProductFormatEntity } from '@/entity/product.format.entity'
import { ProductSkuEntity } from '@/entity/product.sku.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			AdminEntity,
			SourceEntity,
			FormatEntity,
			FormatAttrEntity,
			ProductEntity,
			ProductFormatEntity,
			ProductSkuEntity
		])
	],
	providers: [ProductService],
	controllers: [ProductController]
})
export class ProductModule {}
