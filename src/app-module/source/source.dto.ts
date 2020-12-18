import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsEnum, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

enum SortFace {
	PROPER = 1,
	SALES = 2,
	PRICE = 3
}

export class SourceProduct {
	@ApiProperty({ description: '分类id', example: 1 })
	@IsNotEmpty({ message: 'source 必填' })
	@Type(() => Number)
	@IsNumber({}, { message: 'source is number' })
	source: number

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
	@IsNotEmpty({ message: 'sort 必填' })
	@Type(() => Number)
	@IsEnum(SortFace, { message: 'status 类型错误' })
	sort: SortFace
}
