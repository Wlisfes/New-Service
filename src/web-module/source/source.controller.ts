import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger'
import { AuthToken } from '@/guard/web.guard'
import { SourceService } from '@/web-module/source/source.service'
import * as Face from '@/web-module/source/source.dto'

@ApiTags('分类模块')
@Controller('source')
export class SourceController {
	constructor(private readonly sourceService: SourceService) {}

	@ApiOperation({ summary: '创建分类' })
	@ApiHeader({ name: 'web-token', required: true })
	@AuthToken(true)
	@Post('create')
	async createSource(@Body() body: Face.CreateSourceDto, @Req() req: { ipv4: string; admin: { uid: number } }) {
		return await this.sourceService.createSource(body, req.admin.uid)
	}
}
