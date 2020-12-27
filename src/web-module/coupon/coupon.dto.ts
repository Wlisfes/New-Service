import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsEnum, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'
import * as Face from '@/interface/common.interface'

export class Coupon {
	@ApiProperty({ description: '最低满足金额', example: 1 })
	@IsNotEmpty({ message: 'satisfy 必填' })
	@IsNumber({}, { message: 'satisfy is number' })
	satisfy: number

	@ApiProperty({ description: '折扣金额', example: 1 })
	@IsNotEmpty({ message: 'discount 必填' })
	@IsNumber({}, { message: 'discount is number' })
	discount: number

	@ApiProperty({ description: '分类id', example: 1 })
	@IsNotEmpty({ message: 'source 必填' })
	source: number

	@ApiProperty({ description: '优惠劵说明', example: '仅限于水果使用' })
	@IsNotEmpty({ message: 'desc 必填' })
	desc: string

	@ApiProperty({ description: '优惠劵状态', example: 1 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status: Face.Mode

	@ApiProperty({ description: '优惠劵开始时间', example: '2020-11-11 00:00:00' })
	@IsNotEmpty({ message: 'startTime 必填' })
	startTime: string

	@ApiProperty({ description: '优惠劵结束时间', example: '2021-12-12 24:00:00' })
	@IsNotEmpty({ message: 'endTime 必填' })
	endTime: string
}

export class CouponList {
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

export class CreateCoupon extends Coupon {}
