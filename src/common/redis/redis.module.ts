import { Module, DynamicModule } from '@nestjs/common'
import { RedisService } from '@/common/redis/redis.service'
import { RedisOptions } from 'ioredis'
import { OPTIONS } from '@/common/redis/redis.provider'

@Module({})
export class RedisModule {
	static forRoot(options: RedisOptions): DynamicModule {
		return {
			module: RedisModule,
			providers: [{ provide: OPTIONS, useValue: options }, RedisService],
			exports: [RedisService]
		}
	}
}
