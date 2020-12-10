import { Module, HttpModule } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'

//全局依赖模块
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonMainModule } from '@/common/main/main.module'

//多端主模块入口
import { AppMainModule } from '@/app-module/main/main.module'
import { WebMainModule } from '@/web-module/main/main.module'

//表结构
import { AdminEntity } from '@/entity/admin.entity'
import { UserEntity } from '@/entity/user.entity'
import { SourceEntity } from '@/entity/source.entity'
import { BannerEntity } from '@/entity/banner.entity'

@Module({
	imports: [
		CommonMainModule,
		TypeOrmModule.forFeature([AdminEntity, UserEntity, SourceEntity, BannerEntity]),
		HttpModule,
		AppMainModule,
		WebMainModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
