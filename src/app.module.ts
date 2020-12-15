import { Module, HttpModule } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'

//全局依赖模块
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonMainModule } from '@/common/main/main.module'

//多端主模块入口
import { AppMainModule } from '@/app-module/main/main.module'
import { WebMainModule } from '@/web-module/main/main.module'

//表结构
import { AdminEntity } from '@/entity/admin.entity'
import { UserEntity } from '@/entity/user.entity'
import { SourceEntity } from '@/entity/source.entity'
import { BannerEntity } from '@/entity/banner.entity'
import { FormatEntity } from '@/entity/format.entity'
import { FormatAttrEntity } from '@/entity/format.attr.entity'
import { ProductEntity } from '@/entity/product.entity'
import { ProductFormatEntity } from '@/entity/product.format.entity'
import { ProductSkuEntity } from '@/entity/product.sku.entity'
import { HotwellEntity } from '@/entity/hotwell.entity'
import { UserStarEntity } from '@/entity/user.star.entity'
import { AddressEntity } from '@/entity/user.address.entity'

@Module({
	imports: [
		CommonMainModule,
		TypeOrmModule.forFeature([
			AdminEntity,
			UserEntity,
			SourceEntity,
			BannerEntity,
			FormatEntity,
			FormatAttrEntity,
			ProductEntity,
			ProductFormatEntity,
			ProductSkuEntity,
			HotwellEntity,
			UserStarEntity,
			AddressEntity
		]),
		HttpModule,
		AppMainModule,
		WebMainModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
