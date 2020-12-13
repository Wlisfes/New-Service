import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger'
import { BannerService } from '@/app-module/banner/banner.service'
import * as path from '@/interface/path.interface'

@ApiTags('Banner模块')
@Controller(path.App('banner'))
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}

	@ApiOperation({ summary: '获取banner图' })
	@Get('list')
	async bannerList() {
		return await this.bannerService.bannerList()
	}
}
