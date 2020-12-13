import { Controller, Post, Body, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger'
import { BannerService } from '@/web-module/banner/banner.service'
import { AuthToken } from '@/guard/web.guard'
import * as Face from '@/web-module/banner/banner.dto'

@Controller('banner')
@ApiTags('Banner模块')
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}

	@ApiOperation({ summary: '创建banner' })
	@ApiHeader({ name: 'web-token', required: true })
	@Post('create')
	@AuthToken(true)
	async createAdmin(@Body() body: Face.CreateBannerDto, @Req() req: { ipv4: string; admin: { uid: number } }) {
		return await this.bannerService.createBanner(body, req.admin.uid)
	}
}
