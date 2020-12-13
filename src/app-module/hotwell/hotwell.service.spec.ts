import { Test, TestingModule } from '@nestjs/testing';
import { HotwellService } from './hotwell.service';

describe('HotwellService', () => {
  let service: HotwellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotwellService],
    }).compile();

    service = module.get<HotwellService>(HotwellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
