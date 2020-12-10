import { WebGuard } from './web.guard'
import { Reflector } from '@nestjs/core'

describe('WebGuard', () => {
	it('should be defined', () => {
		expect(new WebGuard(new Reflector())).toBeDefined()
	})
})
