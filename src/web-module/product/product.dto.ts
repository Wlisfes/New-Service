import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsEnum, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import * as Face from '@/interface/common.interface'

export class ProductFormat {
	@ApiProperty({ description: '规则id', example: 1 })
	@IsNotEmpty({ message: 'formatId 必填' })
	@IsNumber({}, { message: 'number 价格' })
	formatId: number

	@ApiProperty({ description: '规则值id', example: [1, 2, 3] })
	@IsNotEmpty({ message: 'attr 必填' })
	@IsNumber({}, { each: true, message: 'number 规则值id错误' })
	attr: number[]
}

export class Product {
	@ApiProperty({ description: '商品头图', example: ['https://oss.lisfes.cn/upload/1592634876729.jpg'] })
	@IsNotEmpty({ message: 'banner 必填' })
	@IsString({ each: true, message: 'string 商品头图' })
	banner: string[]

	@ApiProperty({ description: '商品详情图', example: ['https://oss.lisfes.cn/upload/1592634876729.jpg'] })
	@IsNotEmpty({ message: 'content 必填' })
	@IsString({ each: true, message: 'string 商品详情图' })
	content: string[]

	@ApiProperty({ description: '商品title', example: '澳洲进口红肉橙' })
	@IsNotEmpty({ message: 'title 必填' })
	title: string

	@ApiProperty({ description: '商品描述', example: '澳洲进口红肉橙' })
	@IsNotEmpty({ message: 'desc 必填' })
	desc: string

	@ApiProperty({ description: '商品优惠价', example: 19.9 })
	@IsNotEmpty({ message: 'price 必填' })
	@IsNumber({}, { message: 'number 价格' })
	price: number

	@ApiProperty({ description: '商品原价', example: 29.9 })
	@IsNotEmpty({ message: 'price 必填' })
	@IsNumber({}, { message: 'number 价格' })
	suprice: number

	@ApiProperty({ description: '商品所属类型id', example: 1 })
	@IsNotEmpty({ message: 'sourceId 必填' })
	sourceId: number

	@ApiProperty({
		description: '商品规则',
		example: [
			{
				formatId: 1,
				attr: [1, 2, 3]
			}
		]
	})
	@IsNotEmpty({ message: 'format 必填' })
	@IsArray({ message: 'format 格式错误' })
	@ValidateNested({ each: true, message: 'format 格式错误' })
	@Type(() => ProductFormat)
	format: ProductFormat[]

	@ApiProperty({ description: '类型状态', example: 0 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode
}

export class CreateProduct extends Product {}
