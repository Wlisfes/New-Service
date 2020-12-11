import { Injectable, Inject } from '@nestjs/common'
import { OPTIONS } from '@/common/redis/redis.provider'
import * as Redis from 'ioredis'

@Injectable()
export class RedisService {
	private client: Redis.Redis
	private observer: Redis.Redis

	constructor(@Inject(OPTIONS) options: Redis.RedisOptions) {
		this.client = new Redis(options)
		this.client.send_command('config', ['set', 'notify-keyspace-events', 'Ex'])
		this.observer = new Redis(options)
		const expired_subKey = `__keyevent@${options.db}__:expired`
		this.observer.subscribe(expired_subKey, () => {
			this.observer.on('message', (info, key) => {
				console.log(key, '失效了')
			})
		})
		// this.client.set('user', 'paker', 'EX', 4) //4秒后失效
	}

	public async setStore(key: string, data: any, seconds?: number) {
		if (!seconds) {
			return await this.client.set(key, JSON.stringify(data))
		} else {
			return await this.client.set(key, JSON.stringify(data), 'EX', seconds)
		}
	}

	public async getStore(key: string) {
		const data = await this.client.get(key)
		if (data) {
			return JSON.parse(data)
		} else {
			return null
		}
	}
}
