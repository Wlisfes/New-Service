import { Test, TestingModule } from '@nestjs/testing';
import { FormatController } from './format.controller';

describe('FormatController', () => {
  let controller: FormatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormatController],
    }).compile();

    controller = module.get<FormatController>(FormatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
