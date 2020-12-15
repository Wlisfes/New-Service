import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common'
import { UserService } from '@/app-module/user/user.service'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { AuthToken } from '@/guard/web.guard'
import * as path from '@/interface/path.interface'
import * as Dto from '@/app-module/user/user.dto'

@ApiTags('用户模块')
@Controller(path.App('user'))
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: '创建用户' })
	@Post('create')
	async createUser(@Body() body: Dto.CreateUser) {
		return await this.userService.createUser(body)
	}

	@ApiOperation({ summary: '根据uid拉取用户信息' })
	@ApiQuery({ name: 'uid', required: true })
	@Get('one/uid')
	async findOneUid(@Query('uid') uid: number) {
		return await this.userService.findOneUid(uid)
	}

	@ApiOperation({ summary: '根据openid拉取用户信息' })
	@ApiQuery({ name: 'openid', required: true })
	@Get('one/openid')
	async findOneOpenid(@Query('openid') openid: string) {
		return await this.userService.findOneOpenid(openid)
	}
}
