import { Module, Global, DynamicModule } from '@nestjs/common'
import { OSS_OPTIONS, OSSOptions, ossProvider } from '@/common/oss/oss.provider'
import { OssController } from '@/common/oss/oss.controller'
import { OssService } from '@/common/oss/oss.service'

@Global()
@Module({
	controllers: [OssController]
})
export class OssModule {
	public static forRoot(options: OSSOptions): DynamicModule {
		return {
			module: OssModule,
			providers: [ossProvider(), { provide: OSS_OPTIONS, useValue: options }, OssService],
			exports: [OssService]
		}
	}
}
