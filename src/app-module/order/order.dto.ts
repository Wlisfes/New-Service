import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

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
