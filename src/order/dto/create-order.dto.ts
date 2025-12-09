import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 3 },
    ],
  })
  @IsArray()
  items: {
    productId: number;
    quantity: number;
  }[];
}
