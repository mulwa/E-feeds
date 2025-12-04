import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from 'src/user/entities/user.entity';
import { RoyaltyPoint } from 'src/royalty-point/entities/royalty-point.entity';
import { PaymentStatus } from '../enum/payment-status';
import { OrderStatus } from '../enum/order-status';


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
  })
  items: OrderItem[];

  @Column('decimal')
  totalAmount: number;

  @OneToMany(() => RoyaltyPoint, (rp) => rp.order, { nullable: true })
  royaltyPoints: RoyaltyPoint[];

   @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
