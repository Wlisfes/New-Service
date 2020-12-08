import { Module } from '@nestjs/common'
import { UserService } from '@/app-module/user/user.service'
import { UserController } from '@/app-module/user/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
//
import { UserEntity } from '@/entity/user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UserService],
	controllers: [UserController]
})
export class UserModule {}
