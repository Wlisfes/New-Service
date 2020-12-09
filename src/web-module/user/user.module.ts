import { Module } from '@nestjs/common'
import { UserService } from '@/web-module/user/user.service'
import { UserController } from '@/web-module/user/user.controller'

@Module({
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
