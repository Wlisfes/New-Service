import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import * as day from 'dayjs'
import * as http from 'http'
import * as https from 'https'

@Injectable()
export class UtilsService {
	//下载图片流
	public downloadFile(src: string): Promise<Buffer> {
		const rule = /(https):\/\/([\w.]+\/?)\S*/
		const request = rule.test(src) ? https : http
		return new Promise(resolve => {
			request.get(src, result => {
				var chunks = []
				var size = 0
				result.on('data', chunk => {
					chunks.push(chunk)
					size += chunk.length
				})
				result.on('end', end => {
					const dataBuffer = Buffer.concat(chunks, size)
					resolve(dataBuffer)
				})
				result.on('error', error => {
					throw new HttpException(`图片下载失败`, HttpStatus.BAD_REQUEST)
				})
			})
		})
	}

	//当前时间与未来时间对比差
	public currentTimediff(date?: string | number | Date) {
		const current = day()
		const end = day(date)
		const diff = end.diff(current)
		if (diff > 1000) {
			return Math.ceil(diff / 1000)
		}
		return 0
	}

	//创建订单号
	public createOrder(): string {
		const date = new Date()
		const y = date.getFullYear()
		const m = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
		const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
		const t = date.getTime()
		return `${y}${m}${d}${t}`
	}
}
