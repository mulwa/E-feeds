import { Test, TestingModule } from '@nestjs/testing';
import { FeedProductService } from './feed-product.service';

describe('FeedProductService', () => {
  let service: FeedProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedProductService],
    }).compile();

    service = module.get<FeedProductService>(FeedProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
