import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminService } from '@/web-module/admin/admin.service'
import { BannerEntity } from '@/entity/banner.entity'
import { AdminEntity } from '@/entity/admin.entity'
import * as Face from '@/web-module/banner/banner.dto'

@Injectable()
export class BannerService {
	constructor(
		private readonly adminService: AdminService,
		@InjectRepository(BannerEntity) private readonly bannerModel: Repository<BannerEntity>,
		@InjectRepository(AdminEntity) private readonly adminModel: Repository<AdminEntity>
	) {}

	//创建轮播图
	async createBanner(params: Face.CreateBannerDto, uid: number) {
		try {
			const banner = await this.bannerModel.create(params)
			const admin = await this.adminService.findOne({ where: { uid } })
			return await this.bannerModel.save({ ...banner, admin })
		} catch (error) {
			throw new HttpException(error.message || error.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
