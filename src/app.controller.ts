import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { AppService } from '@/app.service'

@Controller()
@ApiTags('根模块')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({ summary: 'Hello' })
	getHello(): string {
		return this.appService.getHello()
	}

	@Get('weather')
	async weather() {
		return await this.appService.weather()
	}
}
