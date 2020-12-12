import { Module } from '@nestjs/common'
import { FormatService } from '@/web-module/format/format.service'
import { FormatController } from '@/web-module/format/format.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormatEntity } from '@/entity/format.entity'
import { AdminEntity } from '@/entity/admin.entity'
import { FormatAttrEntity } from '@/entity/format.attr.entity'

@Module({
	imports: [TypeOrmModule.forFeature([AdminEntity, FormatEntity, FormatAttrEntity])],
	providers: [FormatService],
	controllers: [FormatController]
})
export class FormatModule {}
