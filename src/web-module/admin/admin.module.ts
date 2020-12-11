import { Module } from '@nestjs/common'
import { AdminService } from '@/web-module/admin/admin.service'
import { AdminController } from '@/web-module/admin/admin.controller'
import { AuthModule } from '@/common/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from '@/entity/admin.entity'

@Module({
	imports: [TypeOrmModule.forFeature([AdminEntity]), AuthModule],
	providers: [AdminService],
	controllers: [AdminController],
	exports: [AdminService]
})
export class AdminModule {}
