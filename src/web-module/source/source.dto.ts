import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator'
import * as Face from '@/interface/common.interface'

export class Source {
	@ApiProperty({ description: '类型名称', example: '水果' })
	@IsNotEmpty({ message: 'name 必填' })
	name: string

	@ApiProperty({ description: '类型图片', example: 'https://xxx/xx/xxx.png' })
	@IsNotEmpty({ message: 'picUrl 必填' })
	picUrl: string

	@ApiProperty({ description: '类型说明', example: '猪头' })
	@IsNotEmpty({ message: 'comment 必填' })
	comment: string

	@ApiProperty({ description: '类型状态', example: 0 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode
}

export class CreateSourceDto extends Source {}
