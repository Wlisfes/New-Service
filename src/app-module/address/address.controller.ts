import { Controller, Post, Get, Put, Body, Query, Req } from '@nestjs/common'
import { AddressService } from '@/app-module/address/address.service'
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger'
import { AuthToken, AppToken } from '@/guard/app.guard'
import * as Dto from '@/app-module/address/address.dto'
import * as Face from '@/interface/entity.interface'
import * as path from '@/interface/path.interface'

@ApiTags('收货地址模块')
@Controller(path.App('address'))
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

	@ApiOperation({ summary: '创建收货地址' })
	@ApiHeader({ name: 'app-token', required: true })
	@Post('create')
	@AuthToken(true)
	async createAddress(@Body() body: Dto.CreateAddress, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.addressService.createAddress(body, req.user.uid)
	}

	@ApiOperation({ summary: '获取默认地址' })
	@ApiHeader({ name: 'app-token', required: true })
	@Get('/')
	@AuthToken(true)
	@AppToken(true)
	async address(@Req() req: { ipv4: string; user?: Face.UserFace }) {
		return await this.addressService.address(req.user?.uid)
	}

	@ApiOperation({ summary: '获取收货地址列表' })
	@ApiHeader({ name: 'app-token', required: true })
	@Get('list')
	@AuthToken(true)
	async createList(@Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.addressService.createList(req.user.uid)
	}

	@ApiOperation({ summary: '修改收货地址' })
	@ApiHeader({ name: 'app-token', required: true })
	@Put('update')
	@AuthToken(true)
	async updateAddress(@Body() body: Dto.UpdateAddress, @Req() req: { ipv4: string; user: Face.UserFace }) {
		return await this.addressService.updateAddress(body, req.user.uid)
	}
}
