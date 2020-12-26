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
	@ApiProperty({ description: '图片', example: 'https://oss.lisfes.cn/store/upload/1608199021074.webp' })
	@IsNotEmpty({ message: 'picUrl 必填' })
	picUrl: string

	@ApiProperty({
		description: '商品头图',
		example: [
			'https://oss.lisfes.cn/store/upload/1608199021074.webp',
			'https://oss.lisfes.cn/store/upload/1608199508280.webp',
			'https://oss.lisfes.cn/store/upload/1608199629620.webp',
			'https://oss.lisfes.cn/store/upload/1608199657925.webp',
			'https://oss.lisfes.cn/store/upload/1608199684502.webp',
			'https://oss.lisfes.cn/store/upload/1608199698930.webp'
		]
	})
	@IsNotEmpty({ message: 'banner 必填' })
	@IsString({ each: true, message: 'string 商品头图' })
	banner: string[]

	@ApiProperty({
		description: '商品详情图',
		example: [
			'https://oss.lisfes.cn/store/upload/1608199757906.webp',
			'https://oss.lisfes.cn/store/upload/1608199779302.webp',
			'https://oss.lisfes.cn/store/upload/1608199871659.webp',
			'https://oss.lisfes.cn/store/upload/1608199937673.webp',
			'https://oss.lisfes.cn/store/upload/1608199955298.webp',
			'https://oss.lisfes.cn/store/upload/1608199968379.webp',
			'https://oss.lisfes.cn/store/upload/1608199982209.webp',
			'https://oss.lisfes.cn/store/upload/1608199993638.webp',
			'https://oss.lisfes.cn/store/upload/1608200005909.webp'
		]
	})
	@IsNotEmpty({ message: 'content 必填' })
	@IsString({ each: true, message: 'string 商品详情图' })
	content: string[]

	@ApiProperty({ description: '商品title', example: '水果猕猴桃奇异果绿心猕猴桃 3斤装 单果80g起源产地直发' })
	@IsNotEmpty({ message: 'title 必填' })
	title: string

	@ApiProperty({ description: '商品描述', example: '水果猕猴桃奇异果绿心猕猴桃 3斤装 单果80g起源产地直发' })
	@IsNotEmpty({ message: 'desc 必填' })
	desc: string

	@ApiProperty({ description: '商品优惠价', example: 2000 })
	@IsNotEmpty({ message: 'price 必填' })
	@IsNumber({}, { message: 'number 价格' })
	price: number

	@ApiProperty({ description: '商品原价', example: 2990 })
	@IsNotEmpty({ message: 'price 必填' })
	@IsNumber({}, { message: 'number 价格' })
	suprice: number

	@ApiProperty({ description: '商品所属类型id', example: 1 })
	@IsNotEmpty({ message: 'sourceId 必填' })
	sourceId: number

	@ApiProperty({
		description: '商品规则',
		example: [
			{ formatId: 1, attr: [1, 2, 3, 4, 5] },
			{ formatId: 2, attr: [6, 7, 8, 9] }
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
			{
				skukey: '1-6',
				skuname: '3斤装-单果50g',
				price: 2000,
				costprice: 1500,
				stock: 100,
				coding: 'nk189760'
			},
			{
				skukey: '2-6',
				skuname: '6斤装-单果50g',
				price: 3500,
				costprice: 3000,
				stock: 100,
				coding: 'nk189761'
			},
			{
				skukey: '3-6',
				skuname: '10斤装-单果50g',
				price: 5500,
				costprice: 5000,
				stock: 100,
				coding: 'nk189762'
			},
			{
				skukey: '4-6',
				skuname: '15斤装-单果50g',
				price: 8000,
				costprice: 7500,
				stock: 100,
				coding: 'nk189763'
			},
			{
				skukey: '5-6',
				skuname: '20斤装-单果50g',
				price: 10500,
				costprice: 10000,
				stock: 1000,
				coding: 'nk189764'
			},
			{
				skukey: '1-7',
				skuname: '3斤装-单果80g',
				price: 2300,
				costprice: 1800,
				stock: 100,
				coding: 'nk189765'
			},
			{
				skukey: '2-7',
				skuname: '6斤装-单果80g',
				price: 4100,
				costprice: 3600,
				stock: 100,
				coding: 'nk189766'
			},
			{
				skukey: '3-7',
				skuname: '10斤装-单果80g',
				price: 6500,
				costprice: 6000,
				stock: 100,
				coding: 'nk189767'
			},
			{
				skukey: '4-7',
				skuname: '15斤装-单果80g',
				price: 9500,
				costprice: 9000,
				stock: 100,
				coding: 'nk189768'
			},
			{
				skukey: '5-7',
				skuname: '20斤装-单果80g',
				price: 12500,
				costprice: 12000,
				stock: 100,
				coding: 'nk189769'
			},
			{
				skukey: '1-8',
				skuname: '3斤装-单果100g',
				price: 2600,
				costprice: 2100,
				stock: 100,
				coding: 'nk189770'
			},
			{
				skukey: '2-8',
				skuname: '6斤装-单果100g',
				price: 4700,
				costprice: 4200,
				stock: 100,
				coding: 'nk189771'
			},
			{
				skukey: '3-8',
				skuname: '10斤装-单果100g',
				price: 7500,
				costprice: 7000,
				stock: 100,
				coding: 'nk189772'
			},
			{
				skukey: '4-8',
				skuname: '15斤装-单果100g',
				price: 11000,
				costprice: 10500,
				stock: 100,
				coding: 'nk189773'
			},
			{
				skukey: '5-8',
				skuname: '20斤装-单果100g',
				price: 14500,
				costprice: 14000,
				stock: 100,
				coding: 'nk189774'
			},
			{
				skukey: '1-9',
				skuname: '3斤装-单果150g',
				price: 2900,
				costprice: 2400,
				stock: 100,
				coding: 'nk189775'
			},
			{
				skukey: '2-9',
				skuname: '6斤装-单果150g',
				price: 5300,
				costprice: 4800,
				stock: 100,
				coding: 'nk189776'
			},
			{
				skukey: '3-9',
				skuname: '10斤装-单果150g',
				price: 8500,
				costprice: 8000,
				stock: 100,
				coding: 'nk189777'
			},
			{
				skukey: '4-9',
				skuname: '15斤装-单果150g',
				price: 12500,
				costprice: 12000,
				stock: 100,
				coding: 'nk189778'
			},
			{
				skukey: '5-9',
				skuname: '20斤装-单果150g',
				price: 16500,
				costprice: 16000,
				stock: 100,
				coding: 'nk189779'
			}
		]
	})
	@IsNotEmpty({ message: 'sku 必填' })
	@IsArray({ message: 'sku 格式错误' })
	@ValidateNested({ each: true, message: 'sku 格式错误' })
	@Type(() => ProductSku)
	sku: ProductSku[]

	@ApiProperty({ description: '类型状态', example: 1 })
	@IsOptional()
	@IsEnum(Face.Mode, { message: 'status 类型错误' })
	status?: Face.Mode
}

export class CreateProduct extends Product {}
