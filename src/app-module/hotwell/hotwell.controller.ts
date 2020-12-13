import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { HotwellService } from '@/app-module/hotwell/hotwell.service'
import * as path from '@/interface/path.interface'

@ApiTags('热销模块')
@Controller(path.App('hotwell'))
export class HotwellController {
	constructor(private readonly hotwellService: HotwellService) {}

	@ApiOperation({ summary: '获取热销列表' })
	@Get('list')
	async hotwellList() {
		return await this.hotwellService.hotwellList()
	}
}
