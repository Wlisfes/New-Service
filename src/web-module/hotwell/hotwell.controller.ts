import { Controller, Post, Get, Body, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { HotwellService } from '@/web-module/hotwell/hotwell.service'
import * as Dto from '@/web-module/hotwell/hotwell.dto'
import { AuthToken } from '@/guard/web.guard'

@ApiTags('热销模块')
@Controller('hotwell')
export class HotwellController {
	constructor(private readonly hotwellService: HotwellService) {}

	@ApiOperation({ summary: '创建热销' })
	@ApiHeader({ name: 'web-token', required: true })
	@Post('create')
	@AuthToken(true)
	async createFormat(@Body() body: Dto.CreateHotwell) {
		return await this.hotwellService.createHotwell(body)
	}
}
