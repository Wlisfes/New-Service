import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsEnum, IsNumber } from 'class-validator'
import * as Face from '@/interface/common.interface'

export class Banner {
	@ApiProperty({ description: '图片', example: 'https://xxx/xxx.png' })
	@IsNotEmpty({ message: 'picUrl 必填' })
	picUrl: string

	@ApiProperty({ description: '说明', example: '文字描述' })
	@IsNotEmpty({ message: 'comment 必填' })
	comment: string

	@ApiProperty({ description: '商品id', example: 229 })
	@IsNotEmpty({ message: 'proid 必填' })
	proid: number

	@ApiProperty({ description: 'banner状态', example: 0 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode

	@ApiProperty({ description: 'banner排序', example: 1 })
	@IsOptional()
	@IsNumber({}, { message: 'sort 排序' })
	sort?: number
}

export class CreateBannerDto extends Banner {}
