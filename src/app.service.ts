import { Injectable, HttpService } from '@nestjs/common'

@Injectable()
export class AppService {
	constructor(private readonly httpService: HttpService) {}

	public async weather() {
		const response = await this.httpService
			.get(`https://restapi.amap.com/v3/weather/weatherInfo`, {
				params: {
					city: '440300',
					key: 'fa676bf5375f02b15dbb9c0026a343ca',
					extensions: 'base'
				}
			})
			.toPromise()
		console.log(response.data)
		return response.data
	}

	getHello(): string {
		return 'Hello World!'
	}
}
