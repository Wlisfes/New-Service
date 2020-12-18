import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class ProductLove {
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
