import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

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
}

export class CreateBannerDto extends Banner {}
