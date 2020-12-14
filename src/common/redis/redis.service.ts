import { Injectable, Inject } from '@nestjs/common'
import { OPTIONS } from '@/common/redis/redis.provider'
import * as Redis from 'ioredis'

@Injectable()
export class RedisService {
	public readonly client: Redis.Redis
	public readonly subserver: Redis.Redis
	public readonly subKey: string

	constructor(@Inject(OPTIONS) public readonly options: Redis.RedisOptions) {
		this.client = new Redis(options)
		this.client.send_command('config', ['set', 'notify-keyspace-events', 'Ex'])
		this.subserver = new Redis(options)
		this.subKey = `__keyevent@${options.db}__:expired`
	}

	//订阅
	public observer(co: Function) {
		const keyPrefix = this.options.keyPrefix
		this.subserver.subscribe(this.subKey, () => {
			this.subserver.on('message', (info, key) => {
				co && co(key.slice(keyPrefix.length))
			})
		})
	}

	//存储
	public async setStore(key: string, data: any, seconds?: number) {
		if (!seconds) {
			return await this.client.set(key, JSON.stringify(data))
		} else {
			return await this.client.set(key, JSON.stringify(data), 'EX', seconds)
		}
	}

	//读取
	public async getStore(key: string) {
		const data = await this.client.get(key)
		if (data) {
			return JSON.parse(data)
		} else {
			return null
		}
	}
}
