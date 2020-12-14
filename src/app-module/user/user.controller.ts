import { Controller, Post, Body, Req } from '@nestjs/common'
import { UserService } from '@/app-module/user/user.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
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
}
