export enum OrderStatus {
  PENDING = 'pending',       // just created
  CONFIRMED = 'confirmed',   // payment/approval done
  PROCESSING = 'processing', // being prepared
  COMPLETED = 'completed',   // delivered
  CANCELLED = 'cancelled',   // cancelled by user/admin
}
