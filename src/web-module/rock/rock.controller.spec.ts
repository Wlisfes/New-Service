import { Test, TestingModule } from '@nestjs/testing';
import { RockController } from './rock.controller';

describe('RockController', () => {
  let controller: RockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RockController],
    }).compile();

    controller = module.get<RockController>(RockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
