import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateStar {
	@ApiProperty({ description: '商品id', example: 1 })
	@IsNotEmpty({ message: 'id 必填' })
	@Type(() => Number)
	@IsNumber({}, { message: 'id is number' })
	id: number
}

export class UserStar {
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
}
