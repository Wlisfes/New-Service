import { Injectable, Inject, HttpService, HttpException, HttpStatus } from '@nestjs/common'
import { OPTIONS, WechatOption } from '@/common/wechat/wechat.provider'
import { RedisService } from '@/common/redis/redis.service'

@Injectable()
export class WechatService {
	public readonly baseUrl: string = 'https://api.weixin.qq.com'

	constructor(
		private readonly httpService: HttpService,
		private readonly redisService: RedisService,
		@Inject(OPTIONS) public readonly options: WechatOption
	) {
		this.redisService.observer(function(key) {
			console.log(key, '失效了')
		})
	}

	//获取小程序凭证access_token
	async accesstoken() {
		try {
			const access_token = await this.redisService.getStore('access_token')
			if (access_token) {
				return access_token
			} else {
				const response = await this.httpService
					.request({
						url: `${this.baseUrl}/cgi-bin/token`,
						method: 'GET',
						params: {
							grant_type: 'client_credential',
							appid: this.options.AppID,
							secret: this.options.AppSecret
						}
					})
					.toPromise()
				const { data, status } = response
				if (status === 200 && data.errcode === 0) {
					await this.redisService.setStore('access_token', data.access_token, 7000)
					return data.access_token
				}
				throw new HttpException('access_token获取失败', HttpStatus.BAD_REQUEST)
			}
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//微信登录获取openid、session_key
	async login(code: string) {
		try {
			const response = await this.httpService
				.request({
					url: `${this.baseUrl}/sns/jscode2session`,
					params: {
						appid: this.options.AppID,
						secret: this.options.AppSecret,
						js_code: code,
						grant_type: 'authorization_code'
					}
				})
				.toPromise()
			const { data, status } = response
			if (status === 200) {
				return data
			}
			throw new HttpException('openid、session_key获取失败', HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
