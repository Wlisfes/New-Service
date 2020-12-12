import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { ProductService } from '@/web-module/product/product.service'
import { AuthToken } from '@/guard/web.guard'
import * as Dto from '@/web-module/product/product.dto'
import * as Face from '@/interface/entity.interface'

@ApiTags('商品模块')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiOperation({ summary: '创建商品' })
	@ApiHeader({ name: 'web-token', required: true })
	@Post('create')
	@AuthToken(true)
	async createProduct(@Body() body: Dto.CreateProduct, @Req() req: { ipv4: string; admin: Face.AdminFace }) {
		return await this.productService.createProduct(body, req.admin.uid)
	}

	@ApiOperation({ summary: '商品详情' })
	// @ApiHeader({ name: 'web-token', required: true })
	@ApiQuery({ name: 'id', required: true, description: '商品id' })
	@Get('info')
	// @AuthToken(true)
	async productInfo(@Query('id') id: number) {
		return await this.productService.productInfo(id)
	}
}
