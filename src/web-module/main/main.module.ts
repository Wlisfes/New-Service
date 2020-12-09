import { Module } from '@nestjs/common'
import { AdminModule } from '@/web-module/admin/admin.module'

@Module({
	imports: [AdminModule]
})
export class WebMainModule {}
