import { Module } from '@nestjs/common'
import { BannerService } from '@/web-module/banner/banner.service'
import { BannerController } from '@/web-module/banner/banner.controller'
import { AdminService } from '@/web-module/admin/admin.service'

//数据表依赖注入
import { TypeOrmModule } from '@nestjs/typeorm'
import { BannerEntity } from '@/entity/banner.entity'
import { AdminEntity } from '@/entity/admin.entity'

@Module({
	imports: [TypeOrmModule.forFeature([BannerEntity, AdminEntity])],
	controllers: [BannerController],
	providers: [BannerService, AdminService]
})
export class BannerModule {}
