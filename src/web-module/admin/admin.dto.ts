import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsPhoneNumber } from 'class-validator'

export class Admin {
	@ApiProperty({ description: '手机号', example: '18676361342' })
	@IsNotEmpty({ message: 'mobile 必填' })
	@IsPhoneNumber('CN', { message: '手机号格式错误' })
	mobile: string

	@ApiProperty({ description: '密码', example: '123456' })
	@IsNotEmpty({ message: 'password 必填' })
	password: string

	@ApiProperty({ description: '昵称', example: '猪头' })
	@IsNotEmpty({ message: 'nickname 必填' })
	nickname: string
}

export class LoginMobileDto {
	@ApiProperty({ description: '手机号', example: '18676361342' })
	@IsNotEmpty({ message: 'mobile 必填' })
	@IsPhoneNumber('CN', { message: '手机号格式错误' })
	mobile: string

	@ApiProperty({ description: '密码', example: '123456' })
	@IsNotEmpty({ message: 'password 必填' })
	password: string
}

export class CreateAdminDto extends Admin {}
