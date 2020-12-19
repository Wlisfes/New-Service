import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateStar {
	@ApiProperty({ description: '商品id', example: 1 })
	@IsNotEmpty({ message: 'id 必填' })
	@Type(() => Number)
	@IsNumber({}, { message: 'id is number' })
	id: number
}
