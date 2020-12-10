import { Module } from '@nestjs/common'
import { UserModule } from '@/app-module/user/user.module'
import { BannerModule } from '@/app-module/banner/banner.module'

@Module({
	imports: [UserModule, BannerModule]
})
export class AppMainModule {}
