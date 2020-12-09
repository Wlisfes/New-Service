import { Controller, Post, Get, Body, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger'
import { AdminService } from '@/web-module/admin/admin.service'
import { AuthToken } from '@/guard/web.guard'
import * as Face from '@/web-module/admin/admin.dto'

@Controller(`admin`)
@ApiTags('管理员模块')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@ApiOperation({ summary: '创建管理员' })
	@Post('create')
	async createAdmin(@Body() body: Face.CreateAdminDto) {
		return await this.adminService.createAdmin(body)
	}

	@ApiOperation({ summary: '获取管理员信息' })
	@ApiHeader({ name: 'access-token', required: true })
	@Get('one')
	@AuthToken(true)
	async adminOne() {
		return await this.adminService.adminOne(1607526369477)
	}

	@ApiOperation({ summary: '根据uid获取管理员信息' })
	@ApiHeader({ name: 'access-token', required: true })
	@Get('uid')
	@AuthToken(true)
	async adminOneUid(@Query('uid') uid: number) {
		return await this.adminService.adminOne(uid)
	}
}
