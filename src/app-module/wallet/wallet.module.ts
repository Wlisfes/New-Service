import { Module } from '@nestjs/common'
import { WalletService } from '@/app-module/wallet/wallet.service'
import { WalletController } from '@/app-module/wallet/wallet.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/entity/user.entity'
import { WalletEntity } from '@/entity/wallet.entity'
import { OrderEntity } from '@/entity/order.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity, OrderEntity])],
	providers: [WalletService],
	controllers: [WalletController],
	exports: [WalletService]
})
export class WalletModule {}
