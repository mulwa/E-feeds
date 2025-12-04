export enum PaymentStatus {
  PENDING = 'pending',     // not paid yet
  PAID = 'paid',           // payment completed
  FAILED = 'failed',       // payment failed
  REFUNDED = 'refunded',   // payment refunded
}
