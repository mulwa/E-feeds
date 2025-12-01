import { Test, TestingModule } from '@nestjs/testing';
import { FeedCategoryService } from './feed-category.service';

describe('FeedCategoryService', () => {
  let service: FeedCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedCategoryService],
    }).compile();

    service = module.get<FeedCategoryService>(FeedCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
