import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger'
import { AdminService } from '@/web-module/admin/admin.service'
import { AuthToken } from '@/guard/web.guard'
import * as Face from '@/web-module/admin/admin.dto'

@ApiTags('管理员模块')
@Controller(`admin`)
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@ApiOperation({ summary: '创建管理员' })
	@Post('create')
	async createAdmin(@Body() body: Face.CreateAdminDto) {
		return await this.adminService.createAdmin(body)
	}

	@ApiOperation({ summary: '手机号登录' })
	@Post('login/mobile')
	async loginMobile(@Body() body: Face.LoginMobileDto) {
		return await this.adminService.loginMobile(body)
	}

	@ApiOperation({ summary: '获取管理员信息' })
	@ApiHeader({ name: 'web-token', required: true })
	@Get('one')
	@AuthToken(true)
	async adminOne(@Req() req: { ipv4: string; admin: { uid: number } }) {
		return await this.adminService.adminOne(req.admin.uid)
	}

	@ApiOperation({ summary: '根据uid获取管理员信息' })
	@ApiHeader({ name: 'web-token', required: true })
	@Get('one/uid')
	@AuthToken(true)
	async adminOneUid(@Query('uid') uid: number) {
		return await this.adminService.adminOne(uid)
	}
}
