import { randomUUID } from 'node:crypto'

interface DatabaseMockDetial {
  balance?: Record<string, any>
}

interface DatabaseMock {
  account: DatabaseMockDetial
}

export const mock: DatabaseMock = {
  account: {
    balance: {
      id: randomUUID(),
      current_balance: 100000,
      money_in: 100000,
      money_out: 100000,
    },
  },
}
