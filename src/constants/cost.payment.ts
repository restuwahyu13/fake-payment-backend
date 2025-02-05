export enum EPaymentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  PROCESS = 'process',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  SUCCEED = 'succeed',
  EXPIRED = 'expired',
  REFUNDED = 'refunded',
}

export enum EPaymentType {
  PEIONIO = 'peionio',
  USDC = 'usdc',
  ACH = 'ach',
}
