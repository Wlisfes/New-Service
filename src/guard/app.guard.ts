import { Injectable, CanActivate, SetMetadata, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from '@/common/auth/auth.service'
import { RedisService } from '@/common/redis/redis.service'
import { UserService } from '@/app-module/user/user.service'
import { USERKEY } from '@/interface/const.interface'
const APP_AUTH = Symbol('APP_AUTH')
const APP_AUTH_TOKEN = Symbol('APP_AUTH_TOKEN')

@Injectable()
export class AppGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly authService: AuthService,
		private readonly redisService: RedisService,
		private readonly userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const auth = this.reflector.get<boolean>(APP_AUTH, context.getHandler())
		const appToken = this.reflector.get<boolean>(APP_AUTH_TOKEN, context.getHandler())

		//ipv4挂载
		request.ipv4 = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || '127.0.0.1'

		//验证是否登录
		if (auth) {
			const AppToken: string = request.headers['app-token']
			if (!AppToken) {
				if (appToken) {
					//允许未登录通过、已登录会解析user数据挂载到request
					return true
				}
				throw new HttpException('未登陆', HttpStatus.UNAUTHORIZED)
			}

			const ify = await this.authService.verify(AppToken)
			const key = USERKEY(ify.uid)
			const store = await this.redisService.getStore(key)
			if (store) {
				request.user = store
			} else {
				const user = await this.userService.userModel.findOne({ where: { uid: ify.uid } })
				if (!user) {
					throw new HttpException('用户不存在', HttpStatus.FORBIDDEN)
				} else if (user.status !== 1) {
					throw new HttpException('用户已被禁用', HttpStatus.FORBIDDEN)
				}
				await this.redisService.setStore(key, user, 24 * 60 * 60)
				request.user = user
			}
		}

		return true
	}
}

//用户登录守卫  使用AuthToken守卫的接口会验证用户登录
export const AuthToken = (auth: boolean) => SetMetadata(APP_AUTH, auth)

//未登录时不否抛401错误、需要配合AuthToken守卫使用
export const AppToken = (auth: boolean) => SetMetadata(APP_AUTH_TOKEN, auth)
