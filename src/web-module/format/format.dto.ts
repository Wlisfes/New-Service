import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator'
import * as Face from '@/interface/common.interface'

export class Format {
	@ApiProperty({ description: '规则名称', example: '颜色' })
	@IsNotEmpty({ message: 'name 必填' })
	name: string

	@ApiProperty({ description: '类型状态', example: 0 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode
}

export class FormatAttr {
	@ApiProperty({ description: '所属规则id', example: 1 })
	@IsNotEmpty({ message: 'format 必填' })
	formatId: number

	@ApiProperty({ description: '规则值', example: '黑色' })
	@IsNotEmpty({ message: 'name 必填' })
	name: string

	@ApiProperty({ description: '规则值状态', example: 0 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode
}

export class CreateFormat extends Format {}
export class CreateFormatAttr extends FormatAttr {}
