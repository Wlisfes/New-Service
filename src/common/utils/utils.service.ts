import { Injectable } from '@nestjs/common'

@Injectable()
export class UtilsService {
	//手机号验证
	public isMobile(mobile: string) {
		return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(mobile)
	}
}
