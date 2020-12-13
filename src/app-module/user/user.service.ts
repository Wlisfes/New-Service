import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/entity/user.entity'

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) public readonly userModel: Repository<UserEntity>) {}

	//创建用户
	async createUser() {}
}
