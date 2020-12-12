import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { SourceEntity } from '@/entity/source.entity'
import { FormatEntity } from '@/entity/format.entity'
import { FormatAttrEntity } from '@/entity/format.attr.entity'
import { ProductEntity } from '@/entity/product.entity'
import { ProductFormatEntity } from '@/entity/product.format.entity'
import { ProductFormatAttrEntity } from '@/entity/product.format.attr.entity'
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
		@InjectRepository(ProductFormatAttrEntity) private productFormatAttrModel: Repository<ProductFormatAttrEntity>
	) {}

	//创建商品
	async createProduct(params: Dto.CreateProduct, uid: number) {
		try {
			const product = await this.productModel.create({
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

			await new Promise(async (resolve, reject) => {
				;(params.format || []).map(async props => {
					const format = await this.formatModel.findOne({ where: { id: props.formatId } })
					const newFormat = await this.productFormatModel.create({
						formatId: format.id,
						name: format.name,
						product: saveProduct
					})
					const saveFormat = await this.productFormatModel.save(newFormat)
					const productAttr = (props.attr || []).map(async id => {
						const attr = await this.formatAttrModel.findOne({ where: { id } })
						const newAttr = await this.productFormatAttrModel.create({
							attrId: attr.id,
							name: attr.name
						})
						const saveAttr = await this.productFormatAttrModel.save({
							...newAttr,
							format: saveFormat
						})
						return saveAttr
					})
					return saveFormat
				})
				resolve()
			})
			return await this.productModel.findOne({ where: { id: saveProduct.id }, relations: ['source', 'format'] })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//获取商品详情
	async productInfo(id: number) {
		try {
			const product = await this.productModel.findOne({ where: { id }, relations: ['source', 'format'] })
			if (product) {
				return product
			}
			throw new HttpException(`id: ${id} 错误`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
