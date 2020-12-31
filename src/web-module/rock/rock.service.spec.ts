import { Test, TestingModule } from '@nestjs/testing';
import { RockService } from './rock.service';

describe('RockService', () => {
  let service: RockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RockService],
    }).compile();

    service = module.get<RockService>(RockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
