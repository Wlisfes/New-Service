import { Module } from '@nestjs/common'
import { AdminService } from '@/web-module/admin/admin.service'
import { AdminController } from '@/web-module/admin/admin.controller'

@Module({
	providers: [AdminService],
	controllers: [AdminController]
})
export class AdminModule {}
