import { Controller, Post, Get, Body, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { AdminService } from '@/web-module/admin/admin.service'
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
}
