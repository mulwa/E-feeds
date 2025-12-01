import { Test, TestingModule } from '@nestjs/testing';
import { FeedCategoryController } from './feed-category.controller';
import { FeedCategoryService } from './feed-category.service';

describe('FeedCategoryController', () => {
  let controller: FeedCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedCategoryController],
      providers: [FeedCategoryService],
    }).compile();

    controller = module.get<FeedCategoryController>(FeedCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
