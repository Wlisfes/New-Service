import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'
import * as Face from '@/interface/common.interface'

export enum StatusEnum {
	'status-0' = '优惠劵已删除'
}

export class UserCoupon {
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
	status: Face.Mode
}
