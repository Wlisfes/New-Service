import { Controller, Post, Get, Delete, Query, Body, Req } from '@nestjs/common'
import { WheeService } from '@/app-module/whee/whee.service'
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger'
import { AuthToken } from '@/guard/app.guard'
import * as Dto from '@/app-module/whee/whee.dto'
import * as Face from '@/interface/entity.interface'
import * as path from '@/interface/path.interface'

@ApiTags('购物车模块')
@Controller(path.App('whee'))
export class WheeController {
	constructor(private readonly wheeService: WheeService) {}

	@ApiOperation({ summary: '加入购物车' })
	@ApiHeader({ name: 'app-token', required: true })
	@Post('create')
	@AuthToken(true)
	async createWhee(@Body() body: Dto.CreateWhee, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.wheeService.createWhee(body, req.user.uid)
	}

	@ApiOperation({ summary: '删除购物车商品' })
	@ApiHeader({ name: 'app-token', required: true })
	@Delete('del')
	@AuthToken(true)
	async deleteWhee(@Body() body: Dto.DeleteWhee, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.wheeService.deleteWhee(body.id, req.user.uid)
	}

	@ApiOperation({ summary: '获取购物车列表' })
	@ApiHeader({ name: 'app-token', required: true })
	@Get('list')
	@AuthToken(true)
	async wheeList(@Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.wheeService.wheeList(req.user.uid)
	}
}
