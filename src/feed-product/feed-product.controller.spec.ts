import { Test, TestingModule } from '@nestjs/testing';
import { FeedProductController } from './feed-product.controller';
import { FeedProductService } from './feed-product.service';

describe('FeedProductController', () => {
  let controller: FeedProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedProductController],
      providers: [FeedProductService],
    }).compile();

    controller = module.get<FeedProductController>(FeedProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
