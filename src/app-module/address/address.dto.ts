import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsPhoneNumber, IsOptional, IsEnum } from 'class-validator'
import * as Face from '@/interface/common.interface'

export class Address {
	@ApiProperty({ description: '收货人', example: '妖雨纯' })
	@IsNotEmpty({ message: 'name 必填' })
	name: string

	@ApiProperty({ description: '所在地区', example: '广东省、深圳市、龙岗区' })
	@IsNotEmpty({ message: 'region 必填' })
	region: string

	@ApiProperty({ description: '详细地址', example: '坂田国际中心A栋' })
	@IsNotEmpty({ message: 'address 必填' })
	address: string

	@ApiProperty({ description: '手机号', example: '18676361342' })
	@IsNotEmpty({ message: 'mobile 必填' })
	@IsPhoneNumber('CN', { message: '手机号格式错误' })
	mobile: string

	@ApiProperty({ description: '类型状态', example: 0 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'checked 类型错误' })
	checked: Face.Mode
}

export class UpdateAddress extends Address {
	@ApiProperty({ description: '收货地址id', example: 1 })
	@IsNotEmpty({ message: 'id 必填' })
	id: number
}

export class CreateAddress extends Address {}
