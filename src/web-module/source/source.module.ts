import { Module } from '@nestjs/common'
import { SourceService } from '@/web-module/source/source.service'
import { SourceController } from '@/web-module/source/source.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { SourceEntity } from '@/entity/source.entity'

@Module({
	imports: [TypeOrmModule.forFeature([AdminEntity, SourceEntity])],
	providers: [SourceService],
	controllers: [SourceController]
})
export class SourceModule {}
