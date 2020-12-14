import { Module, HttpModule } from '@nestjs/common'
import { OssModule } from '@/common/oss/oss.module'
import { WechatModule } from '@/common/wechat/wechat.module'
import { UserService } from '@/app-module/user/user.service'
import { UserController } from '@/app-module/user/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), WechatModule, OssModule],
	providers: [UserService],
	controllers: [UserController]
})
export class UserModule {}
