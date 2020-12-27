import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, IsNotEmpty, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'
import * as Face from '@/interface/common.interface'

export class Order {
	@ApiProperty({ description: '用户地址id', example: 1 })
	@IsNotEmpty({ message: 'address 必填' })
	@Type(() => Number)
	address: number

	@ApiProperty({ description: '购物车商品id', example: [1, 2, 3] })
	@IsNotEmpty({ message: 'ids 必填' })
	@Type(() => Number)
	@IsNumber({}, { each: true, message: 'ids is Array-number' })
	ids: number[]

	@ApiProperty({ description: '优惠劵id', example: 1 })
	@IsOptional()
	@Type(() => Number)
	@IsNumber({}, { message: 'coupon is number' })
	coupon?: number

	@ApiProperty({ description: '买家留言', example: '买家留言买家留言' })
	@IsOptional()
	@Type(() => String)
	@IsString({ message: 'leave is string' })
	leave?: string
}

export class CreateOrder extends Order {}

export class PayOrder {
	@ApiProperty({ description: 'orderid', example: 1 })
	@IsNotEmpty({ message: 'order 必填' })
	@Type(() => Number)
	order: number

	@ApiProperty({ description: '支付密码', example: 123456 })
	@IsNotEmpty({ message: 'password 必填' })
	password: string
}

export class OrderList {
	@ApiProperty({ description: '偏移数量', example: 0 })
	@IsOptional()
	@Type(() => Number)
	@IsNumber({}, { message: 'offset is number' })
	offset?: number

	@ApiProperty({ description: '查询数量', example: 10 })
	@IsOptional()
	@Type(() => Number)
	@IsNumber({}, { message: 'limit is number' })
	limit?: number

	@ApiProperty({ description: '类型状态', example: 1 })
	@IsOptional()
	@Type(() => Number)
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode
}

export class DecOrder {
	@ApiProperty({ description: '订单id', example: 1 })
	@IsNotEmpty({ message: 'id 必填' })
	@Type(() => Number)
	id: number
}

export class IncomeOrder extends DecOrder {
	@ApiProperty({ description: '支付密码', example: 123456 })
	@IsNotEmpty({ message: 'password 必填' })
	password: string
}
