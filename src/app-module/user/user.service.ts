import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { OssService } from '@/common/oss/oss.service'
import { UtilsService } from '@/common/utils/utils.service'
import { WechatService } from '@/common/wechat/wechat.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import * as Dto from '@/app-module/user/user.dto'

@Injectable()
export class UserService {
	constructor(
		private readonly wechatService: WechatService,
		private readonly utilsService: UtilsService,
		private readonly ossService: OssService,
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>
	) {}

	//创建用户
	async createUser(params: Dto.CreateUser) {
		try {
			const { openid } = await this.wechatService.login(params.code)
			const user = await this.userModel.findOne({ where: { openid } })
			if (user) {
				return user
			} else {
				const dataBuffer = await this.utilsService.downloadFile(params.avatar)
				const target = `store/avatar/${this.ossService.getRename('name.jpg')}`
				const buffer = await this.ossService.createStream(dataBuffer)
				const response = await this.ossService.putStream(target, buffer)
				if (response.res.status === 200) {
					const avatar = this.ossService.options.domain + '/' + response.name
					const newUser = await this.userModel.create({
						avatar,
						openid,
						nickname: params.nickname
					})
					return await this.userModel.save(newUser)
				}
				throw new HttpException('oss上传失败', HttpStatus.BAD_REQUEST)
			}
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
