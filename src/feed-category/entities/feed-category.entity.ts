import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FeedProduct } from '../../feed-product/entities/feed-product.entity';
import { IsNotEmpty } from 'class-validator'

@Entity()
export class FeedCategory {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  name: string;

  
   @OneToMany(() => FeedProduct, (product: FeedProduct) => product.category)
  products: FeedProduct[];
}