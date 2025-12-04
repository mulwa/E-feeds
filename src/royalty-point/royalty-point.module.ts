import { Module } from '@nestjs/common';
import { RoyaltyPointService } from './royalty-point.service';
import { RoyaltyPointController } from './royalty-point.controller';

@Module({
  controllers: [RoyaltyPointController],
  providers: [RoyaltyPointService],
})
export class RoyaltyPointModule {}
