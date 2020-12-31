import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator'
import * as Face from '@/interface/common.interface'

export class Rock {
	@ApiProperty({ description: '名称', example: 1 })
	@IsNotEmpty({ message: 'proid 必填' })
	name: string

	@ApiProperty({ description: '分类id', example: 1 })
	@IsNotEmpty({ message: 'source 必填' })
	source: number

	@ApiProperty({ description: '状态', example: 0 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode
}

export class CreateRock extends Rock {}
