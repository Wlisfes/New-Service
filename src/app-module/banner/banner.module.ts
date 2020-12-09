import { Module } from '@nestjs/common'
import { BannerService } from '@/app-module/banner/banner.service'
import { BannerController } from '@/app-module/banner/banner.controller'

@Module({
	providers: [BannerService],
	controllers: [BannerController]
})
export class BannerModule {}
