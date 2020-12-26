import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateUser {
	@ApiProperty({ description: '头像', example: '123456' })
	@IsNotEmpty({ message: 'avatar 必填' })
	avatar: string

	@ApiProperty({ description: '昵称', example: '猪头' })
	@IsNotEmpty({ message: 'nickname 必填' })
	nickname: string

	@ApiProperty({ description: 'code', example: '043x0h0w30xNtV2UJf2w37uuQW2x0h0R' })
	@IsNotEmpty({ message: 'code 必填' })
	code: string
}

export class UsePay {
	@ApiProperty({ description: '支付密码', example: 123456 })
	@IsNotEmpty({ message: 'password 必填' })
	@Type(() => String)
	password: string
}
