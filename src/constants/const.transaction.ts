export enum ETransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  PROCESS = 'process',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  SUCCEED = 'succeed',
  EXPIRED = 'expired',
  REFUNDED = 'refunded',
}

export enum ETransactionType {
  PEIONIO = 'peionio',
  USDC = 'usdc',
  ACH = 'ach',
}
