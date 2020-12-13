import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator'
import * as Face from '@/interface/common.interface'

export class Hotwell {
	@ApiProperty({ description: '商品id', example: 1 })
	@IsNotEmpty({ message: 'proid 必填' })
	proid: number

	@ApiProperty({ description: '热销开始时间', example: '2020-11-11 00:00:00' })
	@IsNotEmpty({ message: 'startTime 必填' })
	startTime: string

	@ApiProperty({ description: '热销结束时间', example: '2020-12-12 24:00:00' })
	@IsNotEmpty({ message: 'endTime 必填' })
	endTime: string

	@ApiProperty({ description: '类型状态', example: 0 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode
}

export class CreateHotwell extends Hotwell {}
