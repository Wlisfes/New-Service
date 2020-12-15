import { Test, TestingModule } from '@nestjs/testing';
import { WheeController } from './whee.controller';

describe('WheeController', () => {
  let controller: WheeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WheeController],
    }).compile();

    controller = module.get<WheeController>(WheeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
