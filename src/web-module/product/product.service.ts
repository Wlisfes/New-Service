import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { SourceEntity } from '@/entity/source.entity'
import { FormatEntity } from '@/entity/format.entity'
import { FormatAttrEntity } from '@/entity/format.attr.entity'
import { ProductEntity } from '@/entity/product.entity'
import { ProductFormatEntity } from '@/entity/product.format.entity'
import { ProductSkuEntity } from '@/entity/product.sku.entity'
import * as Dto from '@/web-module/product/product.dto'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(AdminEntity) private readonly adminModel: Repository<AdminEntity>,
		@InjectRepository(SourceEntity) private readonly sourceModel: Repository<SourceEntity>,
		@InjectRepository(FormatEntity) private readonly formatModel: Repository<FormatEntity>,
		@InjectRepository(FormatAttrEntity) private readonly formatAttrModel: Repository<FormatAttrEntity>,
		@InjectRepository(ProductEntity) private readonly productModel: Repository<ProductEntity>,
		@InjectRepository(ProductFormatEntity) private readonly productFormatModel: Repository<ProductFormatEntity>,
		@InjectRepository(ProductSkuEntity) private readonly productSkuModel: Repository<ProductSkuEntity>
	) {}

	//创建商品
	async createProduct(params: Dto.CreateProduct, uid: number) {
		try {
			const product = await this.productModel.create({
				picUrl: params.picUrl,
				banner: params.banner,
				content: params.content,
				title: params.title,
				desc: params.desc,
				price: params.price,
				suprice: params.suprice,
				status: params.status
			})
			const source = await this.sourceModel.findOne({ where: { id: params.sourceId } })
			if (!source) {
				throw new HttpException(`sourceId: ${params.sourceId} 不存在`, HttpStatus.BAD_REQUEST)
			}
			const admin = await this.adminModel.findOne({ where: { uid } })
			const saveProduct = await this.productModel.save({
				...product,
				source,
				admin
			})

			//规格连表存储
			for (const props of params.format) {
				const format = await this.formatModel.findOne({ where: { id: props.formatId } })
				const attr = await this.formatAttrModel
					.createQueryBuilder('attr')
					.where('attr.id IN (:id)', { id: props.attr })
					.getMany()
				const newFormat = await this.productFormatModel.create({
					formatId: format.id,
					name: format.name,
					product: saveProduct,
					attr: (attr || []).map(k => ({
						name: k.name,
						attrId: k.id,
						status: k.status
					}))
				})
				await this.productFormatModel.save(newFormat)
			}

			//sku连表存储
			for (const props of params.sku) {
				const sku = await this.productSkuModel.create({
					skukey: props.skukey,
					skuname: props.skuname,
					price: props.price,
					costprice: props.costprice,
					stock: props.stock,
					coding: props.coding
				})
				await this.productSkuModel.save({
					...sku,
					product: saveProduct
				})
			}

			return await this.productModel.findOne({
				where: { id: saveProduct.id },
				relations: ['source', 'format', 'sku']
			})
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//获取商品详情
	async productInfo(id: number) {
		try {
			const product = await this.productModel.findOne({
				where: { id },
				relations: ['source', 'format', 'sku']
			})
			if (product) {
				return product
			}
			throw new HttpException(`id: ${id} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
