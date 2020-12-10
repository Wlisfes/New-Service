import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from '@/common/auth/auth.service'

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory() {
				return {
					secret: process.env.JWTSECRET,
					signOptions: { expiresIn: 12 * 60 * 60 }
				}
			}
		})
	],
	providers: [AuthService],
	exports: [AuthService]
})
export class AuthModule {}
