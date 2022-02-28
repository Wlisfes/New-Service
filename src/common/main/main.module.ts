import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SessionModule } from 'nestjs-session'
import { OssModule } from '@/common/oss/oss.module'
import { RedisModule } from '@/common/redis/redis.module'
import { WechatModule } from '@/common/wechat/wechat.module'
import { UtilsModule } from '@/common/utils/utils.module'
import { AuthModule } from '@/common/auth/auth.module'

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		RedisModule.forRoot({
			host: process.env.REDIS_HOST,
			port: Number(process.env.REDIS_PORT),
			db: Number(process.env.REDIS_DB),
			password: process.env.REDIS_PASSWORD,
			keyPrefix: process.env.REDIS_KEYPREFIX,
			lazyConnect: true
		}),
		SessionModule.forRoot({
			session: {
				secret: process.env.SESSION_SECRET,
				resave: true,
				saveUninitialized: true,
				cookie: {
					httpOnly: true,
					maxAge: parseInt(process.env.SESSION_MAXAGE)
				}
			}
		}),
		OssModule.forRoot({
			client: {
				endpoint: process.env.OSS_ENDPOINT,
				accessKeyId: process.env.OSS_ACCESSKEYID,
				accessKeySecret: process.env.OSS_ACCESSKEYSECRET,
				bucket: process.env.OSS_BUCKET,
				internal: false,
				secure: true,
				cname: false,
				timeout: process.env.OSS_TIMEOUT
			},
			domain: process.env.OSS_DOMAIN
		}),
		WechatModule.forRoot({
			AppID: process.env.APPID,
			AppSecret: process.env.APPSECRET
		}),
		AuthModule,
		UtilsModule
	],
	exports: [RedisModule, OssModule, WechatModule, UtilsModule, AuthModule]
})
export class CommonMainModule {}
