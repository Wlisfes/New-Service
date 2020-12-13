import { Test, TestingModule } from '@nestjs/testing';
import { HotwellController } from './hotwell.controller';

describe('HotwellController', () => {
  let controller: HotwellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotwellController],
    }).compile();

    controller = module.get<HotwellController>(HotwellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
