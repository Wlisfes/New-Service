import { Controller, Post, Get, Put, Body, Query, Req } from '@nestjs/common'
import { UserService } from '@/app-module/user/user.service'
import { ApiTags, ApiOperation, ApiQuery, ApiHeader } from '@nestjs/swagger'
import { AuthToken } from '@/guard/app.guard'
import * as path from '@/interface/path.interface'
import * as Face from '@/interface/entity.interface'
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
	@ApiQuery({ name: 'uid', required: true, example: 1607959269654 })
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

	@ApiOperation({ summary: '统计信息' })
	@ApiHeader({ name: 'app-token', required: true })
	@Get('count')
	@AuthToken(true)
	async userCount(@Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.userService.userCount(req.user.uid)
	}

	@ApiOperation({ summary: '设置、修改支付密码' })
	@ApiHeader({ name: 'app-token', required: true })
	@Put('use/pay')
	@AuthToken(true)
	async usePay(@Body() body: Dto.UsePay, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.userService.usePay(body.password, req.user.uid)
	}
}
