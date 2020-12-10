import { Injectable, CanActivate, SetMetadata, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AppGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.reflector.get<boolean>('token', context.getHandler())

		//ipv4挂载
		request.ipv4 = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || '127.0.0.1'

		//验证是否登录
		if (token) {
			const apptoken = request.headers['app-token'] //读取headers中的app-token
			if (!apptoken) {
				throw new HttpException('未登陆', HttpStatus.UNAUTHORIZED)
			}
		}

		return true
	}
}

//管理员登录守卫  使用AuthUser守卫的接口会验证管理员登录
export const AuthToken = (token: boolean) => SetMetadata('token', token)
