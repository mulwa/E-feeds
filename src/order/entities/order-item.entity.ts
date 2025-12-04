import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Order } from './order.entity';
import { FeedProduct } from '../../feed-product/entities/feed-product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  itemId: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => FeedProduct)
  product: FeedProduct;

  @Column()
  quantity: number;

  @Column('decimal')
  unitPrice: number;

  @Column('decimal')
  subtotal: number;
}
