import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class RoyaltyPoint {
  @PrimaryGeneratedColumn()
  pointsId: number;

  @Column()
  pointsEarned: number;

  @Column({ nullable: true })
  pointsReason: string;

  @ManyToOne(() => User, user => user.royaltyPoints)
  user: User;

  @ManyToOne(() => Order, order => order.royaltyPoints, { nullable: true })
  order?: Order;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
