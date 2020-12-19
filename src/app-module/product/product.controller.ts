import { Controller, Get, Query, Req } from '@nestjs/common'
import { ProductService } from '@/app-module/product/product.service'
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { AuthToken, AppToken } from '@/guard/app.guard'
import * as Face from '@/interface/entity.interface'
import * as Dto from '@/app-module/product/product.dto'
import * as path from '@/interface/path.interface'

@ApiTags('商品模块')
@Controller(path.App('product'))
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: '商品详情' })
	@ApiQuery({ name: 'id', required: true, description: '商品id' })
	@ApiHeader({ name: 'app-token' })
	@Get('info')
	@AuthToken(true)
	@AppToken(true)
	async productInfo(@Query('id') id: number, @Req() req: { ipv4: string; user?: Face.UserFace }) {
		return await this.productService.productInfo(id, req.user?.uid)
	}

	@ApiOperation({ summary: '猜你喜欢' })
	@Get('love')
	async productLove(@Query() query: Dto.ProductLove) {
		return await this.productService.productLove(query)
	}
}
