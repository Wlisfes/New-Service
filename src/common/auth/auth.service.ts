import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as Face from '@/common/auth/auth.dto'

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}

	async sign(params: Face.AuthSign): Promise<string> {
		return this.jwtService.sign(params)
	}

	async verify(token: string): Promise<Face.AuthVerify> {
		try {
			return await this.jwtService.verify(token)
		} catch (error) {
			throw new HttpException('token 错误或已过期', HttpStatus.UNAUTHORIZED)
		}
	}
}
