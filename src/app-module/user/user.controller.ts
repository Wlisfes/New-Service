import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from '@/app-module/user/user.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('用户模块')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: '创建用户' })
	@Post('create')
	async createUser(@Body() body) {
		return await this.userService.createUser()
	}
}
