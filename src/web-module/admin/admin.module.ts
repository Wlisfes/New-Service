import { Module } from '@nestjs/common'
import { AdminService } from '@/web-module/admin/admin.service'
import { AdminController } from '@/web-module/admin/admin.controller'

//数据表依赖注入
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from '@/entity/admin.entity'

@Module({
	imports: [TypeOrmModule.forFeature([AdminEntity])],
	providers: [AdminService],
	controllers: [AdminController]
})
export class AdminModule {}
