import { Controller, Post, Body, Req } from '@nestjs/common'
import { OrderService } from '@/app-module/order/order.service'
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger'
import { AuthToken } from '@/guard/app.guard'
import * as Face from '@/interface/entity.interface'
import * as Dto from '@/app-module/order/order.dto'
import * as path from '@/interface/path.interface'

@ApiTags('订单模块')
@Controller(path.App('order'))
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@ApiOperation({ summary: '创建订单' })
	@ApiHeader({ name: 'app-token', required: true })
	@Post('create')
	@AuthToken(true)
	async createOrder(@Body() body: Dto.CreateOrder, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.orderService.createOrder(body, req.user.uid)
	}
}
