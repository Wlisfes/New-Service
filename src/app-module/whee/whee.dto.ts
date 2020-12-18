import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class Whee {
	@ApiProperty({ description: '商品sku-id', example: 1 })
	@IsNotEmpty({ message: 'sku 必填' })
	sku: number

	@ApiProperty({ description: '商品数量', example: 1 })
	@IsNotEmpty({ message: 'some 必填' })
	@IsNumber({}, { message: 'some number' })
	some: number
}

export class CreateWhee extends Whee {
	@ApiProperty({ description: '商品id', example: 2 })
	@IsNotEmpty({ message: 'id 必填' })
	id: number
}
