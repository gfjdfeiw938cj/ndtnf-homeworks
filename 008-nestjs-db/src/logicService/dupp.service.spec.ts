import { Test, TestingModule } from '@nestjs/testing';
import { DuppService } from './logic.service';

describe('DuppService', () => {
  let service: DuppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DuppService],
    }).compile();

    service = module.get<DuppService>(DuppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
