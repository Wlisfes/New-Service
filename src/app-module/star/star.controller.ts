import { Controller, Post, Get, Delete, Query, Req } from '@nestjs/common'
import { StarService } from '@/app-module/star/star.service'
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { AuthToken } from '@/guard/app.guard'
import * as Face from '@/interface/entity.interface'
import * as path from '@/interface/path.interface'

@ApiTags('收藏模块')
@Controller(path.App('star'))
export class StarController {
	constructor(private readonly starService: StarService) {}

	@ApiOperation({ summary: '添加收藏' })
	@ApiQuery({ name: 'id', required: true, description: '商品id' })
	@ApiHeader({ name: 'app-token', required: true })
	@Post('create')
	@AuthToken(true)
	async createStar(@Query('id') id: number, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.starService.createStar(id, req.user.uid)
	}

	@ApiOperation({ summary: '取消收藏' })
	@ApiQuery({ name: 'id', required: true, description: '商品id' })
	@ApiHeader({ name: 'app-token', required: true })
	@Delete('del')
	@AuthToken(true)
	async deleteStar(@Query('id') id: number, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.starService.deleteStar(id, req.user.uid)
	}

	@ApiOperation({ summary: '我的收藏列表' })
	@ApiHeader({ name: 'app-token', required: true })
	@Get('list')
	@AuthToken(true)
	async userStar(@Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.starService.userStar(req.user.uid)
	}
}
