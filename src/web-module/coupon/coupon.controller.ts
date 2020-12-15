import { Controller, Post, Get, Body, Query, Req } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { CouponService } from '@/web-module/coupon/coupon.service'
import { AuthToken } from '@/guard/web.guard'
import * as Dto from '@/web-module/coupon/coupon.dto'
import * as Face from '@/interface/entity.interface'
import * as path from '@/interface/path.interface'

@ApiTags('优惠卷模块')
@Controller(path.Web('coupon'))
export class CouponController {
	constructor(private readonly couponService: CouponService) {}

	@ApiOperation({ summary: '创建优惠劵' })
	@ApiHeader({ name: 'web-token', required: true })
	@Post('create')
	@AuthToken(true)
	async createCoupon(@Body() body: Dto.CreateCoupon, @Req() req: { ipv4: string; admin: Face.AdminFace }) {
		return await this.couponService.createCoupon(body, req.admin.uid)
	}

	@ApiOperation({ summary: '所有优惠劵' })
	@ApiHeader({ name: 'web-token', required: true })
	@Get('list')
	@AuthToken(true)
	async couponList() {
		return await this.couponService.couponList()
	}
}
