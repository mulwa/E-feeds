import { Module } from '@nestjs/common';
import { RoyaltyPointService } from './royalty-point.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoyaltyPoint } from './entities/royalty-point.entity';
import { User } from 'src/user/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { RoyaltyPointController } from './royalty-point.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoyaltyPoint,User,Order])],
  controllers: [RoyaltyPointController],
  providers: [RoyaltyPointService],
})
export class RoyaltyPointModule {}
