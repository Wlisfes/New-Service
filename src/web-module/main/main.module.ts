import { Module } from '@nestjs/common'
import { AdminModule } from '@/web-module/admin/admin.module'
import { UserModule } from '@/web-module/user/user.module'
import { BannerModule } from '@/web-module/banner/banner.module'

@Module({
	imports: [AdminModule, UserModule, BannerModule]
})
export class WebMainModule {}
