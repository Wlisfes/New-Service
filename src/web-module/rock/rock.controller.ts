import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { RockService } from '@/web-module/rock/rock.service'
import { AuthToken } from '@/guard/web.guard'
import * as Face from '@/interface/entity.interface'
import * as path from '@/interface/path.interface'
import * as Dto from '@/web-module/rock/rock.dto'

@ApiTags('商品类型模块')
@Controller(path.Web('rock'))
export class RockController {
	constructor(private readonly rockService: RockService) {}

	@ApiOperation({ summary: '创建类型' })
	@ApiHeader({ name: 'web-token', required: true })
	@AuthToken(true)
	@Post('create')
	async createRock(@Body() body: Dto.CreateRock, @Req() req: { ipv4: string; admin: Face.AdminFace }) {
		return await this.rockService.createRock(body, req.admin.uid)
	}

	@ApiOperation({ summary: '分类列表' })
	@ApiQuery({ name: 'source', required: true, description: '分类id' })
	@Get('source')
	async sourceRock(@Query('source') source: number) {
		return await this.rockService.sourceRock(source)
	}
}
