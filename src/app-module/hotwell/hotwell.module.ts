import { Module } from '@nestjs/common'
import { HotwellService } from '@/app-module/hotwell/hotwell.service'
import { HotwellController } from '@/app-module/hotwell/hotwell.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HotwellEntity } from '@/entity/hotwell.entity'

@Module({
	imports: [TypeOrmModule.forFeature([HotwellEntity])],
	providers: [HotwellService],
	controllers: [HotwellController]
})
export class HotwellModule {}
