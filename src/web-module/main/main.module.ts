import { Module } from '@nestjs/common'

//守卫
import { APP_GUARD } from '@nestjs/core'
import { WebGuard } from '@/guard/web.guard'

//模块
import { AdminModule } from '@/web-module/admin/admin.module'
import { UserModule } from '@/web-module/user/user.module'
import { BannerModule } from '@/web-module/banner/banner.module'
import { SourceModule } from '@/web-module/source/source.module'
import { FormatModule } from '@/web-module/format/format.module'
import { ProductModule } from '@/web-module/product/product.module'
import { HotwellModule } from '@/web-module/hotwell/hotwell.module'

@Module({
	imports: [AdminModule, UserModule, BannerModule, SourceModule, FormatModule, ProductModule, HotwellModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: WebGuard
		}
	]
})
export class WebMainModule {}
