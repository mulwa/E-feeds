import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FeedProduct } from '../../feed-product/entities/feed-product.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  companyId: number;

  @Column()
  name: string;

   @OneToMany(() => FeedProduct, (product: FeedProduct) => product.company)
  products: FeedProduct[];
}
