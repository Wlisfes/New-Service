import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { SourceService } from '@/app-module/source/source.service'
import * as Dto from '@/app-module/source/source.dto'
import * as path from '@/interface/path.interface'

@ApiTags('分类模块')
@Controller(path.App('source'))
export class SourceController {
	constructor(private readonly sourceService: SourceService) {}

	@ApiOperation({ summary: '获取分类列表' })
	@Get('list')
	async sourceList() {
		return await this.sourceService.sourceList()
	}

	@ApiOperation({ summary: '获取分类商品' })
	@Get('product')
	async sourceProduct(@Query() query: Dto.SourceProduct) {
		return await this.sourceService.sourceProduct(query)
	}
}
