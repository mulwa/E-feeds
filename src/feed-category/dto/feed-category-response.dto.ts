import { FeedProduct } from '../../feed-product/entities/feed-product.entity';

export class FeedCategoryResponseDto {
  categoryId: number;
  name: string;
  products?: FeedProduct[];
}
