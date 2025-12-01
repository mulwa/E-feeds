// feed-product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { FeedCategory } from '../../feed-category/entities/feed-category.entity';
// import { OrderItem } from '../../orders/order-item.entity';

@Entity()
export class FeedProduct {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Company, company => company.products)
  company: Company;

  @ManyToOne(() => FeedCategory, category => category.products)
  category: FeedCategory;

//   @OneToMany(() => OrderItem, item => item.product)
//   order_items: OrderItem[];
}

