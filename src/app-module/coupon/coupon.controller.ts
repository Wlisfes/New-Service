import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common'
import { CouponService } from '@/app-module/coupon/coupon.service'
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { AuthToken } from '@/guard/app.guard'
import * as Face from '@/interface/entity.interface'
import * as Dto from '@/app-module/coupon/coupon.dto'
import * as path from '@/interface/path.interface'

@ApiTags('优惠劵模块')
@Controller(path.App('coupon'))
export class CouponController {
	constructor(private readonly couponService: CouponService) {}

	@ApiOperation({ summary: '领取优惠卷' })
	@ApiHeader({ name: 'app-token', required: true })
	@ApiQuery({ name: 'id', required: true, description: '优惠劵id' })
	@Get('create')
	@AuthToken(true)
	async createCoupon(@Query('id') id: number, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.couponService.createCoupon(id, req.user.uid)
	}

	//我的优惠劵
	@ApiOperation({ summary: '我的优惠劵' })
	@ApiHeader({ name: 'app-token', required: true })
	@Get('list')
	@AuthToken(true)
	async couponList(@Query() query: Dto.CouponList, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.couponService.couponList(query, req.user.uid)
	}
}
