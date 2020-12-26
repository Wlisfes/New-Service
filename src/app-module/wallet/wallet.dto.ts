import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class AuthDeduct {
	@ApiProperty({ description: '消费金额', example: 1 })
	@IsNotEmpty({ message: 'consume 必填' })
	@Type(() => Number)
	@IsNumber({}, { message: 'consume is number' })
	consume: number

	@ApiProperty({ description: '文字说明', example: '消费222' })
	@IsNotEmpty({ message: 'context 必填' })
	context: string

	@ApiProperty({ description: '订单id', example: 1 })
	@IsNotEmpty({ message: 'order 必填' })
	order: number
}
