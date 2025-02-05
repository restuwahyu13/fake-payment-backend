import { randomUUID } from 'node:crypto'

interface DatabaseMockDetial {
  createUSDAccount?: Record<string, any>
  getAllUSDAccount?: Record<string, any>
  getUSDAccountById?: Record<string, any>
  deleteUSDAccountById?: Record<string, any>
}

interface DatabaseMock {
  receiving: DatabaseMockDetial
}

export const mock: DatabaseMock = {
  receiving: {
    createUSDAccount: {
      bank_id: randomUUID(),
      account_number: 201543502291,
      routing_number: 201543502292,
    },
    getAllUSDAccount: [
      {
        bank_id: randomUUID(),
        account_number: 201543502291,
        routing_number: 201543502292,
      },
      {
        bank_id: randomUUID(),
        account_number: 201743502291,
        routing_number: 201743502292,
      },
      {
        bank_id: randomUUID(),
        account_number: 201843502291,
        routing_number: 201843502292,
      },
    ],
    getUSDAccountById: {
      bank_id: randomUUID(),
      account_number: 201543502291,
      routing_number: 201543502292,
    },
  },
}
