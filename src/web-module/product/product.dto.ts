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

export class ProductSku {
	@ApiProperty({ description: 'suk组合id', example: '1-1' })
	@IsNotEmpty({ message: 'skukey 必填' })
	skukey: string

	@ApiProperty({ description: 'suk组合名称', example: '黑色-128G' })
	@IsNotEmpty({ message: 'skuname 必填' })
	skuname: string

	@ApiProperty({ description: '价格', example: 19.9 })
	@IsNotEmpty({ message: 'price 必填' })
	@IsNumber({}, { message: 'number 价格' })
	price: number

	@ApiProperty({ description: '成本价', example: 9.9 })
	@IsNotEmpty({ message: 'costprice 必填' })
	@IsNumber({}, { message: 'number 成本价' })
	costprice: number

	@ApiProperty({ description: '库存', example: 100 })
	@IsNotEmpty({ message: 'stock 必填' })
	@IsNumber({}, { message: 'number 库存' })
	stock: number

	@ApiProperty({ description: '规格编码', example: 'nk189760' })
	@IsNotEmpty({ message: 'coding 必填' })
	coding: string
}

export class Product {
	@ApiProperty({ description: '图片', example: 'https://oss.lisfes.cn/service/1605967031503.png' })
	@IsNotEmpty({ message: 'picUrl 必填' })
	picUrl: string

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
			{ formatId: 1, attr: [1, 2] },
			{ formatId: 2, attr: [5, 6] }
		]
	})
	@IsNotEmpty({ message: 'format 必填' })
	@IsArray({ message: 'format 格式错误' })
	@ValidateNested({ each: true, message: 'format 格式错误' })
	@Type(() => ProductFormat)
	format: ProductFormat[]

	@ApiProperty({
		description: '商品sku',
		example: [
			{ skukey: '1-5', skuname: '黑色-S', price: 19.9, costprice: 9.9, stock: 100, coding: 'nk189760' },
			{ skukey: '1-6', skuname: '黑色-M', price: 19.9, costprice: 9.9, stock: 100, coding: 'nk189761' },
			{ skukey: '2-5', skuname: '红色-S', price: 19.9, costprice: 9.9, stock: 100, coding: 'nk189762' },
			{ skukey: '2-6', skuname: '红色-M', price: 19.9, costprice: 9.9, stock: 100, coding: 'nk189763' }
		]
	})
	@IsNotEmpty({ message: 'sku 必填' })
	@IsArray({ message: 'sku 格式错误' })
	@ValidateNested({ each: true, message: 'sku 格式错误' })
	@Type(() => ProductSku)
	sku: ProductSku[]

	@ApiProperty({ description: '类型状态', example: 0 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode
}

export class CreateProduct extends Product {}
