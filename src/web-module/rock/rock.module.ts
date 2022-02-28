import { Module } from '@nestjs/common'
import { RockService } from '@/web-module/rock/rock.service'
import { RockController } from '@/web-module/rock/rock.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from '@/entity/admin.entity'
import { RockEntity } from '@/entity/rock.entity'
import { SourceEntity } from '@/entity/source.entity'

@Module({
	imports: [TypeOrmModule.forFeature([AdminEntity, RockEntity, SourceEntity])],
	providers: [RockService],
	controllers: [RockController]
})
export class RockModule {}
