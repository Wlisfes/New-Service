import { Module, HttpModule } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'

//全局依赖模块
import { ConfigModule } from '@nestjs/config'
import { SessionModule } from 'nestjs-session'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OssModule } from '@/common/oss/oss.module'

//表结构
import { UserEntity } from '@/entity/user.entity'

//多端主模块入口
import { AppMainModule } from '@/app-module/main/main.module'
import { WebMainModule } from '@/web-module/main/main.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(),
		SessionModule.forRootAsync({
			useFactory() {
				return {
					session: {
						secret: process.env.SESSIONSECRET,
						resave: true,
						saveUninitialized: true,
						cookie: {
							httpOnly: true,
							maxAge: 1800 * 1000 //1800秒
						}
					}
				}
			}
		}),
		OssModule.forRoot({
			client: {
				endpoint: process.env.ENDPOINT, // endpoint域名
				accessKeyId: process.env.ACCESSKEYID, // 账号
				accessKeySecret: process.env.ACCESSKEYSECRET, // 密码
				bucket: process.env.BUCKET, // 存储桶
				internal: false,
				secure: true,
				cname: false,
				timeout: process.env.TIMEOUT
			},
			domain: process.env.DOMAIN // 自定义域名
		}),
		TypeOrmModule.forFeature([UserEntity]),
		HttpModule,
		AppMainModule,
		WebMainModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
