import { OrderStatus } from "../enum/order-status";
import { PaymentStatus } from "../enum/payment-status";

import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateOrderStatusDto {
  @ApiPropertyOptional({
    enum: OrderStatus,
    example: OrderStatus.COMPLETED,
  })
  status?: OrderStatus;

  @ApiPropertyOptional({
    enum: PaymentStatus,
    example: PaymentStatus.PAID,
  })
  paymentStatus?: PaymentStatus;
}
