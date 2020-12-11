import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { compareSync } from 'bcryptjs'
import { UtilsService } from '@/common/utils/utils.service'
import { AuthService } from '@/common/auth/auth.service'
import { AdminEntity } from '@/entity/admin.entity'
import * as svgCaptcha from 'svg-captcha'
import * as Face from '@/web-module/admin/admin.dto'

@Injectable()
export class AdminService {
	constructor(
		private readonly authService: AuthService,
		private readonly utilsService: UtilsService,
		@InjectRepository(AdminEntity) public readonly adminModel: Repository<AdminEntity>
	) {}

	//验证码
	public async svgCode() {
		const Code = svgCaptcha.create({
			fontSize: 36,
			noise: 2,
			width: 123,
			height: 40,
			inverse: true,
			background: '#cc9966'
		})
		return Code
	}

	//手机号登录
	public async loginMobile(params: Face.LoginMobileDto) {
		try {
			const admin = await this.adminModel.findOne({
				where: { mobile: params.mobile },
				select: ['uid', 'password', 'status']
			})
			if (admin) {
				if (admin.status !== 1) {
					throw new HttpException('账户已被禁用', HttpStatus.BAD_REQUEST)
				}
				if (!compareSync(params.password, admin.password)) {
					throw new HttpException('password 错误', HttpStatus.BAD_REQUEST)
				}

				const token = await this.authService.sign({
					uid: admin.uid,
					password: admin.password
				})
				const T = await this.findOne({ where: { uid: admin.uid } })
				return { ...T, token }
			}
			throw new HttpException('mobile 错误', HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//创建管理员
	public async createAdmin(params: Face.CreateAdminDto): Promise<AdminEntity> {
		try {
			if (await this.adminModel.findOne({ where: { mobile: params.mobile } })) {
				throw new HttpException(`手机号: ${params.mobile} 已存在`, HttpStatus.BAD_REQUEST)
			}
			const admin = await this.adminModel.create({
				mobile: params.mobile,
				nickname: params.nickname,
				password: params.password
			})
			const { uid } = await this.adminModel.save(admin)
			return this.findOne({ where: { uid } })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//获取管理员信息
	public async adminOne(uid: number) {
		return await this.findOne({ where: { uid } })
	}

	//查询管理员
	public async findOne(params: { where?: { uid?: number; mobile?: string | number }; relations?: string[] }) {
		try {
			return await this.adminModel.findOne({
				where: params.where,
				select: ['uid', 'mobile', 'nickname', 'avatar', 'status', 'createTime'],
				relations: params.relations
			})
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
