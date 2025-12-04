import { Module } from '@nestjs/common';
import {  UsersService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrdersModule } from 'src/order/orders.module';

@Module({
  imports: [OrdersModule,TypeOrmModule.forFeature([User,Order])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UserModule {}
