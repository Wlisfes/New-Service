import { Module } from '@nestjs/common'
import { BannerService } from '@/web-module/banner/banner.service'
import { BannerController } from '@/web-module/banner/banner.controller'

//数据表依赖注入
import { TypeOrmModule } from '@nestjs/typeorm'
import { BannerEntity } from '@/entity/banner.entity'

@Module({
	imports: [TypeOrmModule.forFeature([BannerEntity])],
	controllers: [BannerController],
	providers: [BannerService]
})
export class BannerModule {}
