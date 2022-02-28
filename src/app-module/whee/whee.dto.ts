import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class Whee {
	@ApiProperty({ description: '商品sku-id', example: 1 })
	@IsNotEmpty({ message: 'sku 必填' })
	sku: number

	@ApiProperty({ description: '商品数量', example: 1 })
	@IsNotEmpty({ message: 'some 必填' })
	@Type(() => Number)
	@IsNumber({}, { message: 'some number' })
	some: number
}

export class CreateWhee extends Whee {
	@ApiProperty({ description: '商品id', example: 2 })
	@IsNotEmpty({ message: 'id 必填' })
	id: number
}

export class UpdateWheeSome {
	@ApiProperty({ description: '购物车id', example: 2 })
	@IsNotEmpty({ message: 'id 必填' })
	id: number

	@ApiProperty({ description: '商品数量', example: 1 })
	@IsNotEmpty({ message: 'some 必填' })
	@Type(() => Number)
	@IsNumber({}, { message: 'some number' })
	some: number
}

export class DeleteWhee {
	@ApiProperty({ description: '购物车id', example: 2 })
	@IsNotEmpty({ message: 'id 必填' })
	id: number
}

export class WheeIds {
	@ApiProperty({ description: '购物车id', example: [1, 2, 3] })
	@IsNotEmpty({ message: 'ids 必填' })
	@Type(() => Number)
	@IsNumber({}, { each: true, message: 'ids is Array-number' })
	ids: number[]
}

export class CreateOrderWhee {
	@ApiProperty({ description: '订单id', example: 2 })
	@IsNotEmpty({ message: 'order 必填' })
	order: number
}
