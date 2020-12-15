import { Module } from '@nestjs/common'
import { AddressService } from '@/app-module/address/address.service'
import { AddressController } from '@/app-module/address/address.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'
import { AddressEntity } from '@/entity/user.address.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, AddressEntity])],
	providers: [AddressService],
	controllers: [AddressController]
})
export class AddressModule {}
