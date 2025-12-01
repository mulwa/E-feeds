// src/company/dto/company-response.dto.ts
import { FeedProduct } from '../../feed-product/entities/feed-product.entity';

export class CompanyResponseDto {
  companyId: number;
  name: string;
  products?: FeedProduct[];
}
