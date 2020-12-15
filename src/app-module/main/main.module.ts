import { Module } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { APP_GUARD } from '@nestjs/core'
import { AppGuard } from '@/guard/app.guard'
import { UserModule } from '@/app-module/user/user.module'
import { BannerModule } from '@/app-module/banner/banner.module'
import { SourceModule } from '@/app-module/source/source.module'
import { HotwellModule } from '@/app-module/hotwell/hotwell.module'
import { ProductModule } from '@/app-module/product/product.module'

@Module({
	imports: [UserModule, BannerModule, SourceModule, HotwellModule, ProductModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AppGuard
		}
	]
})
export class AppMainModule {}

export async function appSwagger(app) {
	const options = new DocumentBuilder()
		.setTitle('农贸生鲜系统APP端Api')
		.setDescription('农贸生鲜系统Api文档')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, options, {
		include: [UserModule, BannerModule, SourceModule, HotwellModule, ProductModule]
	})
	SwaggerModule.setup('api-app', app, document)
	return this
}
