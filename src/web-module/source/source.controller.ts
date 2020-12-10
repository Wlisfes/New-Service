import { Controller } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger'

@ApiTags('分类模块')
@Controller('source')
export class SourceController {}
