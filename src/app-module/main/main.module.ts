import { Module } from '@nestjs/common'
import { UserModule } from '@/app-module/user/user.module'

@Module({
	imports: [UserModule]
})
export class AppMainModule {}
