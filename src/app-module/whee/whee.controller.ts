import { Controller, Post, Get, Delete,Put, Body, Req } from '@nestjs/common'
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

	@ApiOperation({ summary: '修改商品数量' })
	@ApiHeader({ name: 'app-token', required: true })
	@Put('some')
	@AuthToken(true)
	async updateWheeSome(@Body() body: Dto.UpdateWheeSome, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.wheeService.updateWheeSome(body, req.user.uid)
	}

	@ApiOperation({ summary: '添加订单商品到购物车' })
	@ApiHeader({ name: 'app-token', required: true })
	@Post('create/order')
	@AuthToken(true)
	async createOrderWhee(@Body() body: Dto.CreateOrderWhee, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.wheeService.createOrderWhee(body, req.user.uid)
	}

	@ApiOperation({ summary: '加入购物车缓存' })
	@ApiHeader({ name: 'app-token', required: true })
	@Post('create/cache')
	@AuthToken(true)
	async createCacheWhee(@Body() body: Dto.CreateWhee, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.wheeService.createCacheWhee(body, req.user.uid)
	}

	@ApiOperation({ summary: '删除购物车商品' })
	@ApiHeader({ name: 'app-token', required: true })
	@Delete('del')
	@AuthToken(true)
	async deleteWhee(@Body() body: Dto.DeleteWhee, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.wheeService.deleteWhee(body.id, req.user.uid)
	}

	@ApiOperation({ summary: '批量获取购物车' })
	@ApiHeader({ name: 'app-token', required: true })
	@Post('ids')
	@AuthToken(true)
	async wheeIds(@Body() body: Dto.WheeIds, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.wheeService.wheeIds(body, req.user.uid)
	}

	@ApiOperation({ summary: '获取购物车列表' })
	@ApiHeader({ name: 'app-token', required: true })
	@Get('list')
	@AuthToken(true)
	async wheeList(@Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.wheeService.wheeList(req.user.uid)
	}
}
