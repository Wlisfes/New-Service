import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class Whee {
	@ApiProperty({ description: '商品sku-id', example: 1 })
	@IsNotEmpty({ message: 'skuid 必填' })
	skuid: number

	@ApiProperty({ description: '商品sku编码', example: 'nk189763' })
	@IsNotEmpty({ message: 'skucode 必填' })
	skucode: string

	@ApiProperty({ description: '商品数量', example: 1 })
	@IsNotEmpty({ message: 'some 必填' })
	@IsNumber({}, { message: 'some number' })
	some: number
}

export class CreateWhee extends Whee {
	@ApiProperty({ description: '商品id', example: 2 })
	@IsNotEmpty({ message: 'proid 必填' })
	proid: number
}
