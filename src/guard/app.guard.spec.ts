import { AppGuard } from './app.guard'
import { Reflector } from '@nestjs/core'

describe('AppGuard', () => {
	it('should be defined', () => {
		expect(new AppGuard(new Reflector())).toBeDefined()
	})
})
