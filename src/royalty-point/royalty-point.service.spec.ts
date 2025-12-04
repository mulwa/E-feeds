import { Test, TestingModule } from '@nestjs/testing';
import { RoyaltyPointService } from './royalty-point.service';

describe('RoyaltyPointService', () => {
  let service: RoyaltyPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoyaltyPointService],
    }).compile();

    service = module.get<RoyaltyPointService>(RoyaltyPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
