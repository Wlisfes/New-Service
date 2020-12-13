import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { HttpExceptionFilter } from '@/filters/http-exception.filter'
import { TransformInterceptor } from '@/interceptor/transform.interceptor'
import { AppModule } from '@/app.module'
import { webSwagger } from '@/web-module/main/main.module'
import { appSwagger } from '@/app-module/main/main.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true
	})

	//web、小程序端文档挂载
	await webSwagger(app)
	await appSwagger(app)

	//全局注册验证管道
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true
		})
	)

	//全局注册错误的过滤器
	app.useGlobalFilters(new HttpExceptionFilter())

	//全局注册拦截器更改返回数据格式
	app.useGlobalInterceptors(new TransformInterceptor())

	const port = process.env.ADMIN_PORT || 3004
	await app.listen(port)
	console.log(`http://localhost:${port}/`)
	console.log(`http://localhost:${port}/api-web`)
	console.log(`http://localhost:${port}/api-app`)
}
bootstrap()
