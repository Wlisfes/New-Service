import { Module } from '@nestjs/common'
import { BannerService } from '@/app-module/banner/banner.service'
import { BannerController } from '@/app-module/banner/banner.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BannerEntity } from '@/entity/banner.entity'

@Module({
	imports: [TypeOrmModule.forFeature([BannerEntity])],
	providers: [BannerService],
	controllers: [BannerController]
})
export class BannerModule {}
