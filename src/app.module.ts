import { Module, HttpModule } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'

//全局依赖模块
import { ConfigModule } from '@nestjs/config'
import { SessionModule } from 'nestjs-session'
import { TypeOrmModule } from '@nestjs/typeorm'

//表结构
import { UserEntity } from '@/entity/user.entity'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot(),
		SessionModule.forRootAsync({
			useFactory() {
				return {
					session: {
						secret: process.env.SESSIONSECRET,
						resave: true,
						saveUninitialized: true,
						cookie: {
							httpOnly: true,
							maxAge: 1800 * 1000 //1800秒
						}
					}
				}
			}
		}),
		TypeOrmModule.forFeature([UserEntity]),
		HttpModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
