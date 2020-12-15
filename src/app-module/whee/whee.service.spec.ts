import { Test, TestingModule } from '@nestjs/testing';
import { WheeService } from './whee.service';

describe('WheeService', () => {
  let service: WheeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WheeService],
    }).compile();

    service = module.get<WheeService>(WheeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
