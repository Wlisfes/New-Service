import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SessionModule } from 'nestjs-session'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OssModule } from '@/common/oss/oss.module'
import { UtilsModule } from '@/common/utils/utils.module'
import { AuthModule } from '@/common/auth/auth.module'

@Global()
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
		AuthModule,
		UtilsModule
	],
	exports: [UtilsModule, AuthModule]
})
export class CommonMainModule {}
