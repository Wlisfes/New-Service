import { Controller, UseInterceptors, UploadedFile, UploadedFiles, Post } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger'
import { OssService } from '@/common/oss/oss.service'

export const ApiFile = (fileName: string = 'file'): MethodDecorator => (
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor
) => {
	ApiBody({
		schema: {
			type: 'object',
			properties: { [fileName]: { type: 'string', format: 'binary' } }
		}
	})(target, propertyKey, descriptor)
}

@Controller('oss')
@ApiTags('文件模块')
export class OssController {
	constructor(private readonly ossService: OssService) {}

	// @ApiOperation({ summary: '上传头像' })
	// @ApiConsumes('multipart/form-data')
	// @ApiFile('file')
	// @Post('upload/file')
	// @UseInterceptors(FileInterceptor('file'))
	// public async uploadFile(@UploadedFile() file) {
	// 	return await this.ossService.uploadFile(file, 'service')
	// }

	@ApiOperation({ summary: '单张图片上传oss' })
	@ApiConsumes('multipart/form-data')
	@ApiFile('file')
	@Post('upload/file')
	@UseInterceptors(FileInterceptor('file'))
	public async uploadFileArticle(@UploadedFile() file) {
		return await this.ossService.uploadFile(file, 'store/upload')
	}

	@ApiOperation({ summary: '多张图片上传oss' })
	@ApiConsumes('multipart/form-data')
	@ApiFile('file')
	@Post('upload/files')
	@UseInterceptors(FilesInterceptor('file'))
	public async uploadFiles(@UploadedFiles() files) {
		return await this.ossService.uploadFiles(files, 'store/upload')
	}
}
