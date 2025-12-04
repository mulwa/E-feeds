import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { RoyaltyPoint } from 'src/royalty-point/entities/royalty-point.entity';


export enum UserRole {
  FARMER = 'farmer',
  DEALER = 'dealer',
  ADMIN = 'admin'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => RoyaltyPoint, rp => rp.user)
  royaltyPoints: RoyaltyPoint[];
}
