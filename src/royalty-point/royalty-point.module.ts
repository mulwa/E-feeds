import { Module } from '@nestjs/common';
import { RoyaltyPointService } from './royalty-point.service';
import { RoyaltyPointController } from './royalty-point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoyaltyPoint } from './entities/royalty-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoyaltyPoint])],
  controllers: [RoyaltyPointController],
  providers: [RoyaltyPointService],
})
export class RoyaltyPointModule {}
