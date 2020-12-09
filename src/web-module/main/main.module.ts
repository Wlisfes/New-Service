import { Module } from '@nestjs/common'

//守卫
import { APP_GUARD } from '@nestjs/core'
import { WebGuard } from '@/guard/web.guard'

//模块
import { AdminModule } from '@/web-module/admin/admin.module'
import { UserModule } from '@/web-module/user/user.module'
import { BannerModule } from '@/web-module/banner/banner.module'

@Module({
	imports: [AdminModule, UserModule, BannerModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: WebGuard
		}
	]
})
export class WebMainModule {}
