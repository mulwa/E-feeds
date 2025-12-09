import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { FeedProduct } from 'src/feed-product/entities/feed-product.entity';
import { User } from 'src/user/entities/user.entity';
import { RoyaltyPoint } from 'src/royalty-point/entities/royalty-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderItem,FeedProduct,User,RoyaltyPoint])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, TypeOrmModule]
})
export class OrdersModule {}
