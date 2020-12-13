import { Module } from '@nestjs/common'
import { SourceService } from '@/app-module/source/source.service'
import { SourceController } from '@/app-module/source/source.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SourceEntity } from '@/entity/source.entity'

@Module({
	imports: [TypeOrmModule.forFeature([SourceEntity])],
	providers: [SourceService],
	controllers: [SourceController]
})
export class SourceModule {}
