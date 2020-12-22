import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'
import { AddressEntity } from '@/entity/user.address.entity'
import * as Dto from '@/app-module/address/address.dto'

@Injectable()
export class AddressService {
	constructor(
		@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>,
		@InjectRepository(AddressEntity) public readonly addressModel: Repository<AddressEntity>
	) {}

	//新增收货地址
	async createAddress(params: Dto.CreateAddress, uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			const address = await this.addressModel.findOne({ where: { user, checked: 2 } })

			if (params.checked === 2) {
				if (address) {
					//已有默认地址
					await this.addressModel.update({ id: address.id }, { checked: 1 })
				}
			}
			const newAddress = await this.addressModel.create(params)
			return await this.addressModel.save({ ...newAddress, user })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//获取默认地址
	async address(uid: number) {
		try {
			const user = await this.userModel.findOne({ where: { uid } })
			return await this.addressModel.findOne({ where: { user, checked: 2 } })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//获取用户收货地址列表
	async createList(uid: number) {
		try {
			// const user = await this.userModel.findOne({ where: { uid } })
			// const address = await this.addressModel.find({
			// 	where: { user },
			// 	order: {
			// 		id: 'DESC',
			// 		checked: 'DESC'
			// 	}
			// })
			// return address
			// return address.sort((a, b) => b.checked - a.checked)
			return await this.addressModel
				.createQueryBuilder('address')
				.leftJoin('address.user', 'user')
				.orderBy({ 'address.checked': 'DESC', 'address.id': 'DESC' })
				.where('user.uid = :uid', { uid })
				.getMany()
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//修改收货地址
	async updateAddress(params: Dto.UpdateAddress, uid: number) {
		try {
			const address = await this.addressModel.findOne({ where: { id: params.id }, relations: ['user'] })
			if (uid === address.user.uid) {
				const user = await this.userModel.findOne({ where: { uid } })
				if (params.checked === 2 && address.checked !== 2) {
					//当前数据需要设置成默认地址、需要把原有默认收货地址取消
					const { id } = await this.addressModel.findOne({ where: { user, checked: 2 } })
					await this.addressModel.update({ id }, { checked: 1 })
				}
				await this.addressModel.update({ id: params.id }, params)
				return await this.addressModel.findOne({ where: { id: params.id } })
			}
			throw new HttpException(`uid: ${uid} 不符`, HttpStatus.BAD_REQUEST)
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	//删除收货地址
	async deleteAddress(id: number, uid: number) {}
}
