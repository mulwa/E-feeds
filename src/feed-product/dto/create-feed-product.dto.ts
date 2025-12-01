// src/feed-product/dto/create-feed-product.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFeedProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}

