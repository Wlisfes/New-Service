import { Injectable, CanActivate, SetMetadata, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from '@/common/auth/auth.service'
import { RedisService } from '@/common/redis/redis.service'
import { AdminService } from '@/web-module/admin/admin.service'

@Injectable()
export class WebGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly authService: AuthService,
		private readonly redisService: RedisService,
		private readonly adminService: AdminService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const auth = this.reflector.get<boolean>('AUTH', context.getHandler())

		//ipv4挂载
		request.ipv4 = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || '127.0.0.1'

		//验证是否登录
		if (auth) {
			const Authorization: string = request.headers['authorization']
			if (!Authorization) {
				throw new HttpException('未登陆', HttpStatus.UNAUTHORIZED)
			}

			const ify = await this.authService.verify(Authorization.replace(/Bearer /g, ''))
			const key = `admin_uid_${ify.uid}`
			const store = await this.redisService.getStore(key)
			if (store) {
				request.admin = store
			} else {
				const admin = await this.adminService.adminModel.findOne({ where: { uid: ify.uid } })
				if (!admin) {
					throw new HttpException('账户不存在', HttpStatus.FORBIDDEN)
				} else if (admin.status !== 1) {
					throw new HttpException('账户已被禁用', HttpStatus.FORBIDDEN)
				}
				await this.redisService.setStore(key, admin, 24 * 60 * 60)
				request.admin = admin
			}
		}

		return true
	}
}

//管理员登录守卫  使用AuthToken守卫的接口会验证管理员登录
export const AuthToken = (auth: boolean) => SetMetadata('AUTH', auth)
