import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { FormatService } from '@/web-module/format/format.service'
import { AuthToken } from '@/guard/web.guard'
import * as Dto from '@/web-module/format/format.dto'
import * as Face from '@/interface/entity.interface'

@ApiTags('规则模块')
@Controller('format')
export class FormatController {
	constructor(private readonly formatService: FormatService) {}

	@ApiOperation({ summary: '创建规则名称' })
	@ApiHeader({ name: 'web-token', required: true })
	@Post('create')
	@AuthToken(true)
	async createFormat(@Body() body: Dto.CreateFormat, @Req() req: { ipv4: string; admin: Face.AdminFace }) {
		return await this.formatService.createFormat(body)
	}

	@ApiOperation({ summary: '创建规则值' })
	@ApiHeader({ name: 'web-token', required: true })
	@Post('create/attr')
	@AuthToken(true)
	async createFormatAttr(@Body() body: Dto.CreateFormatAttr) {
		return await this.formatService.createFormatAttr(body)
	}

	@ApiOperation({ summary: '获取规则列表' })
	@Get('list')
	async formatList() {
		return await this.formatService.formatList()
	}

	@ApiOperation({ summary: '获取规则值列表' })
	@ApiQuery({ name: 'id', required: true, description: '规则id' })
	@Get('attr/list')
	async formatAttrList(@Query('id') id: number) {
		return await this.formatService.formatAttrList(id)
	}
}
