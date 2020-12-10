import { Injectable, CanActivate, SetMetadata, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from '@/common/auth/auth.service'

@Injectable()
export class WebGuard implements CanActivate {
	constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.reflector.get<boolean>('token', context.getHandler())

		//ipv4挂载
		request.ipv4 = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || '127.0.0.1'

		//验证是否登录
		if (token) {
			const webtoken = request.headers['web-token'] //读取headers中的web-token
			if (!webtoken) {
				throw new HttpException('未登陆', HttpStatus.UNAUTHORIZED)
			}

			const admin = await this.authService.verify(webtoken) //解密token
			if (admin) {
				request.admin = admin
			}
		}

		return true
	}
}

//管理员登录守卫  使用AuthUser守卫的接口会验证管理员登录
export const AuthToken = (token: boolean) => SetMetadata('token', token)
