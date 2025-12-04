import { Test, TestingModule } from '@nestjs/testing';
import { RoyaltyPointController } from './royalty-point.controller';
import { RoyaltyPointService } from './royalty-point.service';

describe('RoyaltyPointController', () => {
  let controller: RoyaltyPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoyaltyPointController],
      providers: [RoyaltyPointService],
    }).compile();

    controller = module.get<RoyaltyPointController>(RoyaltyPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
