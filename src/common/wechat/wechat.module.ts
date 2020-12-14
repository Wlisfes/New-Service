import { Module, DynamicModule, HttpModule } from '@nestjs/common'
import { WechatService } from '@/common/wechat/wechat.service'
import { WechatOption, OPTIONS } from '@/common/wechat/wechat.provider'
import { RedisModule } from '@/common/redis/redis.module'

@Module({
	imports: [RedisModule, HttpModule]
})
export class WechatModule {
	static forRoot(options: WechatOption): DynamicModule {
		return {
			module: WechatModule,
			providers: [{ provide: OPTIONS, useValue: options }, WechatService],
			exports: [WechatService]
		}
	}
}
