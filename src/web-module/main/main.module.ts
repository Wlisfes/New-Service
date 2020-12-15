import { Module } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { APP_GUARD } from '@nestjs/core'
import { WebGuard } from '@/guard/web.guard'
import { OssModule } from '@/common/oss/oss.module'
import { AdminModule } from '@/web-module/admin/admin.module'
import { UserModule } from '@/web-module/user/user.module'
import { BannerModule } from '@/web-module/banner/banner.module'
import { SourceModule } from '@/web-module/source/source.module'
import { FormatModule } from '@/web-module/format/format.module'
import { ProductModule } from '@/web-module/product/product.module'
import { HotwellModule } from '@/web-module/hotwell/hotwell.module'
import { CouponModule } from '@/web-module/coupon/coupon.module'

@Module({
	imports: [
		AdminModule,
		UserModule,
		BannerModule,
		SourceModule,
		FormatModule,
		ProductModule,
		HotwellModule,
		CouponModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: WebGuard
		}
	]
})
export class WebMainModule {}

export async function webSwagger(app) {
	const options = new DocumentBuilder()
		.setTitle('农贸生鲜系统WEB端Api')
		.setDescription('农贸生鲜系统Api文档')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, options, {
		include: [
			OssModule,
			AdminModule,
			UserModule,
			BannerModule,
			SourceModule,
			FormatModule,
			ProductModule,
			HotwellModule,
			CouponModule
		]
	})
	SwaggerModule.setup('api-web', app, document)
	return this
}
