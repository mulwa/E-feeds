// src/feed-product/dto/feed-product-response.dto.ts
import { Company } from '../../company/entities/company.entity';
import { FeedCategory } from '../../feed-category/entities/feed-category.entity';

export class FeedProductResponseDto {
  productId: number;
  productName: string;
  description: string;
  price: number;
  company?: Company;
  category?: FeedCategory;
}
